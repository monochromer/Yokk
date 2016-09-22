import React from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

var Layout = React.createClass({
	render: function() {
		return (
			<div className="container" style={{ "width": "1000px"}}>
				<Navbar>
					<Navbar.Header>
					 	<Navbar.Brand>
					    	<Link to="/">Eye of providence</Link>
					  	</Navbar.Brand>
					</Navbar.Header>
					<ul className="nav navbar-nav">
					  	<li><Link to="/">Team</Link></li>
					  	<li><Link to="/addUser">Add User</Link></li>
					</ul>
				</Navbar>
				{ this.props.children }
			</div>		
		)
	}
});

export default Layout