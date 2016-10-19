import React from 'react';
import {Link} from 'react-router';
import {deleteUser} from '../../actions/users.js';
import store from '../../store.js';
import moment from 'moment';

class ActivityTableRow extends React.Component {
    render() {
      console.log('this.props from ActivityTableRow:');
      console.log(this.props);

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

        // console.log('Props from ActivityTableRow');
        // console.log(this.props);
        // let tableRows = [];
        // if (typeof this.props.responseData !== 'undefined') {
        //   let data = this.props.responseData.data;
        //   for (let key in data) {
        //       console.log(key);
        //       let tableRowString = `
        //           <tr>
        //               <td>${key}</td>
        //               <td>${data[key].total}</td>
        //               <td>${data[key].redmine}</td >
        //               <td>No implementation</td>
        //               <td>${data[key].eop}</td>
        //           </tr>
        //           `
        //       tableRows.push(tableRowString);
        //   }
        // }
        // console.log(tableRows);
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

export default ActivityTableRow
