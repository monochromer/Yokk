import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../UI.jsx';

class SettingsUserProfileGeneral extends React.Component {

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
    this.setState({
      editing: false,
      errors: {}
    });
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

  render() {
    const {
      firstName,
      lastName,
      workHours,
      position,
      profileEmail
    } = this.props.user;
    const { editing, errors } = this.state;
    return editing ? (
      <div>
        <div className="row profile_section">
          <div className="col-md-12">
            <h3 className="profile_heading">
              General
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
                name="firstName"
                label="First name"
                defaultValue={ firstName }
                error={errors.firstName}
              />
            </div>
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="lastName"
                label="Last name"
                defaultValue={ lastName }
                error={errors.lastName}
              />
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="workHours"
                label="Work hours"
                defaultValue={ workHours }
                error={errors.workHours}
              />
            </div>
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="position"
                label="Position"
                defaultValue={ position }
                error={errors.position}
              />
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="profileEmail"
                label="E-mail"
                defaultValue={ profileEmail }
                error={errors.profileEmail}
              />
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div>
        <div className="row profile_section">
          <div className="col-md-12">
            <h3 className="profile_heading">
              General
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
              <div className="label">First name</div>
              <div>{ firstName }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Last name</div>
              <div>{ lastName }</div>
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <div className="label">Work hours</div>
              <div>{ workHours }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Position</div>
              <div>{ position }</div>
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <div className="label">E-mail</div>
              <div>{ profileEmail }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Badges</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SettingsUserProfileGeneral.PropTypes = {
  user: PropTypes.object.isRequired
}

export default SettingsUserProfileGeneral;
