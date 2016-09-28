import React from 'react'
import store from '../store.js'
import { connect } from 'react-redux'

var Logout = React.createClass({
	render: function() {
    	return <a href="/logout">Logout ({ this.props.login }) </a>
  	}
});

var getProps = function(store) {
	return {
		login: store.currentUser.login,
		role: store.currentUser.role
	}
}

export default connect(getProps)(Logout);
