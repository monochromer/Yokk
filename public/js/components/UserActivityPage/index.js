import React from 'react';
import UserActivityTable from './UserActivityTable.jsx';
import { connect } from 'react-redux';
import { findUserByLogin } from '../../helpers.js';
import DRPicker from '../DateRangePicker';

class UserActivityPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHeading: "",
            photo: "",
            position: ""
        }
    }

    render() {
        const login = this.props.routeParams.login;

        function findUserActivity(login, usersActivities) {
          if (usersActivities) {
            return usersActivities[login];
          }
          return;
        }

        const userActivity = findUserActivity(login, this.props.usersActivities);

        let period, oldestLoadedRecorDate;
        if (userActivity) {
          period = {
            startDate: userActivity.startDate,
            endDate: userActivity.endDate
          };
          oldestLoadedRecorDate = userActivity.list[userActivity.list.length-1].dateCreated;
        }

        const user = findUserByLogin(this.props.users, login);

        if(user) {
            this.state.userHeading = user.fullname ? user.fullname : user.login;
            if (user.profileImg) {
                this.state.photo = user.profileImg.medium;
            }
            this.state.position = user.position ? user.position : "Here is user's an activity";
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-header">
                            <div className="jumbotron">
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src={ this.state.photo } width="200px" className="img-thumbnail"/>
                                    </div>
                                    <div className="col-md-8">
                                        <h2>
                                            { this.state.userHeading } <br />
                                            <small>  { this.state.position } </small>
                                        </h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DRPicker period={period} oldestLoadedRecorDate={oldestLoadedRecorDate} parentComponent="UserActivityPage" width = "100px" login={login} />
                <div className="row">
                    <div className="col-md-12">
                        <UserActivityTable login={this.props.routeParams.login} userActivity={userActivity} />
                    </div>
                </div>
            </div>
        );
    }
}

let getProps = function(state) {
    return {
        users: state.users,
        usersActivities: state.usersActivities
    };
};

export default connect(getProps)(UserActivityPage);
