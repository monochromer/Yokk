import React from 'react';
import { Link } from 'react-router';
import store from '../../store.js';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/users'


class UserRow extends React.Component {

    constructor(props) {
        super(props);
        this.dispatchUserToShow = this.dispatchUserToShow.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        store.dispatch( deleteUser(this.props.user._id) );
    }

    dispatchUserToShow() {
        store.dispatch({type: "SAVE_USER_TO_SHOW", user: this.props.user.login})
    }

    render() {
        let { login, role, position, profileImg, fullname, redmineApiKey } = this.props.user;
        let userActivityPageLink = `/user/activityPage/${ login }`;
        let photo = profileImg ? profileImg.small : "";
        let name = fullname ? fullname : login;
        let buttons = "";

        let actionButtons = (
            <div className="btn-group" role="group">
                <Link to={ '/user/edit/' + login } className="">
                    <img src="/img/icon-user-edit.svg" alt="edit" width="20px" />
                </Link>
                <span className="users-list_edit" onClick={ this.handleRemove }>
                    <img src="/img/icon-user-delete.svg" alt="delete" width="20px" />
                </span>
            </div>
        );


        if (this.props.currentUser.role === "admin" || this.props.currentUser.login === login) {
            buttons = actionButtons;
        }

        const redmine = redmineApiKey ? <img src="/img/redmine-active.svg" width="52px" height="52px" alt="redmine" /> : "Nothing";
        position = position ? position : "No Information";

        return (
            <div className="row users-list_row vertical-center">

                <div className="col-md-3">
                    <div className="row">
                        <div className="col-md-3 users-list_photo">
                            <img src={ photo } width="40px" className="img-circle" alt="user" />
                        </div>
                        <div className="col-md-9">
                            <Link to={ '/user/' + login } className="users-list_user-name">
                                { name }
                            </Link>
                            <span className="users-list_user-role">{ role }</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 users-list_position"> { position } </div>

                <div className="col-md-2">{ redmine }</div>
                <div className="col-md-2"> <a href={ userActivityPageLink }> Show Activity </a> </div>
                <div className="col-md-1"> { buttons } </div>

            </div>
        )
    }
}

function getParams(store) {
    return {
        currentUser: store.currentUser.data
    }
}

export default connect(getParams)(UserRow)
