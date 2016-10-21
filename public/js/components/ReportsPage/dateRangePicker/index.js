import React from 'react';
import store from '../../../store.js';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {fetchReportData} from '../../../actions/statistics';
import {Button, Glyphicon} from 'react-bootstrap';
require('./react-daterangepicker.css');

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
        this.state = {
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(event, picker) {
        this.setState({startDate: picker.startDate, endDate: picker.endDate});
        let action = {
            type: 'STORE_REPORT_PERIOD',
            startDate: picker.startDate.format('DD.MM.YYYY'),
            endDate: picker.endDate.format('DD.MM.YYYY')
        }
        store.dispatch(action);
    }

    render() {
        var start = this.state.startDate.format('DD.MM.YYYY');
        var end = this.state.endDate.format('DD.MM.YYYY');
        var label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        return (
            <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={ranges} onEvent={this.handleEvent}>
                <Button className="selected-date-range-btn" style={{
                    width: '100%'
                }}>
                    <div className="pull-left"><Glyphicon glyph="calendar"/></div>
                    <div className="pull-right">
                        <span>
                            {label}
                        </span>
                        <span className="caret"></span>
                    </div>
                </Button>
            </DateRangePicker>
        )
    }
}

export default DRPicker;
