import React from 'react'
import { browserHistory } from 'react-router'
import TimeEntriesPerDay from './TimeEntriesPerDay.jsx'
import store from '../../store'
import moment from 'moment'
import {fetchNextTimeEntryBatch} from '../../actions/timeEntries.js'
import {connect} from 'react-redux'
import {dayBeatify, durationBeatify, groupTimeEntriesByDay} from '../../helpers'

class TimeEntriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { limit: 10 }
    }

    componentWillMount() {
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
    }

    loadMore() {
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
    }

    render() {
        const {days} = this.props;
        var rows = [];
        for (var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<TimeEntriesPerDay day={day} duration={duration} timeEntries={days[day].list} key={day}/>)
        }
        const loadMoreClasses = this.props.allBatches ? 'btn btn-success center-block loadmore disabled' : 'btn btn-success center-block loadmore' ;
        return (
            <div className="container container__fixed">
                {rows}
                <button className={loadMoreClasses} onClick={this.loadMore}>
                    Load More
                </button>
            </div>
        )
    }
};

function getProps(state) {
    return {
        days: groupTimeEntriesByDay(state.timeEntries.list),
        offset: state.timeEntries.list.length,
        allBatches: state.timeEntries.helpers.allBatches
    }
}

export default connect(getProps)(TimeEntriesList)
