import React from 'react'
import validator from 'validator'
import classNames from 'classnames'
import { checkCompanyEmail } from '../../actions/registration'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'
import { Link } from 'react-router'


class PromoPage extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      rightPanelOpened: false,
      error: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (validator.isEmail(this.state.email)) {
      this.props.checkCompanyEmail(this.state.email, (err) => {
        this.setState({error: err || ""});
      });
    }
    else{
      this.setState({error: "Invalid e-mail"});
    }
  }

  handleClickCreate = () => {
    this.setState({
      rightPanelOpened: true
    })
  }

  handleChange = (event) => {
    this.setState({email: event.target.value});
  }

  render() {

    const signInClasses = classNames({
      'signin': true,
      hide: this.state.rightPanelOpened
    });

    const centerClasses = classNames({
      'row promo-heading_wrapper': true,
      'text-center': !this.state.rightPanelOpened
    });

    const rightPanelClasses = classNames({
      'right-panel': true,
      'right-panel___hidden': !this.state.rightPanelOpened
    });

    const createTeamButtonClasses = classNames({
      'btn btn__lg btn__blue': true,
      'hide': this.state.rightPanelOpened
    });

    const soshaceLinkClasses = classNames({
      'hide': this.state.rightPanelOpened
    });

    const inputClassNames = classNames({
      'input-group input-group__light-blue': true,
      'input-group__error': this.props.error
    });

    const { error } = this.state;

    const errorText = (error === 'This email address is already registered.') ?
      <div>
        This email address is already registered. You can{" "}
        <a href='/login'>log in</a>.
        If you forgot your password, you can{" "}
        <a href='/forgot_password'>reset it</a>.
      </div>
      : error;

    return (

      <div className="container-fluid main-container">

        <div className="container top">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-6 logo">Yokk!</div>
            <div className="col-md-offset-6 col-md-3 col-sm-6 col-xs-6 text-right">
              <Link to="/login" className={ signInClasses }>Sign In</Link>
            </div>
          </div>
        </div>

        <div className="container center">
          <div className={ centerClasses }>
            <div className="col-md-12">
              <h1 className="heading promo__heading">Yokk! <br /> helps you manage your team</h1>
              <button className={ createTeamButtonClasses } onClick={ this.handleClickCreate }>Register Company</button>
            </div>
          </div>
        </div>

        <div className="container promo-footer">
          <div className="span2">
            <a href="http://soshace.com" target="_blank" className={ soshaceLinkClasses }>
              <img src="/img/logo.png" alt="soshace" title="soshace" height="36px"/>
            </a>
          </div>
        </div>

        <div className={ rightPanelClasses }>

          <header>
            <div className="row">
              <div className="col-md-10 text-right">
                <a href="/login" className="signin right-panel_signin">Sign In</a>
              </div>
            </div>
          </header>

          <section>
            <form onSubmit={ this.handleSubmit }>
              <div className="row center-md">
                <div className="col-md-8">
                  <Input handleChange={ this.handleChange }
                      className={ inputClassNames }
                      name="email"
                      label="E-mail address"
                      error={ errorText }
                  />
                  <button type="submit" className="btn btn__lg btn__white right-panel_btn">Register Company</button>
                </div>
              </div>
              <div className="row center-md right-panel_login">
                <div className="col-md-8">
                  <p>
                    Already registered? &nbsp;
                    <a href="/login">Sign In</a>
                  </p>
                </div>
              </div>
            </form>
          </section>

          <footer>
            <div className="row center-md">
              <a href="http://soshace.com" target="_blank">
                <img src="/img/logo.png" alt="soshace" title="soshace" height="36px"/>
              </a>
            </div>
          </footer>

        </div>

      </div>
    )
  }
}

export default connect(null, { checkCompanyEmail })(PromoPage)