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

	getValidationState() {
		const length = this.state.password.length;
		if (length > 8) return 'success';
		else if (length > 4) return 'warning';
		else if (length > 0) return 'error';
	},

	handleLoginChange(e) {
		this.setState({ login: e.target.value });
	},

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	},

	handleRepeatPasswordChange(e) {
		this.setState({ repeatPassword: e.target.value });
	},

	handleSubmit(e) {
		console.log("submiting...");
		e.preventDefault();

		var userToAdd = {
            login: this.state.login,
            password: this.state.password
        };

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
							<FormGroup controlId="formLogin" >
								<ControlLabel>Login:</ControlLabel>
								<FormControl type="text" placeholder="Enter login" onChange={ this.handleLoginChange } />
							</FormGroup>
							<FormGroup controlId="formBPassword" validationState={ this.getValidationState() }>
								<ControlLabel>Password:</ControlLabel>
								<FormControl type="password" placeholder="Enter password" onChange={ this.handlePasswordChange } />
							</FormGroup>
							<FormGroup controlId="repeatPassword" validationState={ this.getValidationState() }>
								<ControlLabel>Repeat Password:</ControlLabel>
								<FormControl type="password" placeholder="Repeat password" onChange={ this.handlePasswordChange } />
							</FormGroup>
							<button type="submit" className="btn btn-default">Add User</button>
						</form>
					</div>
				</div>
			</div>
		);
	}

});

export default UserAdd;
