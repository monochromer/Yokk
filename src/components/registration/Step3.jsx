import React from 'react'
import { connect } from 'react-redux'
import { step3 } from '../../actions/registration'
import { Input } from '../UI.jsx'

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
    let error = "";
    if(password.length < 8){
      error = "Password must be at least 8 characters long";
    }
    if(password.length > 100){
      error = "Password must be 100 characters or less";
    }
    if(error){
      this.setState({error});
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    let user = Object.assign({}, this.props.user, {password: this.state.password});
    event.preventDefault();
    if(this.checkForm()){
      this.props.step3(user, (err) => {
        if(err){
          this.setState({
            error: err
          });
        }
      });
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

function getProps(state) {
  return {
    user: state.registration
  }
}

export default connect(getProps, { step3 })(Step3)
