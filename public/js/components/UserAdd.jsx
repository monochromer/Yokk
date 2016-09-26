import React from 'react';
import store from '../store.js';
import { addUser } from '../actions/crudUser.js';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

var UserAdd = React.createClass({

	getInitialState() {
		return {
			login: '',
			password: '',
			repeatPassword: ''
		};
	},

	handleSubmit(event) {
		event.preventDefault();

		var userToAdd = {
            login: this.refs.login.value,
            password: this.refs.password.value
        };

        console.log(userToAdd);
        store.dispatch(addUser(userToAdd));
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
						<form onSubmit={ this.handleSubmit }>
							<div className="form-group">
    							<label htmlFor="login">Login</label>
    							<input type="text" className="form-control" id="login" ref="login" placeholder="username" />
  							</div>
  							<div className="form-group">
    							<label htmlFor="password">Password</label>
    							<input type="password" className="form-control" id="password" ref="password" />
  							</div>
  							<div className="form-group">
    							<label htmlFor="repeatPassword">Repeat password</label>
    							<input type="password" className="form-control" id="repeatPassword" ref="repeatPassword" />
  							</div>
							<button type="submit" className="btn btn-default">Add User</button>
						</form>
					</div>
				</div>
			</div>
		);
	}

});

export default UserAdd;
