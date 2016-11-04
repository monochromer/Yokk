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

        let userActivityPageLink = `/user/activityPage/${this.props.user.login}`;
        let photo = typeof(this.props.user.profileImg) !== "undefined" ? this.props.user.profileImg.small : "";
        let buttons = "";
        let actionButtons = (
            <div className="btn-group" role="group">
                <Link onClick={ this.dispatchUserToShow } to={ userActivityPageLink } className="btn btn-primary">Show
                    activities</Link>
                <Link to={ '/user/edit/' + this.props.user.login } className="btn btn-warning">Edit</Link>
                <button className="btn btn-danger" onClick={ this.handleRemove }>Remove</button>
            </div>
        );


        if (this.props.currentUser.role == "admin" || this.props.currentUser.login == this.props.user.login) {
            buttons = actionButtons;
        }


        return (
            <div className="row">

                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={ photo } width="50px" className="img-rounded"/>
                        </div>
                        <div className="col-md-10">
                            <Link to={ '/user/' + this.props.user.login } className="profile-row__name">{ this.props.user.fullname ? this.props.user.fullname : this.props.user.login }</Link><br/>
                            <span className="role profile-row__role">{ this.props.user.role }</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    { this.props.user.position }
                </div>

                <div className="col-md-2">
                    { moment(this.props.user.joinedon).format("DD.MM.YYYY") }
                </div>

                <div className="col-md-2">
                    { buttons }
                </div>

            </div>
        )
    }
}

export default UserRow
