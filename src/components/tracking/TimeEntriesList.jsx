import React from 'react'
import TimeEntriesPerDay from './TimeEntriesPerDay.jsx'
import store from '../../store'
import classNames from 'classnames'
import {
 fetchNextTimeEntryBatch
 // fetchUserActivityFilteredByDate
} from '../../actions/timeEntries.js'
import { connect } from 'react-redux'
import { groupTimeEntriesByDay } from '../../helpers'
import moment from 'moment';
import 'react-day-picker/lib/style.css';

class TimeEntriesList extends React.Component {

  state = {
    from: null,
    to: null
  }

  componentWillMount() {
    let limit = this.state.limit;
    store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
  }

  loadMore = () => {
    let limit = this.state.limit;
    store.dispatch(fetchNextTimeEntryBatch(this.props.offset, limit));
  }

  render() {
    const { from, to } = this.state;
    // const { days } = this.props;
    const { list } = this.props;
    // console.log(list);

    const filteredList = list.filter(timeEntry => {
      const isSameOrAfter = from ?
        moment(timeEntry.date).isSameOrAfter(from, 'day') : true;
      const isSameOrBefore = to ?
        moment(timeEntry.date).isSameOrBefore(to, 'day') : true;
      return isSameOrAfter && isSameOrBefore;
    })

    const days = groupTimeEntriesByDay(filteredList)

    let rows = [];
    for (let day in days) {
      rows.push(
        <TimeEntriesPerDay
          day={ day }
          sources={ days[day] }
          key={ day }
        />
      )
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
    list: state.timeEntries.list,
    // days: groupTimeEntriesByDay(state.timeEntries.list),
    offset: state.timeEntries.list.length,
    allBatches: state.timeEntries.helpers.allBatches
  }
}

export default connect(getProps)(TimeEntriesList)
