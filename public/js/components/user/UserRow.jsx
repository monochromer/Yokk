import React from 'react';
import {Link} from 'react-router';
import store from '../../store.js';
import moment from 'moment';


class UserRow extends React.Component {

    handleRemove() {
        store.dispatch({type: "MODAL_DELETE_SHOW", login: this.props.user.login})
    }

    dispatchUserToShow() {
        store.dispatch({type: "SAVE_USER_TO_SHOW", user: this.props.user.login})
    }

    render() {
        let { login, role, position, joinedon, profileImg, fullname } = this.props.user;
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


        if (role == "admin" || this.props.currentUser.login == login) {
            buttons = actionButtons;
        }

        position = position ? position : "No Information";

        return (
            <div className="row users-list_row">

                <div className="col-md-3">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={ photo } width="40px" className="img-circle" />
                        </div>
                        <div className="col-md-10">
                            <Link to={ '/user/' + login } className="users-list_user-name">
                                { name }
                            </Link>
                            <span className="users-list_user-role">{ role }</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 users-list_position"> { position } </div>

                <div className="col-md-2"></div>
                <div className="col-md-2"> <a href={ userActivityPageLink }> Show Activity </a> </div>
                <div className="col-md-1"> { buttons } </div>

            </div>
        )
    }
}

export default UserRow
