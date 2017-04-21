import React from 'react';
import DailyActivity from './DailyActivity.jsx';
import classNames from 'classnames'
import store from '../../store';
import { durationBeatify, groupTimeEntriesByDay } from '../../helpers';
import { initializeUserActivity, fetchCustomUserNextTimeEntryBatch } from '../../actions/timeEntries.js';
import { filterPeriod } from './helpers';

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

        const loadMoreClasses = classNames({
            'btn btn__md btn__trans-blue loadmore' : true,
            'btn__disabled': this.props.allBatches
        });

        const disabled = this.props.allBatches ? 'disabled' : "";


        return (
            <div>
                { rows }
                <div className="row center-md">
                    <div className="col-md-4">
                        <button className={ loadMoreClasses } onClick={ this.loadMore } disabled={ disabled }>Load More</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserActivityTable;
