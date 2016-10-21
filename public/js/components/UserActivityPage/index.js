import React from 'react';
import UserActivityTable from './UserActivityTable.jsx';
import { connect } from 'react-redux';
import { findUserByLogin } from '../../helpers.js'

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
        var user = findUserByLogin(this.props.users, this.props.routeParams.login);

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
                <div className="row">
                    <div className="col-md-12">
                        <UserActivityTable login={this.props.routeParams.login}/>
                    </div>
                </div>
            </div>
        );
    }
}

let getProps = function(state) {
    return {
        users: state.users
    };
};

export default connect(getProps)(UserActivityPage);
