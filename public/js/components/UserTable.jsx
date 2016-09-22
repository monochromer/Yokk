import React from 'react';
import store from '../store.js';
import { connect } from "react-redux"

import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { fetchUsers } from '../actions/crudUser';
import UserRow from './UserRow.jsx';



var UsersTable = React.createClass({

    componentWillMount: function() {
        store.dispatch(fetchUsers());
    },

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
                                this.props.users.map( function(user) {
                                    return <UserRow name={ user.login } joinedOn={ user.joinedOn } position={ user.position } key={ user._id } />
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

var fetchUserStateToProps = function f(state) {
    return {
        users: state.users
    }
}


export default connect(fetchUserStateToProps)(UsersTable);