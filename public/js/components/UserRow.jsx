import React from 'react';
import { Link } from 'react-router';
import { deleteUser } from '../actions/crudUser.js';
import store from '../store.js';
import moment from 'moment';

var ActionButtons = React.createClass({
	handleRemove: function() {
		store.dispatch({ type: "MODAL_DELETE_SHOW", login: this.props.name });
	},

	render: function() {
		return (
			<div className="btn-group" role="group">
				<Link  to={ '/user/edit/' + this.props.name } className="btn btn-warning">Edit</Link>
				<button className="btn btn-danger" onClick={ this.handleRemove }>Remove</button>
			</div>	
		)
	}
});

var UserRow = React.createClass({

	render: function() {
		var buttons = ""; 

		if(this.props.currentUser.role == "admin" || this.props.currentUser.login == this.props.name) {
			buttons = <ActionButtons name={ this.props.name } />	
		}

		return (
			<tr>
				<td><Link  to={ '/user/' + this.props.name }>{ this.props.name }</Link></td>
				<td>{ this.props.position }</td>
				<td>{ moment(this.props.joinedon).format("DD.MM.YYYY") }</td>
				<td>
					{ buttons }	
				</td>
			</tr>	
		)
	}
})

export default UserRow