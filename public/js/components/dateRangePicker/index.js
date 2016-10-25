import React from 'react';
import store from '../../store.js';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {fetchReportData} from '../../actions/statistics';
import {Button, Glyphicon} from 'react-bootstrap';
require('./react-daterangepicker.css');
import {fetchNextTimeEntryBatchWhenChangingDate} from '../../actions/timeEntries.js';

const ranges = {
    'Today': [ moment(), moment() ],
    'Yesterday': [ moment().subtract(1, 'days'), moment().subtract(1, 'days') ],
    'Last 7 Days': [ moment().subtract(6, 'days'), moment() ],
    'Last 30 Days': [ moment().subtract(29, 'days'), moment() ],
    'This Month': [ moment().startOf('month'), moment().endOf('month') ],
    'Last Month': [ moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month') ]
};

class DRPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(event, picker) {
        console.log('MAYV');
        console.log(this.props);
        const oldestMoment = moment(this.props.oldestLoadedRecorDate, 'YYYY-MM-DD');

        let action = {
            startDate: picker.startDate.format('DD.MM.YYYY'),
            endDate: picker.endDate.format('DD.MM.YYYY')
        }

        switch (this.props.parentComponent) {
            case 'Filters':
                action.type = 'STORE_REPORT_PERIOD';
                store.dispatch(action);
                break;
            case 'UserActivityPage':
                action.type = 'STORE_USER_ACTIVITY_PERIOD_FILTER';
                action.user = this.props.login;

                // if no oldestDate check, warning in console because function is called twice (some kind of DateRangePicker behavior when onEvent calle twice)
                if (picker.startDate.isBefore(oldestMoment.toDate(), 'day') && (picker.startDate.format('DD.MM.YYYY') !== store.getState().usersActivities[this.props.login].oldestDate)) {
                    store.dispatch({type:'STORE_OLDEST_DATE', oldestDate: picker.startDate.format('DD.MM.YYYY'), user: this.props.login})
                    store.dispatch(fetchNextTimeEntryBatchWhenChangingDate(0, 1000, this.props.login, action.startDate, oldestMoment.subtract(1, 'day').format('DD.MM.YYYY')));
                }

                store.dispatch(action);

                break;
        }
    }

    render() {
        let start,
            end;
        if (this.props.period && this.props.period.startDate) {
            start = moment(this.props.period.startDate, 'DD.MM.YYYY');
            end = moment(this.props.period.endDate, 'DD.MM.YYYY');
        } else {
            start = moment().subtract(1, 'month');
            end = moment();
        }
        var label = start.format('DD.MM.YYYY') + ' - ' + end.format('DD.MM.YYYY');
        if (start === end) {
            label = start.format('DD.MM.YYYY');
        }
        return (
            <DateRangePicker startDate={start} endDate={end} ranges={ranges} onEvent={this.handleEvent}>
                <Button className="selected-date-range-btn">
                    <div className="pull-left"><Glyphicon glyph="calendar"/></div>&nbsp;
                    <div className="pull-right">
                        <span>
                            {label}
                        </span>&nbsp;
                        <span className="caret"></span>
                    </div>
                </Button>
            </DateRangePicker>
        )
    }
}

export default DRPicker;
