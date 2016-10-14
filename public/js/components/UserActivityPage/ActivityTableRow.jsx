import React from 'react';
import {Link} from 'react-router';
import {deleteUser} from '../../actions/users.js';
import store from '../../store.js';
import moment from 'moment';

class ActivityTableRow extends React.Component{
    render() {
        return (
            <tr>
                <td>Oleg Zhermal</td>
                <td>120 hours</td>
                <td>100 hours</td >
                <td>10 hours</td>
                <td>10 hours</td>
            </tr>
        );
    }
}

export default ActivityTableRow
