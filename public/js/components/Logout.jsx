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
		login: store.currentUser.login
	}
}

export default connect(getProps)(Logout);
