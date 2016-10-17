import React from 'react';
import {Link} from 'react-router';
import {deleteUser} from '../../actions/users.js';
import store from '../../store.js';
import moment from 'moment';
import UserCheck from './UserCheck.jsx';
import datePicker from './DatePicker.jsx';
import classNames from 'classnames';

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
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        from <datePicker />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        to <datePicker />
                    </div>
                </div>
            </div>
        );
    }
}
