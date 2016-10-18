import React from 'react';
import {Link} from 'react-router';
import {deleteUser} from '../../actions/users.js';
import store from '../../store.js';
import moment from 'moment';
import UserCheck from './UserCheck.jsx';
import classNames from 'classnames';
import InputElement from 'react-input-mask';
import DateRangePicker from 'react-bootstrap-daterangepicker';
require('./css/dpicker.css')

class someReactComponent extends React.Component {
    render() {
        return (
            <DateRangePicker startDate={moment('1/1/2014')} endDate={moment('3/1/2014')}>
                <div>Click Me To Open Picker!</div>
            </DateRangePicker>
        );
    }
};

export class OptionalPeriod extends React.Component {
    render() {
        let desiredWidth = 6;
        var colClass = classNames(`col-md-${desiredWidth}`);
        return (
            <div>
                <div className="row">
                    <div className={colClass}>
                        <a>This week</a>
                    </div>
                    <div className={colClass}>
                        <a>Last week</a>
                    </div>
                </div>
                <div className="row">
                    <div className={colClass}>
                        <a>This month</a>
                    </div>
                    <div className={colClass}>
                        <a>Last month</a>
                    </div>
                </div>
            </div>
        );
    }
}

export class CustomPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateCreated: {
                value: "",
                valid: true,
                virgin: false
            }
        };
    }

    changePeriod(e) {
        if (moment(e.target.value, 'DD.MM.YYYY', true).isValid()) {
            let action = {
                type: "CHOOSE_PERIOD_FOR_REPORT"
            };
            action[e.target.id] = e.target.value;
            store.dispatch(action);
        }
        console.log(moment(e.target.value, 'DD.MM.YYYY').toDate());
    }

    render() {
        let {dateCreated} = this.state
        return (
            <div>
                <div className="row">
                  <div className="col-md-7">
                      <div className={dateCreated.valid
                          ? "form-group"
                          : "form-group has-error"}>
                          <label htmlFor="date">From</label>
                          <InputElement onChange={this.changePeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="startDateFilter"/>
                      </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                      <div className={dateCreated.valid
                          ? "form-group"
                          : "form-group has-error"}>
                          <label htmlFor="date">To</label>
                          <InputElement onChange={this.changePeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="endDateFilter"/>
                      </div>
                  </div>
                </div>
            </div>
        );
    }
}
