import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

var LoginForm = React.createClass({

	onChange: function (event) {
		event.preventDefault();
	},

	onSubmit: function(event) {
		event.preventDefault();
	},

	render: function() {
		return (
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
      			</form>
      		</div>
		) 
	  }
});


ReactDOM.render(<LoginForm />, document.getElementById("content"));
