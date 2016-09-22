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
					<Nav>
					  	<NavItem><Link to="/">Team</Link></NavItem>
					  	<NavItem><Link to="/addUser">Add User</Link></NavItem>
						<NavItem><Link to="/tests">Tests</Link></NavItem>
					</Nav>
				</Navbar>
				{ this.props.children }
			</div>
		)
	}
});

export default Layout
