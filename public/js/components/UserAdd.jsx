import React from 'react';
import store from '../store.js';
import _ from 'lodash';
import {connect} from 'react-redux';
import {addUser} from '../actions/users.js';

var UserAdd = React.createClass({

    getInitialState: function() {
        return {login: '', password: '', repeatPassword: ''};
    },

    validation: function(user) {

        if (_.find(this.props.users, (o) => o.login == user.login) != undefined) {
            var text = "Login " + user.login + " is already used! Try another login."
            store.dispatch({type: "ALERT_SHOW", class: "danger", text: text});
            return false;
        }

        if (user.password <= 5) {
            var text = "Password requires more then 5 symbols!";
            store.dispatch({type: "ALERT_SHOW", class: "danger", text: text});
            return false;
        }

        if (user.password != user.repeatPassword) {
            var text = "Password and Repeat Password don't match!";
            store.dispatch({type: "ALERT_SHOW", class: "danger", text: text});
            return false;
        }

        return true;
    },

    handleSubmit: function(event) {
        event.preventDefault();

        var user = {
            login: this.refs.login.value,
            password: this.refs.password.value,
            repeatPassword: this.refs.repeatPassword.value
        };

        if (this.validation(user)) {
            store.dispatch(addUser(user));
        }
    },

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h2>Add User</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="login">Login</label>
                                <input type="text" className="form-control" id="login" ref="login" placeholder="username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" ref="password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="repeatPassword">Repeat password</label>
                                <input type="password" className="form-control" id="repeatPassword" ref="repeatPassword"/>
                            </div>
                            <button type="submit" className="btn btn-default">Add User</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

});

var getProps = function(store) {
    return {users: store.users}
}

export default connect(getProps)(UserAdd);
