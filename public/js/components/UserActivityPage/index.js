import React from 'react';
import UserActivityTable from './UserActivityTable.jsx';

class UserActivityPage extends React.Component {
    render() {
        return (
            <div>
                <UserActivityTable login={this.props.routeParams.login} />
            </div>
        );
    }
};

export default UserActivityPage
