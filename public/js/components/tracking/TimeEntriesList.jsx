import React from 'react'
import { browserHistory } from 'react-router'
import TimeEntriesPerDay from './TimeEntriesPerDay.jsx'
import store from '../../store'
import classNames from 'classnames'
import { fetchNextTimeEntryBatch } from '../../actions/timeEntries.js'
import { connect } from 'react-redux'
import { dayBeatify, durationBeatify, groupTimeEntriesByDay } from '../../helpers'

class TimeEntriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { limit: 10 };
        this.loadMore = this.loadMore.bind(this);
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
        const { days } = this.props;

        let rows = [];
        for (let day in days) {
            let duration = durationBeatify(days[day].totalDuration);
            rows.push(<TimeEntriesPerDay day={ day } duration={ duration } timeEntries={ days[day].list } key={ day }/>)
        }

        const loadMoreClasses = classNames({
            'btn btn__md btn__trans-blue loadmore' : true,
            'btn__disabled': this.props.allBatches
        });

        const disabled = this.props.allBatches ? 'disabled' : "";

        return (
            <div className="container container__fixed">
                { rows }
                <div className="row center-md">
                    <div className="col-md-4 text-center">
                        <button className={ loadMoreClasses } onClick={this.loadMore} disabled={ disabled }> Load More </button>
                    </div>
                </div>

            </div>
        )
    }
}


function getProps(state) {
    return {
        days: groupTimeEntriesByDay(state.timeEntries.list),
        offset: state.timeEntries.list.length,
        allBatches: state.timeEntries.helpers.allBatches
    }
}

export default connect(getProps)(TimeEntriesList)
