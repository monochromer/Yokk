import React from 'react';
import {Link} from 'react-router';
import store from '../../store.js';
import moment from 'moment';


var UserRow = React.createClass({

    handleRemove: function () {
        store.dispatch({type: "MODAL_DELETE_SHOW", login: this.props.user.login});
    },

    dispatchUserToShow: function () {
        store.dispatch({type: "SAVE_USER_TO_SHOW", user: this.props.user.login});
    },

    render: function () {

        let UserActivityPageLink = `/user/activityPage/${this.props.user.login}`;
        var buttons = "";

        var actionButtons = (
            <div className="btn-group" role="group">
                <Link onClick={ this.dispatchUserToShow } to={ UserActivityPageLink } className="btn btn-primary">Show
                    activities</Link>
                <Link to={ '/user/edit/' + this.props.user.login } className="btn btn-warning">Edit</Link>
                <button className="btn btn-danger" onClick={ this.handleRemove }>Remove</button>
            </div>
        );


        if (this.props.currentUser.role == "admin" || this.props.currentUser.login == this.props.user.login) {
            buttons = actionButtons;
        }

        var photo = typeof(this.props.user.profileImg) !== "undefined" ? this.props.user.profileImg.small : "";

        return (
            <tr>
                <td>
                    <div className="row profile-row">
                        <div className="col-md-2">
                            <img src={ photo } width="50px" className="img-rounded"/>
                        </div>
                        <div className="col-md-10">
                            <Link to={ '/user/' + this.props.user.login } className="profile-row__name">{ this.props.user.fullname ? this.props.user.fullname : this.props.user.login }</Link><br/>
                            <span className="role profile-row__role">{ this.props.user.role }</span>
                        </div>
                    </div>


                </td>
                <td>{ this.props.user.position }</td>
                <td>{ moment(this.props.user.joinedon).format("DD.MM.YYYY") }</td>
                <td className="text-right">
                    { buttons }
                </td>
            </tr>
        )
    }
});

export default UserRow
