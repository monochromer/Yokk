import React from 'react';
import store from '../../store.js';
import {convertToHours} from './reportPageHelpers.js';
import {Link} from 'react-router';

class ReportTableRow extends React.Component {
    dispatchUserToShow() {
        store.dispatch({type: "SAVE_USER_TO_SHOW", user: this.props.userName});
    }
    render() {
        let UserActivityPageLink = `/user/activityPage/${this.props.userName}`;

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
                <td>
                    <Link onClick={this.dispatchUserToShow} to={UserActivityPageLink}>{userName}</Link>
                </td>
                <td>{totalDuration}</td>
                <td>{redmineDuration}</td>
                <td>{upworkDuration}</td>
                <td>{directDuration}</td>
            </tr>
        );
    }
}

export default ReportTableRow;
