import React from 'react'
import store from '../../../store'
import { step2 } from '../../../actions/registration'
import { Input } from '../../UI.jsx'
import { isEmpty } from 'lodash';

class Step2 extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    errors: {}
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {
        ...this.state.errors,
        [event.target.name]: null
      }
    });
  }

  checkForm = () => {
    const { firstName, lastName } = this.state;
    const errors = {};
    if(!firstName.length){
      errors.firstName = "Please enter First Name";
    }
    if(!lastName.length){
      errors.lastName = "Please enter Last Name";
    }
    if(firstName.length > 50){
      errors.firstName = "First Name must be 50 characters or less";
    }
    if(lastName.length > 50){
      errors.lastName = "Last Name must be 50 characters or less";
    }
    if(!isEmpty(errors)){
      this.setState({errors});
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.checkForm()){
      const { firstName, lastName } = this.state;
      store.dispatch(step2(firstName, lastName));
    }
  }

  render(){
    const { errors } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <div className="container">
          <div className="row center-xs step__heading">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <h1 className="heading">What is your name?</h1>
            </div>
          </div>
          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>How should we address you?</p>
            </div>
          </div>
          <div className="row center-xs step__code">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <Input
                handleChange={ this.handleChange }
                className="input-group input-group__grey"
                name="firstName"
                label="First name"
                error={errors.firstName}
              />
              <Input
                handleChange={ this.handleChange }
                className="input-group input-group__grey"
                name="lastName"
                label="Last name"
                error={errors.lastName}
              />
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button
                type="submit"
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

export default Step2
