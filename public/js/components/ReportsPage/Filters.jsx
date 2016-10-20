import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import UserCheck from './UserCheck.jsx';
import CustomPeriod from './CustomPeriod.jsx';
import OptionalPeriod from './OptionalPeriod.jsx';
import moment from 'moment';
import classNames from 'classnames';
import InputElement from 'react-input-mask';
import {getDefinedOrEmptyString} from './reportPageHelpers';

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
                valid: true,
            }
        };
        this.handleUserCheck = this.handleUserCheck.bind(this);
    }

    handleUserCheck(){
      this.setState({ checked: !this.state.checked });

      // let action = {
      //     payload: { login: event.target.value }
      // };
      //
      // if (!this.state.checked) {
      //     action.type = "ADD_USER_TO_REPORT";
      //     action.payload.checked = true;
      // } else {
      //     action.type = "DELETE_USER_FROM_REPORT";
      //     action.payload.checked = false;
      // }

    }

    render() {
        const colondwidth = 6;
        const colonClass = classNames(`col-md-${colondwidth}`);
        const {dateCreated} = this.state;
        let startDate = '10.10.2016';
        let endDate = '20.10.2016';

        return (
            <div>
                <h2>Users</h2>
                {
                  this.props.users.map((user) => {
                    const fullNameOrLogin = user.fullname ? user.fullname : `(login:) ${user.login}`;
                    const text = this.state.checked ? <b>{fullNameOrLogin}</b> : fullNameOrLogin;
                    return (
                      <div className="row" key={user._id}>
                          <div className="col-md-12">
                              <input type="checkbox" checked={this.state.checked} onChange={this.handleUserCheck} value={user.login}/>&nbsp;{text}
                          </div>
                      </div>
                    );
                  })
                }
                <div>
                    <h2>Periods</h2>
                      <div>
                          <div className="row">
                              {getPeriodOptionalPeriodLink('This week', colonClass, this.getThePeriod)}
                              {getPeriodOptionalPeriodLink('Last week', colonClass, this.getThePeriod)}
                          </div>
                          <div className="row">
                              {getPeriodOptionalPeriodLink('This month', colonClass, this.getThePeriod)}
                              {getPeriodOptionalPeriodLink('Last month', colonClass, this.getThePeriod)}
                          </div>
                      </div>
                      <div>
                          <div className="row">
                              <div className="col-md-7">
                                  <div className={dateCreated.valid ? "form-group" : "form-group has-error"}>
                                      <label htmlFor="date">From</label>
                                      <InputElement defaultValue={startDate} onChange={this.changePeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="startDateFilter"/>
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-7">
                                  <div className={dateCreated.valid ? "form-group" : "form-group has-error"}>
                                      <label htmlFor="date">To</label>
                                      <InputElement defaultValue={endDate} onChange={this.changePeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="endDateFilter"/>
                                  </div>
                              </div>
                          </div>
                      </div>
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
