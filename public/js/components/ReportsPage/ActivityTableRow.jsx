import React from 'react';
import {Link} from 'react-router';
import {deleteUser} from '../../actions/users.js';
import store from '../../store.js';
import moment from 'moment';

class ActivityTableRow extends React.Component {
    render() {
      let foo = 'bar';
      console.log(this.props);
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
                <td>{this.foo}</td>
                <td>120 hours</td>
                <td>100 hours</td >
                <td>10 hours</td>
                <td>10 hours</td>
            </tr>
        );
    }
}

export default ActivityTableRow
