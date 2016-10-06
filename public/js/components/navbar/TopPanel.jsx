import React from 'react'
import Logout from './Logout.jsx'
import { Link } from 'react-router'
import { connect } from 'react-redux'

var TopPanel = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">Eye of providence</Link>
					</div>
					<ul className="nav navbar-nav">
						<li><Link to="/">Tracking</Link></li>
					  	<li><Link to="/users">Team</Link></li>
					  	{
					  		this.props.role == "admin" ? <li><Link to="/addUser">Add User</Link></li> : ""
					  	}
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li><Logout /></li>
					</ul>
				</div>
			</nav>
		)
	}
});

var getProps = function(store) {
	return {
		login: store.currentUser.login,
		role: store.currentUser.role
	}
}

export default connect(getProps)(TopPanel);
