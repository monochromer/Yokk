import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser } from '../../actions/users';
import { NEW_USER_NOTIFICATION, NEW_TEAM_NOTIFICATION } from '../../constants'

class SettingsNotifications extends React.Component {

  componentWillMount(){
    this.setState(this.initialState);
  }

  initialState = {
    notifications: this.props.user.notifications,
    errors: {}
  }

  handleChange = (e) => {
    const { notifications } = this.state;
    const index = notifications.indexOf(e.target.name);
    if( index > -1){
      this.setState({
        notifications: [
          ...notifications.slice(0, index),
          ...notifications.slice(index + 1)
        ]
      });
    }
    else{
      this.setState({
        notifications: [
          ...notifications,
          e.target.name
        ]
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(this.props.user._id, this.state, (err) => {
      if(err){
        this.setState({
          errors: err
        });
        return false;
      }
      this.setState({
        errors: {}
      });
      this.initialState = {
        notifications: this.props.user.notifications,
        errors: {}
      }
    });
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState(this.initialState);
  }

  render() {
    const {
      notifications,
      errors
    } = this.state;
    return(
      <div>
        <h1>Notification</h1>
        <h3>Show notifications when:</h3>
        <form
          className="settings-notifications__form"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label className="row">
              <span className="col-sm-10">New user invited</span>
              <input
                type="checkbox"
                checked={notifications.indexOf(NEW_USER_NOTIFICATION) > -1}
                name={NEW_USER_NOTIFICATION}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="row">
              <span className="col-sm-10">New team created</span>
              <input
                type="checkbox"
                checked={notifications.indexOf(NEW_TEAM_NOTIFICATION) > -1}
                name={NEW_TEAM_NOTIFICATION}
                onChange={this.handleChange}
              />
            </label>
          </div>
          {errors.form && <div className="form-error">{errors.form}</div>}
          <div className="form-group">
            <button
              className="btn btn__md btn__blue"
              type="submit"
            >
              Save
            </button>
            <button
              className="btn btn__md"
              type="submit"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

}

SettingsNotifications.PropTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

function getProps(state) {
  return {
    user: state.users[state.currentUser._id]
  }
}

export default connect(getProps, { updateUser })(SettingsNotifications);
