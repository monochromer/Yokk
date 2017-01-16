import React from 'react'
import store from '../../../store'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {step3} from '../../../actions/companies'
// import {step3} from '../../../actions/teams'
import {addUser} from '../../../actions/users'
import {getFromStateOrLocalStorage} from '../../../helpers'
import {Input} from '../../UI.jsx'

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }

  handleChange(event) {
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    let user = Object.assign({}, this.props.user, {password: this.state.password});
    event.preventDefault();
    store.dispatch(addUser(user));
    store.dispatch(step3(this.state.password));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="container">
          <div className="row center-xs step__heading">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <h1 className="heading">Set your password</h1>
            </div>
          </div>
          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>Password must be at least 7 characters long, and shouldn't be like 123456 or abcdef</p>
            </div>
          </div>
          <div className="row center-xs step__code">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <Input
                handleChange={this.handleChange.bind(this)}
                className="input-group input-group__grey"
                type="password"
                name="password"
                label="Password"/>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button
                className="btn btn__lg btn__blue team-create__create"
                disabled={this.state.password.length <= 6
                ? "disabled"
                : ""}>Continue to Company
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function getProps(state) {
  let login = getFromStateOrLocalStorage('login', state.teams);
  let email = getFromStateOrLocalStorage('email', state.teams);
  let _id = getFromStateOrLocalStorage('_id', state.teams);

  if (!login || !email || !_id) {
    browserHistory.push('/registration');
  }

  return {
    user: {
      login: login,
      email: email,
      team: _id
    }
  }
}

export default connect(getProps)(Step3)
