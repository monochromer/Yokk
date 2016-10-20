import React from 'react';
import store from '../../store.js';
import moment from 'moment';
import classNames from 'classnames';
import InputElement from 'react-input-mask';

const PeriodFilterLink = function({filter, children}) {
  <a href='#'
    onClick={e => e.preventDefault();
    store.dispatch({
      type: 'SET_REPORT_PERIOD',
      filter
    })}>
  </a>
};

export class OptionalPeriod extends React.Component {
    render() {
        let colondwidth = 6;
        var colonClass = classNames(`col-md-${colondwidth}`);
        return (
            <div>
                <div className="row">
                    <div className={colonClass}>
                        <a>This week</a>
                    </div>
                    <div className={colonClass}>
                        <a>Last week</a>
                    </div>
                </div>
                <div className="row">
                    <div className={colonClass}>
                        <a>This month</a>
                    </div>
                    <div className={colonClass}>
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

    changePeriod(event) {
        if (moment(event.target.value, 'DD.MM.YYYY', true).isValid()) {
            let action = {
                type: "CHOOSE_PERIOD_FOR_REPORT"
            };
            action[event.target.id] = event.target.value;
            store.dispatch(action);
        }
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
