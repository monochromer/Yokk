import React from 'react';
import { connect } from 'react-redux';
import getParameter from 'get-parameter';
import { Input, Checkbox } from '../UI.jsx';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { login, setCurrentUser } from '../../actions/currentUser';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: getParameter('teamName') ? false : true,
      teamName: getParameter('teamName'),
      teamId: getParameter('teamId'),
      email: getParameter('email'),
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
      error: false
    })
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.login(this.state).then((res) => {
      const token = res.data.jwtToken;
      localStorage.setItem('jwtToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.props.setCurrentUser(jwt.decode(token));
      this.context.router.push('/');
    }, (err) => this.setState({error: true}));
  }

  render() {
    const loginError = this.state.error ? "Check your login" : null;
    const passwordError = this.state.error ? "Check your password" : null;

    const auth = (
      <div className="container container__fixed">
        <div className="row center-md">
          <div className="col-md-5">
            <form className="form-signin" onSubmit={this.handleSubmit}>
              <h2 className="heading">Sign In</h2>
              <Input handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  label="Username"
                  error={loginError}
                  required="true"
                  name="username"/>

              <Input handleChange={this.handleChange}
                  type="password"
                  error={passwordError}
                  className="input-group input-group__grey"
                  label="Password"
                  required="true"
                  name="password"/>

              <Checkbox label="Remember me?" name="rememberme"/>

              <button className="btn btn__lg btn__blue" type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    );

    const reg = (
      <div className="container container__fixed">
        <div className="row center-md">
          <div className="col-md-5">
            <form className="form-signup" onSubmit={this.handleSubmit}>
              <h2 className="form-signin-heading">Signing Up to { this.state.teamName } </h2>
              <input type="hidden" name="email" defaultValue={ this.state.email }/>
              <input type="hidden" name="teamId" defaultValue={ this.state.teamId }/>

              <Input handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  label="Login"
                  required="true"
                  name="login"/>
              <Input handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  type="password"
                  label="Password"
                  required="true"
                  name="password"/>

              <Input handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  type="password"
                  label="Repeat Password"
                  required="true"
                  name="password-repeat"/>

              <button className="btn btn__lg btn__blue signup_btn" type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <div>{ this.state.auth ? auth : reg }</div>
    )
  }
}

LoginForm.propTypes = {
	login: React.PropTypes.func.isRequired,
	setCurrentUser: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(null, { login, setCurrentUser })(LoginForm);
