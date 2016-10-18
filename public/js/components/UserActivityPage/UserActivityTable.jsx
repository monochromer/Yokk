import React from 'react';
import store from '../../store';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import {dayBeatify, durationBeatify, groupTimeEntriesByDay, findUserByLogin} from '../../helpers';
import {fetchCustomUserNextTimeEntryBatch} from '../../actions/timeEntries.js';
import DailyActivity from './DailyActivity.jsx';

class UserActivityTable extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            limit: 10
        };
    }

    componentWillMount() {
        store.dispatch(fetchCustomUserNextTimeEntryBatch(this.props.offset, this.state.limit, this.props.login));
    }

    loadMore() {
        store.dispatch(fetchCustomUserNextTimeEntryBatch(this.props.offset, this.state.limit, this.props.login));
    }

    render() {

        /* Extracting User full name (problem: User array not defined initially)*/
        // let userPageRenderedFor = _.find(this.props.users, (user) => {
        //   return user.login === this.props.login;
        // });
        //
        // function getUserName(user) {
        //   if (typeof user !== undefined) {
        //     if (typeof user.fullname !== undefined) {
        //       return user.fullname;
        //     } else {
        //       return `(login:)&nbsp;${user.login}`
        //     }
        //   }
        //   return undefined;
        // }
        //
        // let userName = getUserName(userPageRenderedFor);
        // function getH1(userName) {
        //   if (typeof userName !== undefined) {
        //     return <h1>Activity Page for </h1>
        //   }
        // }
        // let h1 = getH1(userName);
        // console.log(h1);
        /*****************************************************************/

        const {days} = this.props;
        var rows = [];
        for (var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<DailyActivity day={day} duration={duration} timeEntries={days[day].list} key={day}/>)
        }
        const loadMoreClasses = this.props.allBatches
            ? 'btn btn-success center-block loadmore disabled'
            : 'btn btn-success center-block loadmore';
        return (
            <div>
                <h1>Activity Page for {this.props.login}</h1>
                {rows}
                <button className={loadMoreClasses} onClick={this.loadMore}>
                    Load More
                </button>
            </div>
        );
    }
};

let getProps = function(state) {
    const user = state.usersActivities.showUser;
    let props = {};
    let startDateFilter,
        endDateFilter;
    if (typeof state.usersActivities[user] !== 'undefined') {
        if (state.usersActivities.startDateFilter) {
            startDateFilter = moment(state.usersActivities.startDateFilter, 'DD.MM.YYYY').toDate()
        }
        if (state.usersActivities.endDateFilter) {
            endDateFilter = moment(state.usersActivities.endDateFilter, 'DD.MM.YYYY').toDate()
        }
        const entries = state.usersActivities[user].list;
        const periodFiltereEntries = _.filter(entries, function(o) {
            let checkStartDate,
                checkEndDate;
            if (startDateFilter) {
                checkStartDate = moment(o.dateCreated).isSameOrAfter(startDateFilter, 'day');
            }
            if (endDateFilter) {
                checkEndDate = moment(o.dateCreated).isSameOrBefore(endDateFilter, 'day');
            }
            // console.log(checkStartDate);
            // console.log(checkEndDate);

            if ((typeof checkStartDate !== 'undefined') && (typeof checkEndDate !== 'undefined')) {
                // console.log('case1');
                return (checkStartDate && checkEndDate);
            } else if (typeof checkStartDate !== 'undefined') {
                // console.log('case2');
                return checkStartDate;
            } else if (typeof checkEndDate !== 'undefined') {
                // console.log('case3');
                return checkEndDate;
            } else {
                // console.log('case4');
                return true;
            }
            // let checkStartDate = moment(o.dateCreated).isSameOrAfter(startDate, 'day');
            // let checkEndDate = moment(o.dateCreated).isSameOrBefore(endDate, 'day');

        });
        // console.log(entries);
        // console.log(periodFiltereEntries);
        props.days = groupTimeEntriesByDay(periodFiltereEntries);
        props.offset = state.usersActivities[user].offset;
        props.allBatches = state.usersActivities[user].helpers.allBatches;
    } else {
        props.offset = 0;
    }
    return props;
}

export default connect(getProps)(UserActivityTable)
