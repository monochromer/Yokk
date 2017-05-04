import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'
import { connect } from 'react-redux'
import { checkConfirmationCode } from '../../actions/registration'

class Step1 extends React.Component {

  state = {
    code: '',
    error: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.checkConfirmationCode(this.state.code, this.props.email, (err) => {
      this.setState({
        error: err || ''
      });
    });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { code, error } = this.state;

    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row center-xs step__heading">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <h1 className="heading">Check your e-mail</h1>
            </div>
          </div>

          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>
                We’ve sent a six-digits confirmation code to&nbsp;<b>{this.props.email}</b>. Enter it to verify your e-mail address.
              </p>
            </div>
          </div>

          <div className="row center-xs step__code">

            <div className="col-md-6 col-sm-12 col-xs-12">
              <input
                className="step1__confirmation-input text-center"
                onChange={handleChange}
                value={code}
                name="code"
                type="text"
                maxLength="6"
              />
              {error && <div style={{color: 'red'}}>{error}</div>}
            </div>

          </div>

          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button
                type="submit"
                className="btn btn__lg btn__blue team-create__create"
                disabled={code.length !== 6 ? "disabled" : ""}>
                Confirm and continue
              </button>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

Step1.propTypes = {
  email: PropTypes.string.isRequired,
  checkConfirmationCode: PropTypes.func.isRequired
}

function getProps(state) {
  return {
    email: state.registration.email
  }
}

export default connect(getProps, { checkConfirmationCode })(Step1)
