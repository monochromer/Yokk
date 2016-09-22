import React from 'react';
import _ from 'loDash';
import store from '../store.js';
import { connect } from 'react-redux';

var UserPage = React.createClass({
	
	getInitialState: function() {
		return {
			user: _.find(this.props.users, (o) => o.login == this.props.routeParams.login)
		}	
	},

	componentWillReceiveProps: function(nextProps) {
		var user = _.find(nextProps.users, (o) => o.login == this.props.routeParams.login);
		this.setState({
			user: user
		})
	},

	render: function() {
		if(this.state.user == undefined) {
			return ( <p> Wait a moment please...</p> );
		} else {
			return (
			    <div className="container">
			        <div className="large-3.columns">
			            <div id="photo">Photo</div>
			            <div id="efficiency">Efficiency</div>
			        </div>
			        <div className="large-9.columns">
			            <div id="general">
			                <div id="full_name" className="general">{this.state.user.login}</div>
			                <div id="phone_num" className="general"></div>
			                <div id="work_hours" className="general"></div>
			                <div id="email" className="general"></div>
			                <div id="skype" className="general"></div>
			            </div>
			            <div id="personal">
			                <div id="birthday" className="personal"></div>
			                <div id="twitter" className="personal"></div>
			                <div id="linkedin" className="personal"></div>
			                <div id="vk" className="personal"></div>
			                <div id="facebook" className="personal"></div>
			            </div>
			            <div id="about_container">
			                <div id="about" className="about"></div>
			                <div id="cv" className="about"></div>
			            </div>
			        </div>
			    </div>
			);
		}
	}
});

var fetchUserStateToProps = function f(state) {
	return {
		users: state.users
	}
}

export default connect(fetchUserStateToProps)(UserPage);