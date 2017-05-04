import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Checkbox } from '../UI.jsx';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { login, setCurrentUser } from '../../actions/currentUser';

class LoginForm extends React.Component {

  state = {
    errors: {},
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      errors: {}
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.login(this.state).then((res) => {
      const token = res.data.jwtToken;
      localStorage.setItem('jwtToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.props.setCurrentUser(jwt.decode(token));
      this.context.router.push('/');
    }, (err) => this.setState({
      errors: {
        email: "Check you Email",
        password: "Check your password"
      }
    }));
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="login-form-container">
        <div className="container container__fixed">
          <div className="row center-md">
            <div className="col-md-5">
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <h2 className="heading">Welcome back!</h2>
                <p>Please sign in to access your team</p>
                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey input-group__focus"
                  label="E-mail"
                  error={errors.email}
                  required="true"
                  name="email"/>

                <Input
                  handleChange={this.handleChange}
                  type="password"
                  error={errors.password}
                  className="input-group input-group__grey input-group__focus"
                  label="Password"
                  required="true"
                  name="password"/>

                <Checkbox label="Remember me" name="rememberme"/>

                <button className="btn btn__lg btn__blue" type="submit">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { login, setCurrentUser })(LoginForm);
