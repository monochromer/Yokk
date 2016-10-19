import React from 'react';
import store from '../../store';
import InputElement from 'react-input-mask';
import moment from 'moment';

class FilterPeriod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateCreated: {
                valid: true
            }
        };
    }

    changePeriod(e) {
        let action = {
            type: "STORE_PERIOD_FILTER"
        };
        if (moment(e.target.value, 'DD.MM.YYYY', true).isValid()) {
            action[e.target.id] = e.target.value;
            store.dispatch(action);
        }
        if (e.target.value === '__.__.____') {
            if (e.target.id === 'startDateFilter') {
              action[e.target.id] = '01.01.2000';
            } else {
              action[e.target.id] = moment().format('DD.MM.YYYY');
            }
            store.dispatch(action);
        }
    }

    render() {
        let {dateCreated} = this.state;
        return (
            <div>
                <div className="col-md-2">
                    <div className={dateCreated.valid ? "form-group" : "form-group has-error"}>
                        <label htmlFor="date">From</label>
                        <InputElement onChange={this.changePeriod} className="form-control" mask="99.99.9999" id="startDateFilter"/>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className={dateCreated.valid ? "form-group" : "form-group has-error"}>
                        <label htmlFor="date">To</label>
                        <InputElement onChange={this.changePeriod} className="form-control" mask="99.99.9999" id="endDateFilter"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterPeriod;
