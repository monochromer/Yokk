import React from 'react'
import store from '../../store.js'
import { connect } from "react-redux"

import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import UserRow from './UserRow.jsx'
import ModalUserAdd from './ModalUserAdd.jsx'


var UsersTable = React.createClass({

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h2>Team </h2>
                    </div>
                    <div className="col-md-2 col-md-offset-8 text-right" style={{ "marginTop": "23px"}}>
                        <button className="btn btn-default">
                            <span className="glyphicon glyphicon-plus"></span> add new
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Fullname</th>
                                    <th>Position</th>
                                    <th>Joined on</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.users.map( (user) => {
                                    return <UserRow user={ user } currentUser={ this.props.currentUser } key={ user._id } />
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <ModalUserAdd />
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
