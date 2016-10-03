import React from 'react';
import { Link } from 'react-router';
import { deleteUser } from '../../actions/users.js';
import store from '../../store.js';
import moment from 'moment';

var ActionButtons = React.createClass({
	handleRemove: function() {
		store.dispatch({ type: "MODAL_DELETE_SHOW", login: this.props.login });
	},

	render: function() {
		return (
			<div className="btn-group" role="group">
				<Link  to={ '/user/edit/' + this.props.login } className="btn btn-warning">Edit</Link>
				<button className="btn btn-danger" onClick={ this.handleRemove }>Remove</button>
			</div>
		)
	}
});

var UserRow = React.createClass({

	render: function() {
		var buttons = "";

		if(this.props.currentUser.role == "admin" || this.props.currentUser.login == this.props.user.login) {
			buttons = <ActionButtons login={ this.props.user.login } />
		}

		return (
			<tr>
				<td><Link  to={ '/user/' + this.props.user.login }>{ this.props.user.login }</Link></td>
				<td>{ this.props.user.position }</td>
				<td>{ moment(this.props.user.joinedon).format("DD.MM.YYYY") }</td>
				<td>{ this.props.user.role }</td>
				<td>
					{ buttons }
				</td>
			</tr>
		)
	}
})

export default UserRow
