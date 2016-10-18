import React from 'react';
import store from '../../store';
import InputElement from 'react-input-mask';
import moment from 'moment';

export class FilterPeriod extends React.Component {
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
                type: "STORE_PERIOD_FILTER"
            };
            action[e.target.id] = e.target.value;
            store.dispatch(action);
        }
        // console.log(moment(e.target.value, 'DD.MM.YYYY').toDate());
    }

    render() {
        let {dateCreated} = this.state;
        return (
            <div>
                <div className="col-md-2">
                    <div className={dateCreated.valid
                        ? "form-group"
                        : "form-group has-error"}>
                        <label htmlFor="date">From</label>
                        <InputElement onChange={this.changePeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="startDateFilter"/>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className={dateCreated.valid
                        ? "form-group"
                        : "form-group has-error"}>
                        <label htmlFor="date">To</label>
                        <InputElement onChange={this.changePeriod} className="form-control" onBlur={this.blurDate} mask="99.99.9999" id="endDateFilter"/>
                    </div>
                </div>
            </div>
        );
    }
}
