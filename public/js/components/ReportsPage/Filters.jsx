import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import UserCheck from './UserCheck.jsx';
import moment from 'moment';
import classNames from 'classnames';
import InputElement from 'react-input-mask';
import {getDefinedOrEmptyString} from './reportPageHelpers';
import { fetchReportData } from '../../actions/statistics';
import _ from 'lodash';
import DRPicker from './dateRangePicker';

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
    foo() {
      console.log('Its alive!');
    }
    handleUserCheck(event) {
      if (event.target.checked) {
        this.state.users.push(event.target.value);
      } else {
        _.remove(this.state.users, function(login) {
            return login === event.target.value;
        });
      }
      let action = {
        type: 'STORE_REPORT_USERS',
        users: this.state.users
      }
      store.dispatch(action);
    }

    chooseCustomPeriod(event) {
      const stateField = event.target.id;
      if (event.target.id === 'startDateFilter') {
        this.setState({startDateFilter: event.target.value});

      } else {
        this.setState({endDateFilter: event.target.value});
      }
    }

    chooseOptionalPeriod(event) {
      event.preventDefault();

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

      this.setState(periodChanges);
    }

    getTheReport() {
      console.log('this.props.some');
      const users = this.props.some.users;
      const startDate = this.props.some.startDate;
      const endDate = this.props.some.endDate;

      store.dispatch(fetchReportData(users, startDate, endDate));

    }

    render() {
        const colondwidth = 6;
        const colonClass = classNames(`col-md-${colondwidth}`);
        const {dateCreated} = this.state;

        console.log(this.state.startDateFilter);

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
                <DRPicker period={this.props.period} />      
            </div>
        );
    }
}

const fetchProps = function(state) {
    return {
      startDate: state.reportRequest.startDateFilter,
      endDate: state.reportRequest.endDateFilter
    };
}

export default connect(fetchProps)(Filters);
