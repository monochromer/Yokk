import React from 'react';
import store from '../../store';
import {connect} from 'react-redux';
import _ from 'lodash';
import {dayBeatify, durationBeatify, groupTimeEntriesByDay, findUserByLogin} from '../../helpers';
import {fetchCustomUserNextTimeEntryBatch} from '../../actions/timeEntries.js';
import DailyActivity from './DailyActivity.jsx';

class UserActivityTable extends React.Component {
    constructor(props) {
        super(props);
        // console.log('Props from constructor():');
        // console.log(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            limit: 10
        };
    }

    componentWillMount() {
      // console.log('Props from componentWillMount():');
      //   console.log(this.props);
        store.dispatch(fetchCustomUserNextTimeEntryBatch(this.props.offset, this.state.limit, this.props.login));
    }

    loadMore() {
      // console.log('Props from loadMore():');
      //   console.log(this.props);
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
// The bug is below. User is got from the store and there's an old user so the props (and offset) is gotten for the 'old' user
    let user = state.usersActivities.showUser;
    let props = {};
    // console.log('User from getProps():');
    // console.log(user);
    // if (state.usersActivities[user]) {console.log(state.usersActivities[user].offset);} else {console.log('No fucking offset');}
    if (typeof state.usersActivities[user] !== 'undefined') {
        props.days = groupTimeEntriesByDay(state.usersActivities[user].list);
        props.offset = state.usersActivities[user].offset;
        props.allBatches = state.usersActivities[user].helpers.allBatches;
    } else {
        props.offset = 0;
    }
    // console.log('Props from getProps():');
    // console.log(props);
    return props;
}

export default connect(getProps)(UserActivityTable)