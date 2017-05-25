import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../UI.jsx';

class SettingsUserProfileContacts extends React.Component {

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

  render() {
    const {
      phone,
      address,
      skype,
      facebook,
      twitter
    } = this.props.user;
    const { editing, errors } = this.state;
    return editing ? (
      <div>
        <div className="row profile_section">
          <div className="col-md-12">
            <h3 className="profile_heading">
              Contacts
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
                name="phone"
                label="Phone number"
                defaultValue={ phone }
                error={errors.phone}
              />
            </div>
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="address"
                label="Home address"
                defaultValue={ address }
                error={errors.address}
              />
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="skype"
                label="Skype"
                defaultValue={ skype }
                error={errors.skype}
              />
            </div>
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="facebook"
                label="Facebook"
                defaultValue={ facebook }
                error={errors.facebook}
              />
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="twitter"
                label="Twitter"
                defaultValue={ twitter }
                error={errors.twitter}
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
              Contacts
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
              <div className="label">Phone number</div>
              <div>{ phone }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Home address</div>
              <div>{ address }</div>
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <div className="label">Skype</div>
              <div>{ skype }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Facebook</div>
              <div>{ facebook }</div>
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <div className="label">Twitter</div>
              <div>{ twitter }</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SettingsUserProfileContacts.PropTypes = {
  user: PropTypes.object.isRequired
}

export default SettingsUserProfileContacts;
