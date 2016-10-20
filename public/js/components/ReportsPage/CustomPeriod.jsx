import React from 'react';
import store from '../../store.js';
import moment from 'moment';
import {connect} from 'react-redux';
import classNames from 'classnames';
import InputElement from 'react-input-mask';
import {getDefinedOrEmptyString} from './reportPageHelpers';

class CustomPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateCreated: {
                valid: true,
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
        const startDate = getDefinedOrEmptyString(this.props.startDateFilter);
        const endDate = getDefinedOrEmptyString(this.props.endDateFilter);
        const {dateCreated} = this.state;
        console.log('CustomPeriod -> render():');
        console.log(startDate);
        console.log('17.10.2016' === startDate);
        console.log(endDate);
        return (
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
        );
    }
}

const fetchProps = function(state) {
    return {
      startDateFilter: state.reportRequest.startDateFilter,
      endDateFilter: state.reportRequest.endDateFilter
    };
}

export default connect(fetchProps)(CustomPeriod);
