import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getParameter from 'get-parameter';
import { Input } from '../UI.jsx';
import { resetPassword } from '../../actions/currentUser';

class ResetPasswordForm extends React.Component {

  state = {
    error: "",
    success: "",
    email: getParameter('email') || "",
    secret: getParameter('secret'),
    password: "",
    passwordRepeat: ""
  };

  checkForm = () => {
    const { password, passwordRepeat } = this.state;
    let error = "";
    const passwordContainsDigits = new RegExp( /\d/ ).test( password );
    const passwordContainsLowercaseLatinLetter = new RegExp( /[a-z]/ ).test( password );
    const passwordContainsUppercaseLatinLetter = new RegExp( /[A-Z]/ ).test( password );
    const weakPassMsg = "The password is too weak. It must be at least 8 symbols long, include lowercase, capital letters and digits.";
    if(password.length < 8){
      error = weakPassMsg;
    }
    if(!passwordContainsDigits){
      error = weakPassMsg;
    }
    if(!passwordContainsLowercaseLatinLetter){
      error = weakPassMsg;
    }
    if(!passwordContainsUppercaseLatinLetter){
      error = weakPassMsg;
    }
    if(password.length > 100){
      error = "Password must be 100 characters or less";
    }
    if(password !== passwordRepeat){
      error = "Passwords do not match!";
    }
    if(error){
      this.setState({error});
      return false;
    }
    return true;
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      error: ""
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    if(this.checkForm()){
      this.props.resetPassword(this.state).then(() => {
        this.setState({
          success: "Password successfully changed",
          error: ""
        });
        setTimeout(() => this.props.router.push('/login'), 3000);
      }, (err) => this.setState({
        error: err.response.data
      }));
    }
  }

  render() {

    const { error, success } = this.state;

    return (
      <div className="login-form-container">
        <div className="container container__fixed">
          <div className="row center-md">
            <div className="col-md-5">
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <h2 className="heading">Lost password</h2>
                <p>
                  Your password was reset. Choose new password. It must be at
                  least 8 symbols long
                </p>
                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey input-group__focus"
                  label="Password *"
                  type="password"
                  required="true"
                  name="password"/>
                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey input-group__focus"
                  label="Repeat password *"
                  required="true"
                  type="password"
                  name="passwordRepeat"/>
                {success && <div className="success_message">{success}</div>}
                {error && <div className="form-error">{error}</div>}
                <div className="checkbox-group"></div>
                <button className="btn btn__lg btn__blue" type="submit">
                  Confirm and continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ResetPasswordForm.propTypes = {
	resetPassword: PropTypes.func.isRequired,
}

ResetPasswordForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { resetPassword })(ResetPasswordForm);
