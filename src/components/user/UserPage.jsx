import React from 'react';
import { connect } from 'react-redux';
import { findUserByLogin } from '../../helpers.js'
// import { Link } from 'react-router'


class UserPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: findUserByLogin(this.props.users, this.props.routeParams.login)
    };

    this.showField = this.showField.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: findUserByLogin(nextProps.users, this.props.routeParams.login)
    })
  }

  showField(field) {
    return field ? field : "–";
  }

  render() {
    if (this.state.user) {
      const { profileImg, login, redmineApiKey, fullname, position, phone, skype, workhours, email, birthday, vk, aboutme } = this.state.user;
      const photo = profileImg ? profileImg.medium : "";
      const redmine = redmineApiKey ? "/img/redmine-active.svg" : "/img/redmine-bw.svg";
      return (
        <div className="container container__fixed profile">
          <div className="row profile">

            <div className="col-md-3 profile_photo">
              <div className="profile_dropzone profile_dropzone__view">
                <img src={ photo } height="205px" className="img-circle" alt="profile" />
              </div>
            </div>

            <div className="col-md-9 prodile_inputs">
              <div className="row middle-md">
                <div className="col-md-6">
                  <h2 className="heading profile_login">{ login }</h2>
                </div>
                <div className="col-md-6 text-right">
                  <img src={ redmine  } alt="Link with redmine"/>
                </div>
              </div>
              <div className="row profile_section">
                <div className="col-md-12">
                  <h3 className="profile_heading">General</h3>
                </div>
              </div>
              <div className="row profile_inputs-row">
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">Full Name</span>
                    <span className="form-data__value"> { this.showField(fullname) }</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">Position</span>
                    <span className="form-data__value"> { this.showField(position) }</span>
                  </div>
                </div>
              </div>
              <div className="row profile_inputs-row">
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">Phone</span>
                    <span className="form-data__value"> { this.showField(phone) }</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">Skype</span>
                    <span className="form-data__value"> { this.showField(skype) }</span>
                  </div>
                </div>
              </div>
              <div className="row profile_inputs-row">
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">Work Hours</span>
                    <span className="form-data__value"> { this.showField(workhours) }</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">E-mail</span>
                    <span className="form-data__value"> { this.showField(email) }</span>
                  </div>
                </div>
              </div>
              <div className="row profile_section">
                <div className="col-md-12">
                  <h3 className="profile_heading">Personal</h3>
                </div>
              </div>
              <div className="row profile_inputs-row">
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">Birthday</span>
                    <span className="form-data__value"> { this.showField(birthday) }</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-data">
                    <span className="form-data__name">VK Profile</span>
                    <span className="form-data__value"> { this.showField(vk) }</span>
                  </div>
                </div>
              </div>
              <div className="row profile_section">
                <div className="col-md-12">
                  <h3 className="profile_heading">About me</h3>
                </div>
              </div>
              <div className="row profile_inputs-row">
                <div className="col-md-12">
                  <div className="form-data">
                    <span className="form-data__name">About</span>
                    <span className="form-data__value"> { this.showField(aboutme) }</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return ( <p> Wait a moment please...</p> );
    }
  }
}
;

function getParams(state) {
  return {
    users: state.users.list
  }
}

export default connect(getParams)(UserPage);
