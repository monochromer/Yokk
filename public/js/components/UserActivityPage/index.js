import React from 'react';
import UserActivityTable from './UserActivityTable.jsx';
import FilterPeriod from './FilterPeriod.jsx';
import store from '../../store';
import {connect} from 'react-redux';
import {getUserFullName} from './helpers.js'
// import dateRangePicker from './DateRangePicker.jsx';
// require("./css/dateRangePicker.css");

class UserActivityPage extends React.Component {
    render() {
        const userPageRenderedFor = getUserFullName(this.props.routeParams.login, this.props.users)
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Activity Page for {userPageRenderedFor}</h2>
                    </div>
                    <div>
                        <FilterPeriod/>
                    </div>
                </div>
                <div className="row">
                    <UserActivityTable login={this.props.routeParams.login}/>
                </div>
            </div>
        );
    }
}

let getProps = function(state) {
    return {users: state.users};
}

export default connect(getProps)(UserActivityPage);
