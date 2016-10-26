import React from 'react';
import ReactDOM from 'react-dom';

var LoginForm = React.createClass({
	getInitialState: function() {
		return {
			auth: true
		}
	},

	changeForm: function() {
		this.setState({
			auth: this.state.auth ? false : true
		})
	},

	render: function() {
		const auth = (
			<div className="container">
				<form className="form-signin" method="POST" action="/login">
        			<h2 className="form-signin-heading">Please sign in</h2>
        			<input type="text" className="form-control" placeholder="Username" required="true" name="username" />
        			<input type="password" className="form-control" placeholder="Password" required="true" name="password"/>
        			<div className="checkbox">
	          			<label>
	            			<input type="checkbox" value="remember-me"/> Remember me
	          			</label>
        			</div>
        			<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
					<span className="changeFormLink" onClick={ this.changeForm }> Don't have an account? <a href="#">Sign Up</a></span>
      			</form>
      		</div>
		);
		const reg = (
			<div className="container">
				<form className="form-signup" method="POST" action="/register">
        			<h2 className="form-signin-heading">Signing up</h2>
        			<input type="email" className="form-control" placeholder="Email" required="true" name="email" />
					<input type="text" className="form-control" placeholder="Login" required="true" name="login" />
        			<input type="password" className="form-control" placeholder="Password" required="true" name="password"/>
        			<button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
					<span className="changeFormLink" onClick={ this.changeForm }> Already there? <a href="#">Sign In</a></span>
      			</form>
      		</div>
		)
		return (
			<div>{ this.state.auth ? auth : reg }</div>
		)
	  }
});


ReactDOM.render(<LoginForm />, document.getElementById("content"));
