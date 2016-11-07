import React from 'react'
import store from '../../store.js'
import { connect } from 'react-redux'

import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import UserRow from './UserRow.jsx'
import ModalUserAdd from './ModalUserAdd.jsx'


class UsersTable extends React.Component {

    showModalUserAdd() {
        store.dispatch({ type: "MODAL_ADD_USER_SHOW" });
    }

    render() {
        return (
            <div className="container container__flex1 container__fixed">
                <div className="row user-table_header">
                    <div className="col-md-8 col-md-offset-2 text-center">
                        <h2>Team</h2>
                    </div>
                    <div className="col-md-2 text-right">
                        <button className="btn btn_trans-blue" onClick={this.showModalUserAdd}>+ Add New</button>
                    </div>
                </div>
                <div className="row users-list_heading">
                    <div className="col-md-3 user-list_title">Full name</div>
                    <div className="col-md-4 user-list_title">Position</div>
                    <div className="col-md-2 user-list_title">Sources</div>
                    <div className="col-md-2 user-list_title">Actions</div>
                    <div className="col-md-1 user-list_title"></div>
                </div>
                {
                    this.props.users.map((user) => {
                        return <UserRow user={ user } currentUser={ this.props.currentUser }
                                        key={ user._id }/>
                    })
                }
            </div>
        );
    }
}

function fetchUsersStateToProps(state) {
    return {
        users: state.users.list,
        currentUser: state.currentUser
    }
}

export default connect(fetchUsersStateToProps)(UsersTable);
