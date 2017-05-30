import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DELETE_USER, ALERT } from '../../constants';

class SettingsMembersListItem extends React.Component {

  state = {
    editing: false,
    role: this.props.user.role
  }

  startEditing = () => {
    this.setState({
      editing: true
    });
  }

  cancelEditing = () => {
    this.setState({
      editing: false,
      role: this.props.user.role
    });
  }

  changeRole = (e) => {
    this.setState({
      role: e.target.value
    });
  }

  saveRole = () => {
    const { user, updateUser } = this.props;
    updateUser(user._id, this.state, (err) => {
      if(err){
        console.log(err);
        return;
      }
      this.cancelEditing();
    });
  }

  removeUser = () => {
    this.props.showModal(DELETE_USER, {user: this.props.user});
  }

  repeatInvite = () => {
    const { email, role } = this.props.user;
    this.props.inviteMember({email, role}, (err) => {
      if(err){
        this.setState({errors: err});
        return;
      }
      this.props.showModal(ALERT, {text: 'Invite sent'});
    });
  }

  render() {
    const { firstName, lastName, email, pending } = this.props.user;
    const { editing, role } = this.state;
    const buttons = role === 'owner' ?
      [] :
      (
        pending ?
        <div className="col-sm-2">
          <span
            className="glyphicons glyphicons-repeat"
            onClick={this.repeatInvite}
          ></span>
          <span
            className="glyphicons glyphicons-bin"
            onClick={this.removeUser}
          ></span>
        </div>
        :
        (
          editing ?
          <div className="col-sm-2">
            <span
              className="glyphicons glyphicons-ok"
              onClick={this.saveRole}
            ></span>
            <span
              className="glyphicons glyphicons-remove"
              onClick={this.cancelEditing}
            ></span>
          </div>
          :
          <div className="col-sm-2">
            <span
              className="glyphicons glyphicons-pencil"
              onClick={this.startEditing}
            ></span>
            <span
              className="glyphicons glyphicons-bin"
              onClick={this.removeUser}
            ></span>
          </div>
        )
      );
    const roleField = editing ?
      <select
        value={role}
        onChange={this.changeRole}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      : role;
    return (
      <div className={classNames({'list-item': true, row: true, pending})}>
        <div className="col-sm-4">{firstName + " " + lastName}</div>
        <div className="col-sm-2">{roleField}</div>
        <div className="col-sm-4">{email || ''}</div>
        {buttons}
      </div>
    );
  }

}

SettingsMembersListItem.PropTypes = {
  user: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  inviteMember: PropTypes.func.isRequired
}

export default SettingsMembersListItem;
