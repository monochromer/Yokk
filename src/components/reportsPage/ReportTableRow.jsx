import React from 'react';
import store from '../../store.js';
import { convertToHours } from './reportPageHelpers.js';
import { Link } from 'react-router';
import { findUserByLogin } from '../../helpers'
import { connect } from 'react-redux'

class ReportTableRow extends React.Component {
    dispatchUserToShow() {
        store.dispatch({type: "SAVE_USER_TO_SHOW", user: this.props.userName});
    }
    render() {
        // let UserActivityPageLink = `/user/activityPage/${this.props.userName}`;

        let
            // userName,
            totalDuration,
            redmineDuration,
            // upworkDuration,
            directDuration;

        if (typeof this.props.responseData !== 'undefined') {
            // userName = this.props.userName;
            totalDuration = convertToHours(this.props.responseData.total);
            redmineDuration = convertToHours(this.props.responseData.redmine);
            // upworkDuration = 'feature is not implemented yet'
            directDuration = convertToHours(this.props.responseData.eop);
        } else {
            // userName = totalDuration = redmineDuration = upworkDuration = directDuration = 'no data';
        }

        console.log(this.props.user);
        var userProfile = findUserByLogin(this.props.users, this.props.user);
        const { profileImg, fullname, role, login } = userProfile;
        let name = fullname ? fullname : login;
        let photo = profileImg ? profileImg.small : "";

        return (
            <div className="row users-list_row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={ photo } width="40px" className="img-circle" alt="profile" />
                        </div>
                        <div className="col-md-10">
                            <Link to={ '/user/' + login } className="users-list_user-name">
                                { name }
                            </Link>
                            <span className="users-list_user-role">{ role }</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 reports_duration">{ redmineDuration }</div>
                <div className="col-md-2 reports_duration">{ directDuration }</div>
                <div className="col-md-2 reports_duration">{ totalDuration }</div>
            </div>
        );
    }
}

function getProps(state) {
    return {
        users: state.users.list
    }
}

export default connect(getProps)(ReportTableRow);
