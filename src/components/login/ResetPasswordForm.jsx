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
    password: ""
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      error: ""
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
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
                  error={error}
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
