import React from 'react';
import store from '../../store';
import {connect} from 'react-redux';
import {durationBeatify} from '../../helpers';
import {fetchCustomUserNextTimeEntryBatch} from '../../actions/timeEntries.js';
import DailyActivity from './DailyActivity.jsx';
import {populateProps, inititializeOffset} from './helpers.js';

class UserActivityTable extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = { limit: 10 };
    }
    componentWillMount() {
        const offset = inititializeOffset(store.getState().usersActivities[this.props.login]);
        store.dispatch(fetchCustomUserNextTimeEntryBatch(offset, this.state.limit, this.props.login));
    }

    loadMore() {
        store.dispatch(fetchCustomUserNextTimeEntryBatch(this.props.offset, this.state.limit, this.props.login));
    }

    render() {
        const {days} = this.props;
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

let getProps = function(state) {
    return populateProps(this, state);
};

export default connect(getProps)(UserActivityTable);
