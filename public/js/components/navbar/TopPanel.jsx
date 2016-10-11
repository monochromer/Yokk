import React from 'react'
import Logout from './Logout.jsx'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'

var TopPanel = React.createClass({
	render: function() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<Link className="navbar-brand" to="/">Eye of providence</Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<LinkContainer to="/tracking/">
						<NavItem eventKey={1}>Tracking</NavItem>
					</LinkContainer>
					<LinkContainer to="/users/">
						<NavItem eventKey={2}>Team</NavItem>
					</LinkContainer>
					<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Your Profile</MenuItem>
						<MenuItem eventKey={3.2}>Logout</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
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
