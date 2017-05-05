import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input } from '../UI.jsx';
import { sendResetPasswordLink } from '../../actions/currentUser';

class ForgotPasswordForm extends React.Component {

  state = {
    error: "",
    success: ""
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      errors: {}
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.sendResetPasswordLink(this.state).then(() => {
      this.setState({
        success: "Email sent. Please read and follow the instruction"
      });
    }, (err) => this.setState({
      error: err.responce.data
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
                  Forgot your password? Enter E-mail you used for registration
                  and we will send you instructions
                </p>
                <Input
                  handleChange={this.handleChange}
                  className="input-group input-group__grey input-group__focus"
                  label="E-mail address *"
                  error={error}
                  required="true"
                  name="email"/>
                {success && <div className="success_message">{success}</div>}

                <button className="btn btn__lg btn__blue" type="submit">
                  Send me e-mail
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ForgotPasswordForm.propTypes = {
	sendResetPasswordLink: PropTypes.func.isRequired,
}

ForgotPasswordForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { sendResetPasswordLink })(ForgotPasswordForm);
