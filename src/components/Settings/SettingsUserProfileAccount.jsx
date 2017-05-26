import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../UI.jsx';
import { CHANGE_PASSWORD } from '../../constants';

class SettingsUserProfileAccount extends React.Component {

  componentWillMount(){
    this.setState(this.initialState);
  }

  initialState = {
    errors: {},
    editing: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  startEditing = () => {
    this.setState({
      editing: true
    });
  }

  cancelEditing = () => {
    this.setState(this.initialState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(this.props.user._id, this.state, (err) => {
      if(err){
        this.setState({errors: err});
        return;
      }
      this.setState(this.initialState);
    });
  }

  handleChangePass = (e) => {
    e.preventDefault();
    this.props.showModal(CHANGE_PASSWORD, {
      updateUser: this.props.updateUser,
      user: this.props.user
    });
  }

  render() {
    const { email } = this.props.user;
    const { editing, errors } = this.state;
    return editing ? (
      <div>
        <div className="row profile_section">
          <div className="col-md-12">
            <h3 className="profile_heading">
              Account
              <span
                className="glyphicons glyphicons-ok"
                onClick={this.handleSubmit}
              ></span>
              <span
                className="glyphicons glyphicons-remove"
                onClick={this.cancelEditing}
              ></span>
            </h3>
          </div>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="email"
                label="E-mail"
                defaultValue={ email }
                error={errors.email}
              />
            </div>
            <div className="col-md-6">
              <div className="label">Password</div>
              <div>
                <span>&#9899;&#9899;&#9899;&#9899;&#9899;&#9899;&#9899;&#9899;</span>
                <button
                  className="btn btn__sm btn__blue"
                  type="submit"
                  onClick={this.handleChangePass}
                >
                  Изменить
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div>
        <div className="row profile_section">
          <div className="col-md-12">
            <h3 className="profile_heading">
              Account
              <span
                className="glyphicons glyphicons-pencil"
                onClick={this.startEditing}
              ></span>
            </h3>
          </div>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <div className="label">E-mail</div>
              <div>{ email }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Password</div>
              <div>&#9899;&#9899;&#9899;&#9899;&#9899;&#9899;&#9899;&#9899;</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SettingsUserProfileAccount.PropTypes = {
  user: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

export default SettingsUserProfileAccount;
