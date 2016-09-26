import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import store from '../store.js';
import { fetchUsers } from '../actions/crudUser';
import Alert from './Alert.jsx'

var Layout = React.createClass({

    componentWillMount: function() {
        store.dispatch(fetchUsers());
    },

	render: function() {
		return (
			<div>
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
					</div>
				</nav>
				<div className="container-fluid">
					<Alert />
					{ this.props.children }
				</div>
			</div>    
		)
	}
});

export default Layout
