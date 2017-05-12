import React from 'react'
import { connect } from 'react-redux'
import { step3 } from '../../actions/registration'
import { Input, PasswordStrengthIndicator } from '../UI.jsx'

class Step3 extends React.Component {
  state = {
    password: "",
    error: ""
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
    if(password.length < 8){
      error = "The password is too weak. It must be at least 8 symbols long, include lowercase, capital letters and digits.";
    }
    if(password.length > 100){
      error = "Password must be 100 characters or less";
    }
    if(!passwordContainsDigits){
      error = "The password is too weak. It must be at least 8 symbols long, include lowercase, capital letters and digits.";
    }
    if(!passwordContainsLowercaseLatinLetter){
      error = "The password is too weak. It must be at least 8 symbols long, include lowercase, capital letters and digits.";
    }
    if(!passwordContainsUppercaseLatinLetter){
      error = "The password is too weak. It must be at least 8 symbols long, include lowercase, capital letters and digits.";
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
    }
  }

  render() {
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

export default connect(null, { step3 })(Step3)
