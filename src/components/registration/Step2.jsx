import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { step2 } from '../../actions/registration'
import { Input } from '../UI.jsx'
import { isEmpty } from 'lodash';

class Step2 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      firstName: props.registration.firstName,
      lastName: props.registration.lastName,
      errors: {}
    }
  }

  componentWillMount(){
    const {
      email,
      code
    } = this.props.registration;
    if(
      !email ||
      !code
    ){
      this.props.router.push('/registration');
      return false;
    }
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
      this.props.step2(firstName, lastName);
      this.props.router.push('/registration/step3');
    }
  }

  render(){
    const { errors, firstName, lastName } = this.state;
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
                defaultValue={firstName}
              />
              <Input
                handleChange={ this.handleChange }
                className="input-group input-group__grey"
                name="lastName"
                label="Last name"
                error={errors.lastName}
                defaultValue={lastName}
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

Step2.propTypes = {
  registration: PropTypes.object.isRequired,
  step2: PropTypes.func.isRequired
}

Step2.contextTypes = {
	router: PropTypes.object.isRequired
}

function getProps(state) {
  return {
    registration: state.registration
  }
}

export default connect(getProps, { step2 })(Step2)
