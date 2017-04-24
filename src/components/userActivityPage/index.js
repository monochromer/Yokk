import React from 'react';
import UserActivityTable from './UserActivityTable.jsx';
import { connect } from 'react-redux';
import { findUserByLogin } from '../../helpers.js';
// import { Input } from '../UI.jsx'

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
        }

        const userActivity = findUserActivity(login, this.props.usersActivities);

        // let period, oldestLoadedRecorDate;

        // if (userActivity) {
            // period = {
                // startDate: userActivity.startDate,
                // endDate: userActivity.endDate
            // };
            // oldestLoadedRecorDate = userActivity.list[userActivity.list.length - 1].dateCreated;
        // }

        const user = findUserByLogin(this.props.users, login);

        if (user) {
            this.setState({userHeading: user.fullname ? user.fullname : user.login});
            if (user.profileImg) {
                this.setState({photo: user.profileImg.medium});
            }
            this.setState({position: user.position ? user.position : "Here is user's an activity"});
        }

        return (
            <div className="activity-page">
                <div className="activity-page__header">
                    <div className="container container__fixed">
                        <div className="row center-md vertical-center">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-4 flex vertical-center">
                                        <div className="profile-photo center-block">
                                            <img src={ this.state.photo } width="135px" className="img-circle" alt="profile" />
                                        </div>
                                    </div>
                                    <div className="col-md-8 text-left">
                                        <h2 className="heading heading__white">{ this.state.userHeading }</h2>
                                        <div className="activity-page__filter">
                                            {/*<div className="activity-page__choose">Choose period</div>*/}
                                            {/*<div className="row">*/}
                                                {/*<div className="col-md-4">*/}
                                                    {/*<Input className="input-group input-group__light-blue"*/}
                                                           {/*label="from"*/}
                                                           {/*name="from"/>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-md-4">*/}
                                                    {/*<Input className="input-group input-group__light-blue"*/}
                                                           {/*label="to"*/}
                                                           {/*name="to"/>*/}
                                                {/*</div>*/}
                                                {/*<div className="col-md-4"></div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <UserActivityTable login={ login } userActivity={userActivity}/>
                    </div>
                </div>
            </div>
        );
    }
}

let getProps = function(state) {
    return {
        users: state.users.list,
        usersActivities: state.usersActivities
    };
};

export default connect(getProps)(UserActivityPage);
