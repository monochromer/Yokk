import React from 'react'
import TimeEntriesPerDay from './TimeEntriesPerDay.jsx'
import store from '../../store'
import moment from 'moment'
import {fetchNextTimeEntryBatch} from '../../actions/timeEntries.js'
import {connect} from 'react-redux'
import {dayBeatify, durationBeatify, groupTimeEntriesByDay} from '../../helpers'

var TimeEntriesList = React.createClass({
    getInitialState: function() {
        return {limit: 10}
    },

    componentWillMount: function() {
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
    },

    loadMore: function() {
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
    },

    render: function() {
        const {days} = this.props;
        var rows = [];
        for (var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<TimeEntriesPerDay day={day} duration={duration} timeEntries={days[day].list} key={day}/>)
        }
        const loadMoreClasses = this.props.allBatches ? 'btn btn-success center-block loadmore disabled' : 'btn btn-success center-block loadmore' ;
        return (
            <div>
                {rows}
                <button className={loadMoreClasses} onClick={this.loadMore}>
                    Load More
                </button>
            </div>
        )
    }
});

var getProps = function(state) {
    return {
        days: groupTimeEntriesByDay(state.timeEntries.list),
        offset: state.timeEntries.list.length,
        allBatches: state.timeEntries.helpers.allBatches
    }
}

export default connect(getProps)(TimeEntriesList)
