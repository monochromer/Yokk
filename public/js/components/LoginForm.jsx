import React from 'react'


var LoginForm = React.createClass({
  render: function() {
    return (
        <div className="row">
            <div className="small-3 small-centered columns">
                <form>
                    <div className="row column log-in-form">
                        <h4 className="text-center">Login</h4>
                        <label>Login
                            <input type="text" placeholder="somebody@example.com" />
                        </label>
                        <label>Password
                            <input type="text" placeholder="Password" />
                        </label>
                        <input id="remember-me" type="checkbox" />
                        <label htmlFor="remember-me">Remember me</label>
                        <button type="submit" name="adduser">Add user</button>
                        <p className="text-center"><a href="#">Forgot your password?</a></p>
                    </div>
                </form>

            </div>
        </div>
    );
  }
});

export default LoginForm;
