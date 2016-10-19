import React from 'react';
import {Link} from 'react-router';
import {deleteUser} from '../../actions/users.js';
import store from '../../store.js';
import moment from 'moment';

class ReportTableRow extends React.Component {
    render() {
      let userName, totalDuration, redmineDuration, upworkDuration, directDuration;
      if (typeof this.props.responseData !== 'undefined') {
        userName = this.props.userName;
        totalDuration = this.props.responseData.total;
        redmineDuration = this.props.responseData.redmine;
        upworkDuration = 'feature is not implemented yet'
        directDuration = this.props.responseData.eop;
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

export default ReportTableRow
