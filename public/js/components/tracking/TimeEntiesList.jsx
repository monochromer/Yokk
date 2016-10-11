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
        this.setState({
            skip: this.state.skip + this.props.offset
        });
        let skip = this.state.skip;
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(skip, limit));
    },

    loadMore: function() {
        let skip = store.getState().timeEntries.length;
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(skip, limit));
    },

    render: function() {
        const {days} = this.props;
        var rows = [];
        for (var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<TimeEntriesPerDay day={day} duration={duration} timeEntries={days[day].list} key={day}/>)
        }
        return (
            <div>
                {rows}
                <button className="btn btn-success center-block loadmore" onClick={this.loadMore}>
                    Load More
                </button>
            </div>
        )
    }
});

var getProps = function(state) {
    return {
        days: groupTimeEntriesByDay(state.timeEntries),
        offset: state.timeEntries.length
    }
}

export default connect(getProps)(TimeEntriesList)
