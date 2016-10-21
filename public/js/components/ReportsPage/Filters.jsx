import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import UserCheck from './UserCheck.jsx';
import moment from 'moment';
import classNames from 'classnames';
import InputElement from 'react-input-mask';
import {getDefinedOrEmptyString} from './reportPageHelpers';
import { fetchReportData } from '../../actions/statistics'
import _ from 'lodash';

const getPeriodOptionalPeriodLink = function(text, appliedClasses, handler) {
    return (
        <div className={appliedClasses}>
            <a href='#' onClick={handler}>{text}</a>
        </div>
    );
}

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateCreated: {
                valid: true
            },
            users: [],
            startDateFilter: '',
            endDateFilter: ''
        };
        this.handleUserCheck = this.handleUserCheck.bind(this);
        this.chooseCustomPeriod = this.chooseCustomPeriod.bind(this);
        this.chooseOptionalPeriod = this.chooseOptionalPeriod.bind(this);
        this.getTheReport = this.getTheReport.bind(this);
    }

    handleUserCheck(event) {
      if (event.target.checked) {
        this.state.users.push(event.target.value);
      } else {
        _.remove(this.state.users, function(login) {
            return login === event.target.value;
        });
      }
      console.log(this.state.users);
    }

    chooseCustomPeriod(event) {
      const stateField = event.target.id;
      if (event.target.id === 'startDateFilter') {
        this.setState({startDateFilter: event.target.value});
      } else {
        this.setState({endDateFilter: event.target.value});
      }
      console.log('this.state after chooseCustomPeriod()');
      console.log(this.state);
    }

    chooseOptionalPeriod(event) {
      // event.preventDefault();
      const optionalPeriod = event.target.innerHTML;
      let periodChanges = {endDateFilter: moment().format('DD.MM.YYYY')};

      switch (optionalPeriod) {
          case "This week":
            periodChanges.startDateFilter = moment().startOf('isoWeek').format('DD.MM.YYYY');
            break;
          case "Last week":
            periodChanges.startDateFilter = moment().subtract(1, 'week').format('DD.MM.YYYY');
            break;
          case "This month":
            periodChanges.startDateFilter = moment().startOf('month').format('DD.MM.YYYY');
            break;
          case "Last month":
            periodChanges.startDateFilter = moment().subtract(1, 'month').format('DD.MM.YYYY');
            break;
          default:
            periodChanges = {};
      }
    }

    getTheReport() {

      let users = this.state.users;

      let startDateFilter, endDateFilter;
      if (moment(this.state.startDateFilter, 'DD.MM.YYYY', true).isValid()) {
          startDateFilter = this.state.startDateFilter;
      }
      if (moment(this.state.endDateFilter, 'DD.MM.YYYY', true).isValid()) {
          endDateFilter = this.state.endDateFilter;
      }

      store.dispatch(fetchReportData(users, startDateFilter, endDateFilter));

    }

    render() {
        // console.log('render is called');
        // console.log(this.state);
        const colondwidth = 6;
        const colonClass = classNames(`col-md-${colondwidth}`);
        const {dateCreated} = this.state;
        const startDate = '10.10.2016';
        const endDate = '20.10.2016';

        return (
            <div>
                <h2>Users</h2>
                {
                  this.props.users.map((user) => {
                    const fullNameOrLogin = user.fullname ? user.fullname : `(login:) ${user.login}`;
                    function distinguishChecked(checkStatus) {
                      if (checkStatus === true) {
                        return <b>{fullNameOrLogin}</b>
                      }
                      return fullNameOrLogin
                    }
                    const text = distinguishChecked(this.state.checked);
                    return (
                      <div className="row" key={user._id}>
                          <div className="col-md-12">
                              <input type="checkbox" onChange={this.handleUserCheck} value={user.login} />&nbsp;{text}
                          </div>
                      </div>
                    );
                  })
                }
                <div>
                    <h2>Periods</h2>
                      <div>
                          <div className="row">
                              {getPeriodOptionalPeriodLink('This week', colonClass, this.chooseOptionalPeriod)}
                              {getPeriodOptionalPeriodLink('Last week', colonClass, this.chooseOptionalPeriod)}
                          </div>
                          <div className="row">
                              {getPeriodOptionalPeriodLink('This month', colonClass, this.chooseOptionalPeriod)}
                              {getPeriodOptionalPeriodLink('Last month', colonClass, this.chooseOptionalPeriod)}
                          </div>
                      </div>
                      <div>
                          <div className="row">
                              <div className="col-md-7">
                                  <div className={dateCreated.valid ? "form-group" : "form-group has-error"}>
                                      <label htmlFor="date">From</label>
                                      <InputElement defaultValue={this.state.startDateFilter} onChange={this.chooseCustomPeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="startDateFilter"/>
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-7">
                                  <div className={dateCreated.valid ? "form-group" : "form-group has-error"}>
                                      <label htmlFor="date">To</label>
                                      <InputElement defaultValue={this.state.startDateFilter} onChange={this.chooseCustomPeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="endDateFilter"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                </div>
                <div className="col-md-1">
                    <button onClick={this.getTheReport} className="btn btn-success" style={{"marginTop": "3vh"}}>
                        Calculate
                    </button>
                </div>
            </div>
        );
    }
}

const fetchProps = function(state) {
    console.log('Here is the store!:');
    console.log(state);
    // let startDate;
    // let endDate;
    // if (typeof state.usersActivities.startDateFilter !=== 'undefined') {
    //   startDate === state.usersActivities.startDateFilter;
    // }
    return {
      startDate: state.usersActivities.startDateFilter,
      endDate: state.usersActivities.endDateFilter
    };
}

export default connect(fetchProps)(Filters);
