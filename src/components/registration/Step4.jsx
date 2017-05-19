import React from 'react'
import PropTypes from 'prop-types';
import { step4 } from '../../actions/registration'
import { Input } from '../UI.jsx'
import { isValidName } from '../../helpers';

class Step4 extends React.Component {

  state = {
    companyName: localStorage.reg_companyName || '',
    error: ""
  }

  componentWillMount(){
    if(
      !localStorage.reg_email ||
      !localStorage.reg_code ||
      !localStorage.reg_firstName ||
      !localStorage.reg_lastName ||
      !localStorage.reg_password
    ){
      this.props.router.push('/registration');
    }
  }

  handleChange = (event) => {
    this.setState({
      companyName: event.target.value
    })
  }

  checkForm = () => {
    const { companyName } = this.state;
    let error = "";
    if(!companyName.length){
      error = "Please enter Company Name";
    }
    if(!isValidName(companyName)){
      error = "Invalid Company Name";
    }
    if(companyName.length > 50){
      error = "Company Name must be 50 characters or less";
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
      step4(this.state.companyName);
      this.props.router.push('/registration/step5');
    }
  }

  render() {
    const { companyName } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <div className="container">
          <div className="row center-xs step__heading">
            <div className="col-md-12 col-sm-12 col-xs-10">
              <h1 className="heading">Your company name</h1>
            </div>
          </div>
          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>Choose your company name. It can be changed later<br/>
                it you decide you don't like anymore.</p>
            </div>
          </div>
          <div className="row center-xs step__code">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <Input className="input-group input-group__grey"
                  type="text"
                  handleChange={ this.handleChange }
                  name="name"
                  error={this.state.error}
                  defaultValue={companyName}
                  label="Company name"/>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button
                className="btn btn__blue btn__lg team-create__create"
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

Step4.contextTypes = {
	router: PropTypes.object.isRequired
}

export default Step4;
