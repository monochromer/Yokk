import React from 'react';
import store from '../../store.js';
import moment from 'moment';
import {connect} from 'react-redux';
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

class OptionalPeriod extends React.Component {
    getThePeriod(event) {
      event.preventDefault();
      const action = {
        type: 'STORE_OPTIONAL_PERIOD_FILTER',
        optionalPeriod: event.target.innerHTML
      };
      store.dispatch(action);
    }

    render() {
        let colondwidth = 6;
        var colonClass = classNames(`col-md-${colondwidth}`);
        return (
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
        );
    }
}

export default OptionalPeriod;
