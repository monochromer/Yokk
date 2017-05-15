import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { step3 } from '../../actions/registration'
import { Input, PasswordStrengthIndicator } from '../UI.jsx'

class Step3 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      password: props.registration.password,
      error: ""
    }
  }

  componentWillMount(){
    const {
      email,
      code,
      firstName,
      lastName
    } = this.props.registration;
    if(
      !email ||
      !code ||
      !firstName ||
      !lastName
    ){
      this.props.router.push('/registration');
      return false;
    }
  }

  handleChange = (event) => {
    this.setState({
      password: event.target.value,
      error: ""
    })
  }

  checkForm = () => {
    const { password } = this.state;
    const passwordContainsDigits = new RegExp( /\d/ ).test( password );
    const passwordContainsLowercaseLatinLetter = new RegExp( /[a-z]/ ).test( password );
    const passwordContainsUppercaseLatinLetter = new RegExp( /[A-Z]/ ).test( password );
    let error = "";
    const weakPassMsg = "The password is too weak. It must be at least 8 symbols long, include lowercase, capital letters and digits.";
    if(password.length < 8){
      error = weakPassMsg;
    }
    if(password.length > 100){
      error = "Password must be 100 characters or less";
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
    if(error){
      this.setState({error});
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.checkForm()){
      this.props.step3(this.state.password);
      this.props.router.push('/registration/step4');
    }
  }

  render() {
    const { password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row center-xs step__heading">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <h1 className="heading">Choose your password</h1>
            </div>
          </div>
          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>It must be at least 8 symbols long, include at least one upper
                and lower case letter and digit. The strongest passwords also
                include symbols. Avoid too simple passwords.</p>
            </div>
          </div>
          <div className="row center-xs step__code">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <Input
                handleChange={this.handleChange}
                className="input-group input-group__grey"
                type="password"
                name="password"
                label="Password"
                error={this.state.error}
                defaultValue={password}
              />
            </div>
          </div>
          <div className="row center-xs step__code">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <PasswordStrengthIndicator
                password={this.state.password}
              />
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button
                className="btn btn__lg btn__blue team-create__create"
              >
                Confirm and continue
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

Step3.propTypes = {
  registration: PropTypes.object.isRequired,
  step3: PropTypes.func.isRequired
}

Step3.contextTypes = {
	router: PropTypes.object.isRequired
}

function getProps(state) {
  return {
    registration: state.registration
  }
}

export default connect(getProps, { step3 })(Step3)
