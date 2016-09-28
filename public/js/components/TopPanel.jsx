import React from 'react'
import Logout from './Logout.jsx'
import { Link } from 'react-router'

var TopPanel = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" to="/">Eye of providence</Link>
					</div>
					<ul className="nav navbar-nav">
					  	<li><Link to="/">Team</Link></li>
					  	<li><Link to="/addUser">Add User</Link></li>
					  	<li><Link to="/tests">tests</Link></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li><Logout /></li>
					</ul>
				</div>
			</nav>
		)	
	}
});

export default TopPanel;