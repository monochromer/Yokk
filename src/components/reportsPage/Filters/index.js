import React from 'react';
import UsersFilter from './UsersFilter.jsx';
import store from '../../../store'
import classNames from 'classnames'
import { RANGES } from '../../../constants'
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Filters extends React.Component {

  constructor(props) {
    super(props);
    this.setCustomPeriod = this.setCustomPeriod.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.resetDates = this.resetDates.bind(this);

    this.state = {
      activePeriod: "",
      from: null,
      to: null
    }
  }

  resetDates() {
    this.setState({
      activePeriod: "",
      from: null,
      to: null
    });
    store.dispatch({
      type: "STORE_REPORT_PERIOD",
      startDate: undefined,
      endDate: undefined
    })
  }

  setCustomPeriod(range) {
    return () => {
      this.setState({
        activePeriod: range,
        from: RANGES[range][0].toDate(),
        to: RANGES[range][1].toDate()
      });

      store.dispatch({
        type: "STORE_REPORT_PERIOD",
        startDate: RANGES[range][0].format("DD.MM.YYYY"),
        endDate: RANGES[range][1].format("DD.MM.YYYY")
      })
    }
  }

  handleDayClick(day) {
    console.log(day, this.state);
    const range = DateUtils.addDayToRange(day, this.state);
    const {from, to} = range;

    const startDate = getFormattedMomement(from, 'DD.MM.YYYY');
    const endDate = getFormattedMomement(to, 'DD.MM.YYYY');

    function getFormattedMomement(date, format) {
      if (date) return moment(date).format(format);
    }

    store.dispatch({
      type: "STORE_REPORT_PERIOD",
      startDate: startDate,
      endDate: endDate
    })

    this.setState( Object.assign( range, {activePeriod: ""} ) );
  }

  render() {
    const { setCustomPeriod, resetDates } = this;
    const { from, to, activePeriod } = this.state;

    const lasd7DaysClasses = classNames({
      'custom-periods_period': true,
      'custom-periods_period__active': activePeriod === 'Last 7 Days'
    });

    const yesterdayClasses = classNames({
      'custom-periods_period': true,
      'custom-periods_period__active': activePeriod === 'Yesterday'
    });

    const thisMonthClasses = classNames({
      'custom-periods_period': true,
      'custom-periods_period__active': activePeriod === 'This Month'
    });

    const LastMonthClasses = classNames({
      'custom-periods_period': true,
      'custom-periods_period__active': activePeriod === 'Last Month'
    });
    const usersFilter = classNames({
      'filter_heading': true,
      'heading_highlight': this.props.usersHighlight
    });

    return (
      <form>
        <div className={usersFilter}>Users</div>
        <UsersFilter users={ this.props.users } usersForReport={ this.props.usersForReport } />
        <div className="filter_heading">Period</div>
        <div className="custom-periods">
          <div>
            <DayPicker
              numberOfMonths={ 1 }
              selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
              onDayClick={ this.handleDayClick }
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className={ lasd7DaysClasses } onClick={ setCustomPeriod('Last 7 Days') }>Last 7 Days</span>
            </div>
            <div className="col-md-6">
              <span className={ yesterdayClasses } onClick={ setCustomPeriod('Yesterday') }>Yesterday</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className={ thisMonthClasses } onClick={ setCustomPeriod('This Month') }>This Month</span>
            </div>
            <div className="col-md-6">
              <span className={ LastMonthClasses } onClick={ resetDates }>RESET DATES</span>
            </div>
            {/*
            <div className="col-md-6">
              <span className={ LastMonthClasses } onClick={ setCustomPeriod('Last Month') }>Last Month</span>
            </div>
            */}
          </div>
        </div>
      </form>
    );
  }
}


export default Filters;
