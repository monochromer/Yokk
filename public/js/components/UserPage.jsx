import React from 'react';
import _ from 'loDash';
import store from '../store.js';
import { connect } from 'react-redux';
import { findUserByLogin } from '../helpers.js'

var UserPage = React.createClass({
	
	getInitialState: function() {
		return {
			user: findUserByLogin(this.props.users, this.props.routeParams.login)
		}	
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			user: findUserByLogin(nextProps.users, this.props.routeParams.login)
		})
	},

	render: function() {
		if(this.state.user == undefined) {
			return ( <p> Wait a moment please...</p> );
		} else {
			return (
			    <div className="container">
			        <div className="row">
			        	<div className="col-md-2">
			        		<span> Efficiency 4.0 </span>
			        	</div>
			        	<div className="col-md-10 profile">
							<h2>{ this.state.user.login }</h2>
							<div className="row">
								<div className="col-md-10">
									<h5>General</h5>
								</div>	
							</div>
							<div className="row">
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Fullname</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.fullname }</span>
									</div>	
								</div>
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Email</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.email }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Phone Number</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.phone }</span>
									</div>	
								</div>
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Skype</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.skype }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Work Hourse GMT+3</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.workhours }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-10">
									<h5>General</h5>
								</div>
							</div>	
							<div className="row">
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Day of birth</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.birthday }</span>
									</div>	
								</div>
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>VK</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.vk }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Twitter</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.twitter }</span>
									</div>	
								</div>
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Facebook</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.facebook }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-5">
									<div className="profile__field-name">
										<span>Linked In</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.linkedin }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-10">
									<h5>About me</h5>
									<p>{ this.state.user.aboutme }</p>
								</div>
							</div>		
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