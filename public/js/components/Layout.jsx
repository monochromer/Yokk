import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import store from '../store.js';
import { fetchUsers, checkPermissions } from '../actions/crudUser';
import Alert from './Alert.jsx';
import ModalUserDelete from './ModalUserDelete.jsx';
import TopPanel from './TopPanel.jsx';

var Layout = React.createClass({

    componentWillMount: function() {
        store.dispatch(fetchUsers());
        store.dispatch(checkPermissions());
    },

	render: function() {
		return (
			<div>
				<TopPanel />
				<div className="container-fluid">
					<Alert />
					<ModalUserDelete />
					{ this.props.children }
				</div>
			</div>
		)
	}
});

export default Layout
