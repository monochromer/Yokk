import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getParameter from 'get-parameter';
import { Input } from '../UI.jsx';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { register, setCurrentUser } from '../../actions/currentUser';

class RegisterForm extends React.Component {
  
  state = {
    teamId: getParameter('teamId'),
    companyId: getParameter('companyId'),
    email: getParameter('email'),
    errors: {},
    firstName: "",
    lastName: "",
    password: "",
    passwordRepeat: ""
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      errors: {
        ...this.state.errors,
        [ev.target.name]: ""
      }
    });
  }

  checkForm = () => {
    const { firstName, lastName, password, passwordRepeat } = this.state;
    let errors = {};
    if(!firstName.length){
      errors.firstName = "Please enter First Name";
    }
    if(firstName.length > 50){
      errors.firstName = "First Name must be 50 characters or less";
    }
    if(!lastName.length){
      errors.lastName = "Please enter Last Name";
    }
    if(lastName.length > 50){
      errors.lastName = "Last Name must be 50 characters or less";
    }
    if(password.length < 8){
      errors.password = "Password must be at least 8 characters long";
    }
    if(password.length > 100){
      errors.password = "Password must be 100 characters or less";
    }
    if(password !== passwordRepeat){
      errors.passwordRepeat = "Passwords do not match!";
    }
    if(!isEmpty(errors)){
      this.setState({errors});
      return false;
    }
    return true;
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if(this.checkForm()){
      this.props.register(this.state).then((res) => {
        const token = res.data.jwtToken;
        localStorage.setItem('jwtToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.props.setCurrentUser(jwt.decode(token));
        this.context.router.push('/');
      }, (err) => this.setState({
        errors: {
          ...this.state.errors,
          form: err.response.data
        }
      }));
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login-form-container">
        <div className="container container__fixed">
          <div className="row center-md">
            <div className="col-md-5">
              <form className="form-signup" onSubmit={this.handleSubmit}>
                <h2 className="form-signin-heading">
                  Tell us about yourself
                </h2>
                <p>
                  To complete registration please fill out missing information
                </p>

                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  label="First name *"
                  required="true"
                  error={errors.firstName}
                  name="firstName"
                />
                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  label="Last name *"
                  required="true"
                  error={errors.lastName}
                  name="lastName"
                />
                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  type="password"
                  label="Password *"
                  required="true"
                  error={errors.password}
                  name="password"
                />
                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey"
                  type="password"
                  label="Repeat Password *"
                  required="true"
                  error={errors.passwordRepeat}
                  name="passwordRepeat"
                />
                {errors.form && <div style={{color: 'red'}}>{errors.form}</div>}
                <button className="btn btn__lg btn__blue signup_btn" type="submit">Join!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RegisterForm.propTypes = {
	register: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired
}

RegisterForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { register, setCurrentUser })(RegisterForm);
