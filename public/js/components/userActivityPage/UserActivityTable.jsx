import React from 'react';
import store from '../../store';
import {connect} from 'react-redux';
import {durationBeatify} from '../../helpers';
import {initializeUserActivity, fetchCustomUserNextTimeEntryBatch} from '../../actions/timeEntries.js';
import DailyActivity from './DailyActivity.jsx';
import {filterPeriod} from './helpers.js';
import {groupTimeEntriesByDay} from '../../helpers';

class UserActivityTable extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            limit: 10
        };
    }

    componentWillMount() {
      let offset = 0;
        if (this.props.userActivity) {
          offset = this.props.userActivity.offset;
        }
        store.dispatch(initializeUserActivity(offset, this.state.limit, this.props.login));
    }

    loadMore() {
        store.dispatch({type: 'USER_ACTIVITY_SET_FILTER', filter: false, user: this.props.login});
        store.dispatch(fetchCustomUserNextTimeEntryBatch(this.props.userActivity.offset, this.state.limit, this.props.login));
    }

    render() {
        let list;

        if (this.props.userActivity && this.props.userActivity.filter) {
            list = filterPeriod(this.props.userActivity);
        } else if (this.props.userActivity) {
          list = this.props.userActivity.list;
        };

        const days = groupTimeEntriesByDay(list);

        let rows = [];
        for (var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<DailyActivity day={day} duration={duration} timeEntries={days[day].list} key={day}/>)
        }
        const loadMoreClasses = this.props.allBatches ? 'btn btn-success center-block loadmore disabled' : 'btn btn-success center-block loadmore';

        return (
            <div>
                {rows}
                <button className={loadMoreClasses} onClick={this.loadMore}>Load More</button>
            </div>
        );
    }
}

export default UserActivityTable;
