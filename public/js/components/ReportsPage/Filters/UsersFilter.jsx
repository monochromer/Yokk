import React from 'react';
import UserRow from './UserRow.jsx';

class UsersFilter extends React.Component {
    render() {
        const usersForReport = this.props.usersForReport || [];

        if (typeof this.props.users[0] !== 'undefined') {
            return (
                <div>
                    {
                        this.props.users.map((user) => {
                            return (<UserRow user={user} key={user._id} checkStatus={usersForReport.includes(user.login)}/>);
                        })
                    }
                </div>
            );
        } else { return ( <div></div> ) }
    }
}

export default UsersFilter;
