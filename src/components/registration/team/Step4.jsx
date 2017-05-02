import React from 'react'
import { step4 } from '../../../actions/registration'
// import { step4 } from '../../../actions/teams'
import { connect } from 'react-redux'
import { Input } from '../../UI.jsx'

class Step4 extends React.Component {

  state = {
    companyName: ""
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
      this.props.step4(this.state.companyName, this.props.email);
    }
  }

  render() {
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

function getProps(state) {
  return {
    email: state.registration.email
  }
}

export default connect(getProps, { step4 })(Step4)
