import React, { Component, PropTypes } from 'react'
import store from '../../../store'
import _ from 'lodash'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {step1} from '../../../actions/companies'
// import {step1} from '../../../actions/teams'
import {getFromStateOrLocalStorage} from '../../../helpers'

class Step1 extends Component {

  state = {
    code: []
  }

  static propTypes = {
    email: PropTypes.string.isRequired
  }

  handleChange = event => {
    this.state.code[event.target.name] = event.target.value;
    this.setState({code: this.state.code});

    if (parseInt(event.target.name) < 5) {
      this.refs[parseInt(event.target.name) + 1].focus();
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    store.dispatch(step1(_.join(this.state.code, ""), this.props.email))
  }

  render() {
    const {handleSubmit, handleChange} = this
    const inputClass = "step1__confirmation-input text-center"

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
                We’ve sent a six-digit confirmation code to&nbsp;<b>{this.props.email}</b>. Enter it below to confirm your e-mail address.
              </p>
            </div>
          </div>

          <div className="row center-xs step__code">

            <div className="col-md-1 col-sm-2 col-xs-2">
              <input className={inputClass} ref="0" onChange={handleChange} name="0" type="text" maxLength="1"/>
            </div>
            <div className="col-md-1 col-sm-2 col-xs-2">
              <input className={inputClass} ref="1" onChange={handleChange} name="1" type="text" maxLength="1"/>
            </div>
            <div className="col-md-1 col-sm-2 col-xs-2">
              <input className={inputClass} ref="2" onChange={handleChange} name="2" type="text" maxLength="1"/>
            </div>
            <div className="col-md-1 col-sm-2 col-xs-2">
              <input className={inputClass} ref="3" onChange={handleChange} name="3" type="text" maxLength="1"/>
            </div>
            <div className="col-md-1 col-sm-2 col-xs-2">
              <input className={inputClass} ref="4" onChange={handleChange} name="4" type="text" maxLength="1"/>
            </div>
            <div className="col-md-1 col-sm-2 col-xs-2">
              <input className={inputClass} ref="5" onChange={handleChange} name="5" type="text" maxLength="1"/>
            </div>

          </div>

          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button
                type="submit"
                className="btn btn__lg btn__blue team-create__create"
                disabled={this.state.code.length != 6
                ? "disabled"
                : ""}>
                Continue to Name
              </button>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

// Step1.propTypes = {
//   email: React.PropTypes.string.isRequired
// }

function getProps(state) {
  let email = getFromStateOrLocalStorage('email', state.teams);

  if (!email) {
    browserHistory.push('/promo');
  }

  return {email: email}
}

export default connect(getProps)(Step1)
