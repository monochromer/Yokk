import React from 'react';
import _ from 'loDash';
import store from '../store.js';
import { connect } from 'react-redux';
import { findUserByLogin } from '../helpers.js'
import { Link } from 'react-router'

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
			    <div className="container-fluid">
			        <div className="row">
			        	<div className="col-md-3 text-center center-block">
		        			<img src="https://randomuser.me/api/portraits/men/85.jpg" className="img-circle text-center center-block photo__img" />
		        			  <div className="form-group">
							    <label htmlFor="upload-photo">Change Photo</label>
							    <input type="file" id="upload-photo" style={{ "display": "inline", "width": "100%" }}/>
							  </div>
		        		</div>
			        	<div className="col-md-9 profile">
							<h2>{ this.state.user.login } <Link  to={ '/user/edit/' + this.state.user.login } className="btn btn-sm btn-warning">Edit</Link></h2>
							<div className="row">
								<div className="col-md-12">
									<h2>General</h2>
								</div>	
							</div>
							<div className="row">
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>Fullname</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.fullname }</span>
									</div>	
								</div>
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>Email</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.email }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>Phone Number</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.phone }</span>
									</div>	
								</div>
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>Skype</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.skype }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>Work Hourse GMT+3</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.workhours }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<h2>Personal</h2>
								</div>
							</div>	
							<div className="row">
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>Day of birth</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.birthday }</span>
									</div>	
								</div>
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>VK</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.vk }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 profile__fields">
									<div className="profile__field-name">
										<span>Twitter</span>
									</div>
									<div className="profile__field-value">
										<span>{ this.state.user.twitter }</span>
									</div>	
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 profile__fields">
									<h2>About me</h2>
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