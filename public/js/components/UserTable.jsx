import React from 'react';
import store from '../store.js';
import { connect } from "react-redux"

import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import UserRow from './UserRow.jsx';



var UsersTable = React.createClass({

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h2>Team</h2>  
                    </div> 
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Fullname</th>
                                    <th>Position</th>
                                    <th>Joined on</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.users.map( (user) => {
                                    return <UserRow name={ user.login } joinedon={ user.joinedon } position={ user.position } currentUser={ this.props.currentUser } key={ user._id } />
                                })
                            }
                            </tbody>
                        </Table>
                    </div>    
                </div>
            </div>        
        );
    }
});

var fetchUsersStateToProps = function(state) {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}


export default connect(fetchUsersStateToProps)(UsersTable);