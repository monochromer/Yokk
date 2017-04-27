import React from 'react'
import store from '../../store.js'
import { connect } from 'react-redux'

class Logout extends React.Component {
	render: function() {
    return <a href="/logout">Logout ({ this.props.login }) </a>
  }
}

var getProps = function(store) {
	return {
		login: store.currentUser.data.login,
		role: store.currentUser.data.role
	}
}

export default connect(getProps)(Logout);
