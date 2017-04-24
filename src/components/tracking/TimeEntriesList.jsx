import React from 'react'
import TimeEntriesPerDay from './TimeEntriesPerDay.jsx'
import store from '../../store'
import classNames from 'classnames'
import {
  fetchNextTimeEntryBatch
  // fetchUserActivityFilteredByDate
} from '../../actions/timeEntries.js'
import { connect } from 'react-redux'
import { durationBeatify, groupTimeEntriesByDay } from '../../helpers'
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class TimeEntriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { limit: 10 };
        this.loadMore = this.loadMore.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);

        this.state = {
          from: null,
          to: null
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

    handleDayClick(e, day) {
      const range = DateUtils.addDayToRange(day, this.state);
      // const dateStrings = true;
      // console.log(fetchUserActivityFilteredByDate(range));
      // store.dispatch(fetchUserActivityFilteredByDate(range, dateStrings))
      this.setState(range);
    }

    handleResetClick(e) {
      e.preventDefault();
      this.setState({
        from: null,
        to: null
      });
    }

    render() {
        const { handleResetClick } = this;
        const { from, to } = this.state;
        // const { days } = this.props;
        const { list } = this.props;
        // console.log(list);

        const filteredList = list.filter(timeEntry => {
          const isSameOrAfter = from ? moment(timeEntry.date).isSameOrAfter(from, 'day') : true;
          const isSameOrBefore = to ? moment(timeEntry.date).isSameOrBefore(to, 'day') : true;
          return isSameOrAfter && isSameOrBefore;
        })

        const days = groupTimeEntriesByDay(filteredList)

        const styles = {
          dateRangeHeaderDiv: {
            textAlign: "center"
          }
        };

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
            <div className="date-range">
                  <div style={styles.dateRangeHeaderDiv}>
                    {getDateRangeHeader(from, to, handleResetClick)}
                  </div>
                  <DayPicker
                      numberOfMonths={ 3 }
                      selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                      onDayClick={ this.handleDayClick }
                  />
              </div>
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

function getDateRangeHeader( from, to, onClickFunc ) {
  if (!from) return <p>Please select the <strong>first day</strong>.</p>;
  if (!to) return <p>Please select the <strong>last day</strong>.</p>;
  return (
    <p>
    You chose from { moment(from).format('L') } to { moment(to).format('L') }.
    { ' ' }<a href="." onClick={ onClickFunc }>Reset</a>
    </p>
  )
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
