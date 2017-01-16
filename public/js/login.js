import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import getParameter from 'get-parameter';
import {Input, Checkbox} from './components/UI.jsx'
import request from 'superagent'

class LoginForm extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    auth: getParameter('teamName') ? false : true,
    teamId: getParameter('teamId'),
    email: getParameter('email'),
    teamName: getParameter('teamName'),
    error: false
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
      error: false
    })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const urlToPost = this.state.auth ? '/login' : '/register'
    request.post(urlToPost, this.state).end((err, response) => {
      if (response.status != 200) {
        this.setState({error: true})
      } else {
        window.location = "/";
      }
    })
  }

  render() {
    const {handleChange} = this

    const loginError = this.state.error
      ? "Check your login"
      : null

    const passwordError = this.state.error
      ? "Check your password"
      : null

    const auth = (
      <div className="container container__fixed">
        <div className="row center-md">
          <div className="col-md-5">
            <form className="form-signin" onSubmit={this.handleSubmit}>
              <h2 className="heading">Sign In</h2>
              <Input
                handleChange={handleChange}
                className="input-group input-group__grey"
                label="Username"
                error={loginError}
                required="true"
                name="username"/>

              <Input
                handleChange={handleChange}
                type="password"
                error={passwordError}
                className="input-group input-group__grey"
                label="Password"
                required="true"
                name="password"/>

              <Checkbox label="Remember me?" name="rememberme"/>

              <button className="btn btn__lg btn__blue" type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    );

    const reg = (
      <div className="container container__fixed">
        <div className="row center-md">
          <div className="col-md-5">
            <form className="form-signup" onSubmit={this.handleSubmit}>
              <h2 className="form-signin-heading">Signing Up to {this.state.teamName}
              </h2>
              <input type="hidden" name="email" defaultValue={this.state.email}/>
              <input type="hidden" name="teamId" defaultValue={this.state.teamId}/>

              <Input
                handleChange={handleChange}
                className="input-group input-group__grey"
                label="Login"
                required="true"
                name="login"/>
              <Input
                handleChange={handleChange}
                className="input-group input-group__grey"
                type="password"
                label="Password"
                required="true"
                name="password"/>

              <Input
                handleChange={handleChange}
                className="input-group input-group__grey"
                type="password"
                label="Repeat Password"
                required="true"
                name="password-repeat"/>

              <button className="btn btn__lg btn__blue signup_btn" type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <div>{this.state.auth
          ? auth
          : reg}</div>
    )
  }
}

ReactDOM.render(
  <LoginForm/>, document.getElementById("content"))
