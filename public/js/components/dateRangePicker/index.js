import React from 'react';
import store from '../../store.js';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {fetchReportData} from '../../actions/statistics';
import {Button, Glyphicon} from 'react-bootstrap';
require('./react-daterangepicker.css');
import {fetchNextTimeEntryBatchWhenChangingDate} from '../../actions/timeEntries.js';

const ranges = {
    'Today': [
        moment(), moment()
    ],
    'Yesterday': [
        moment().subtract(1, 'days'),
        moment().subtract(1, 'days')
    ],
    'Last 7 Days': [
        moment().subtract(6, 'days'),
        moment()
    ],
    'Last 30 Days': [
        moment().subtract(29, 'days'),
        moment()
    ],
    'This Month': [
        moment().startOf('month'), moment().endOf('month')
    ],
    'Last Month': [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month')
    ]
};

class DRPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(event, picker) {
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
                store.dispatch({type: 'USER_ACTIVITY_SET_FILTER', filter: true, user: this.props.login});

                action.type = 'STORE_USER_ACTIVITY_PERIOD_FILTER';
                action.user = this.props.login;

                // if no oldestDate check, warning in console because function is called twice (some kind of DateRangePicker behavior when onEvent calle twice)
                if (picker.startDate.isBefore(oldestMoment.toDate(), 'day') && (picker.startDate.format('DD.MM.YYYY') !== store.getState().usersActivities[this.props.login].oldestDate)) {
                    store.dispatch({type: 'STORE_OLDEST_DATE', oldestDate: picker.startDate.format('DD.MM.YYYY'), user: this.props.login})
                    store.dispatch(fetchNextTimeEntryBatchWhenChangingDate(0, 1000, this.props.login, action.startDate, oldestMoment.format('DD.MM.YYYY')));
                }

                store.dispatch(action);

                break;
        }
    }

    render() {
        const {start, end} = getStartEndMoments(moment, this.props.period);
        const label = getDRPLabel(this.props.period);

        function getDRPLabel(period) {
            if (!period)
                return;
            if (period.startDate === period.endDate) {
                return period.startDate;
            }
            return period.startDate + ' - ' + period.endDate;
        }

        function getStartEndMoments(momentNPM, period) {
            if (period && period.startDate) {
                return {
                    start: momentNPM(period.startDate, 'DD.MM.YYYY'),
                    end: momentNPM(period.endDate, 'DD.MM.YYYY')
                }
            }
            return {
                start: momentNPM().subtract(1, 'month'),
                end: momentNPM()
            }
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
