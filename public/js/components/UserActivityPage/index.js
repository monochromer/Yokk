import React from 'react';
import UserActivityTable from './UserActivityTable.jsx';
import {FilterPeriod} from './Filters.jsx';
import dateRangePicker from './DateRangePicker.jsx';
require("./css/dateRangePicker.css");

class UserActivityPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                  Here should be dateRangePicker
                  <FilterPeriod />
                </div>
                <UserActivityTable login={this.props.routeParams.login} />
            </div>
        );
    }
};

export default UserActivityPage
