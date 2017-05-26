import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser, deleteUser } from '../../actions/users';
import { showModal } from '../../actions/modals';
import { inviteMember } from '../../actions/companies';
import { INVITE_MEMBER } from '../../constants';

class SettingsCompanyMembers extends React.Component {

  handleInviteUsers = (e) => {
    e.preventDefault();
    this.props.showModal(INVITE_MEMBER, {
      inviteMember: this.props.inviteMember
    });
  }

  render() {
    const { users } = this.props;
    const mappedUsers = [];
    for(let _id in users){
      const el = users[_id];
      mappedUsers.push(
        <div className="row" key={_id}>
          <div className="col-sm-4">{el.firstName + " " + el.lastName}</div>
          <div className="col-sm-4">{el.role}</div>
          <div className="col-sm-4">{el.email || ''}</div>
        </div>
      );
    }

    return (
      <div>
        <h1>Company members</h1>
        <div className="text-right settings-left-menu">
          <div
            className="settings-left-menu__item"
            onClick={this.handleInviteUsers}
          >
            <span className="glyphicons glyphicons-plus"></span>{" "}
            Invite new member
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-sm-4">Name</div>
            <div className="col-sm-4">Role</div>
            <div className="col-sm-4">E-mail</div>
          </div>
          {mappedUsers}
        </div>
      </div>
    );
  }

}

SettingsCompanyMembers.PropTypes = {
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  inviteMember: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

function getParams(state) {
  return {
    users: state.users,
    user: state.users[state.currentUser._id]
  }
}

export default connect(getParams, {
  updateUser,
  deleteUser,
  inviteMember,
  showModal
})(SettingsCompanyMembers);
