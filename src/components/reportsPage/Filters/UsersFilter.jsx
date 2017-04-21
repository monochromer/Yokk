import React from 'react';
import UserRow from './UserRow.jsx';

class UsersFilter extends React.Component {
    render() {
        const usersForReport = this.props.usersForReport || [];

        if (this.props.users) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.users.map((user) => {
                                return (<UserRow user={user} key={user._id} checkStatus={usersForReport.includes(user.login)}/>);
                            })
                        }
                    </div>
                </div>
            );
        } else { return ( <div></div> ) }
    }
}

export default UsersFilter;
