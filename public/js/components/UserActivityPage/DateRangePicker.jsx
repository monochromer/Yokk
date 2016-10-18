import React from 'react';
import ReactDOM from 'react-dom';
import BS from 'react-bootstrap';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
require("./css/dateRangePicker.css");

class dateRangePicker extends React.Component {
    render() {
      return (
          <DateRangePicker startDate={moment('1/1/2014')} endDate={moment('3/1/2014')}>
              <div>Click Me To Open Picker!</div>
          </DateRangePicker>
      );
    }
};

export default dateRangePicker
