import React from 'react'
import { browserHistory } from 'react-router'
import TimeEntriesPerDay from './TimeEntriesPerDay.jsx'
import store from '../../store'
import classNames from 'classnames'
import { fetchNextTimeEntryBatch } from '../../actions/timeEntries.js'
import { connect } from 'react-redux'
import { dayBeatify, durationBeatify, groupTimeEntriesByDay } from '../../helpers'
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../../../../node_modules/react-bootstrap-daterangepicker/css/daterangepicker.css'

class TimeEntriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { limit: 10 };
        this.loadMore = this.loadMore.bind(this);
        this.handlePickerEvent = this.handlePickerEvent.bind(this);

        this.state = {
          startDate: moment(),
          endDate: moment()
        }
    }

    componentWillMount() {
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
    }

    loadMore() {
        let limit = this.state.limit;
        store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
    }

    handlePickerEvent() {
      console.log('date picker event');
    }

    render() {
        const { handlePickerEvent } = this;
        const { startDate, endDate } = this.state;
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
        const message = (
            <div className="row center-md">
                <h4>You don't have any entries yet!</h4>
            </div>
        )
        return (
          <div>
            <DateRangePicker
              startDate={ startDate }
              endDate={ endDate }
              onEvent={handlePickerEvent}>
                <div>Picker is opened here</div>
            </DateRangePicker>
            <div className="container container__fixed">
                { rows }
                <div className="row center-md">
                    <div className="col-md-4 text-center">
                        {
                            rows.length > 0
                                ? <button className={ loadMoreClasses } onClick={ this.loadMore } disabled={ disabled }> Load More </button>
                                : message
                        }

                    </div>
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
