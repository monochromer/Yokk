import React from 'react'
import PropTypes from 'prop-types';
import getParameter from 'get-parameter';
import _ from 'lodash'
import moment from 'moment'
import { checkConfirmationCode, checkCompanyEmail } from '../../actions/registration'

class Step1 extends React.Component {

  state = {
    code: getParameter('code') || localStorage.reg_code,
    error: '',
    secondsPassed: 0
  }

  componentWillMount(){
    if(!localStorage.reg_email){
      this.props.router.push('/registration');
    }
  }

  componentDidMount(){
    if(getParameter('code')){
      this.checkCode();
    }
    else{
      this.secondInterval = setInterval(() => {
        this.setState({secondsPassed: this.state.secondsPassed + 1});
      }, 1000);
    }
  }

  componentWillUnmount(){
    clearInterval(this.secondInterval);
  }

  requestNewCode = () => {
    checkCompanyEmail(localStorage.reg_email, (err) => {
      this.setState({
        error: err || ""
      });
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.checkCode();
  }

  checkCode = () => {
    checkConfirmationCode(this.state.code, localStorage.reg_email, (err) => {
      if(err){
        this.setState({error: err});
      }
      else{
        this.setState({error: ""});
        this.props.router.push('/registration/step2');
      }
    });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { code, error } = this.state;
    const timerStart = localStorage.reg_timerStart || 0;
    const tenMins = 1000 * 60 * 10;
    const timeLeft = +timerStart + tenMins - Date.now();
    const timeLeftFormat = moment(timeLeft > 0 ? timeLeft : 0).format("mm:ss");
    let errorText;
    switch(error){
      case 'You entered an incorrect code 3 times':
        errorText = <div>
            You entered an incorrect code 3 times and now your current code is
            deactivated. Click{" "}
            <a href="#" onClick={this.requestNewCode}>here</a>{" "}
            to get a new confirmation code.
          </div>;
        break;
      case 'The code expired':
        errorText = <div>
            The code has expired. Click{" "}
            <a href="#" onClick={this.requestNewCode}>here</a>{" "}
            to resend the code.
          </div>
        break;
      default:
        errorText = error;
    }

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
                We’ve sent a six-digits confirmation code to&nbsp;<b>{localStorage.reg_email}</b>. Enter it to verify your e-mail address.
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
              {!getParameter('code') && <div>{timeLeftFormat}</div>}
              {errorText && <div className="form-error">{errorText}</div>}
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

Step1.contextTypes = {
	router: PropTypes.object.isRequired
}

export default Step1;
