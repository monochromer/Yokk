import React from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

var AddUser = React.createClass({
	getInitialState() {
		return {
				value: ''
		};
	},

	getValidationState() {
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	},

	handleChange(e) {
		this.setState({ value: e.target.value });
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
						<form>
							<FormGroup controlId="formLogin" validationState={ this.getValidationState() }>
								<ControlLabel>Login:</ControlLabel>
								<FormControl type="text" placeholder="Enter text" onChange={this.handleChange} />
							</FormGroup>
							<FormGroup controlId="formBPassword" validationState={ this.getValidationState() }>
								<ControlLabel>Password:</ControlLabel>
								<FormControl type="password" placeholder="Enter password" onChange={this.handleChange} />
							</FormGroup>
							<FormGroup controlId="repeatPassword" validationState={ this.getValidationState() }>
								<ControlLabel>Repeat Password:</ControlLabel>
								<FormControl type="password" placeholder="Repeat password" onChange={this.handleChange} />
							</FormGroup>
							<Button bsStyle="success">Add User</Button>
						</form>
					</div>
				</div>
			</div>	
		);
	}

});

export default AddUser;