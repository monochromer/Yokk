import React from 'react';
import store from '../../store.js';
import {convertToHours} from './reportPageHelpers.js';

class ReportTableRow extends React.Component {
    render() {
        let userName,
            totalDuration,
            redmineDuration,
            upworkDuration,
            directDuration;

        if (typeof this.props.responseData !== 'undefined') {
            userName = this.props.userName;
            totalDuration = convertToHours(this.props.responseData.total);
            redmineDuration = convertToHours(this.props.responseData.redmine);
            upworkDuration = 'feature is not implemented yet'
            directDuration = convertToHours(this.props.responseData.eop);
        } else {
            userName = totalDuration = redmineDuration = upworkDuration = directDuration = 'no data';
        }

        return (
            <tr>
                <td>{userName}</td>
                <td>{totalDuration}</td>
                <td>{redmineDuration}</td>
                <td>{upworkDuration}</td>
                <td>{directDuration}</td>
            </tr>
        );
    }
}

export default ReportTableRow;
