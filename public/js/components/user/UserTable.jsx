import React from 'react'
import store from '../../store.js'
import { connect } from "react-redux"

import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import UserRow from './UserRow.jsx'
import ModalUserAdd from './ModalUserAdd.jsx'


class UsersTable extends React.Component{
    showModalUserAdd() {
        store.dispatch({ type: "MODAL_ADD_USER_SHOW" });
    }

    render() {
        return (
            <div className="container">
                <div className="row user-table_header">
                    <div className="col-md-8 col-md-offset-2 text-center">
                        <h2>Team</h2>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn_trans-blue" onClick={this.showModalUserAdd}>Add New</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Table hover>
                            <thead className="users-table__thead">
                            <tr>
                                <th className="users-table__title">User</th>
                                <th className="users-table__title">Position</th>
                                <th className="users-table__title">Joined on</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.users.map((user) => {
                                    return <UserRow user={ user } currentUser={ this.props.currentUser }
                                                    key={ user._id }/>
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

var fetchUsersStateToProps = function(state) {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}


export default connect(fetchUsersStateToProps)(UsersTable);
