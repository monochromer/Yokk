import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('../../../../node_modules/react-datepicker/dist/react-datepicker.min.css');

var dp = React.createClass({
    displayName: 'DatePicker',

    getInitialState: function() {
        return {startDate: moment()};
    },

    handleChange: function(date) {
        this.setState({startDate: date});
    },

    render: function() {
        return <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>;
    }
});

export default dp;
