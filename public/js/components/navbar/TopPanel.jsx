import React from 'react'
import { Link } from 'react-router'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { findUserByLogin } from '../../helpers'

var TopPanel = React.createClass({
	render: function() {
		return (
			<Navbar fluid>
				<Navbar.Header>
					<Navbar.Brand>
						<Link className="navbar-brand" to="/">Eye of providence</Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<IndexLinkContainer to="/">
						<NavItem eventKey={1}>Tracking</NavItem>
					</IndexLinkContainer>
					<LinkContainer to="/users">
						<NavItem eventKey={2}>Team</NavItem>
					</LinkContainer>
					<LinkContainer to="/ReportsPage">
						<NavItem eventKey={3}>Reports</NavItem>
					</LinkContainer>
				</Nav>
				<Nav pullRight>
					<NavDropdown eventKey={4} title={ this.props.login } id="basic-nav-dropdown" >
						<LinkContainer to={ "/user/edit/" + this.props.login }>
							<MenuItem eventKey={4.1}>Your Profile</MenuItem>
						</LinkContainer>
						<MenuItem href="/logout" eventKey={4.2}>Logout</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
		)
	}
});

var getProps = function(store) {
	return {
		login: store.currentUser.login
	}
};

export default connect(getProps)(TopPanel);
