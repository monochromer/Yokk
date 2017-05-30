import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from '../../actions/modals';
import { updateUser } from '../../actions/users';
import { inviteMember } from '../../actions/companies';
import { INVITE_MEMBER } from '../../constants';
import SettingsMembersListItem from './SettingsMembersListItem.jsx';
import Pagination from '../Pagination.jsx';
import LinesPerPage from '../LinesPerPage.jsx';

class SettingsCompanyMembers extends React.Component {

  state = {
    linesPerPage: 20,
    page: 1
  }

  pagesCount(){
    return Math.ceil(Object.keys(this.props.users).length / this.state.linesPerPage);
  }

	setPage = (e) => {
		e.preventDefault();
    const page = parseInt(e.target.getAttribute("value"), 10);
		if(page > 0 && page <= this.pagesCount()){
			this.setState({page});
		}
	}

	setLinesPerPage = (e) => {
		e.preventDefault();
		this.setState({
			linesPerPage: parseInt(e.target.value, 10),
			page: 1
		});
	}

  handleInviteUsers = (e) => {
    e.preventDefault();
    this.props.showModal(INVITE_MEMBER);
  }

  render() {
    const { users, updateUser, inviteMember, showModal } = this.props;
		const { linesPerPage, page } = this.state;
    const pagesCount = this.pagesCount();
		const firstLine = (page - 1) * linesPerPage;
		const lastLine = firstLine + linesPerPage;
    const mappedUsers = [];
    const usersArray = [];
    for(let _id in users){
      usersArray.push(users[_id]);
    }
    for(let i = firstLine; i < lastLine && i < usersArray.length; i++){
      const el = usersArray[usersArray.length - 1 - i];
      mappedUsers.push(
        <SettingsMembersListItem
          key={el._id}
          user={el}
          updateUser={updateUser}
          inviteMember={inviteMember}
          showModal={showModal}
        />
      );
    }

    return (
      <div className="settings-company-members">
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
          <div className="list-item row">
            <div className="col-sm-4">Name</div>
            <div className="col-sm-2">Role</div>
            <div className="col-sm-4">E-mail</div>
          </div>
          {mappedUsers}
          <div className="text-right">
            <LinesPerPage
              setLinesPerPage={this.setLinesPerPage}
              linesPerPage={linesPerPage}
            />
            <Pagination
              page={page}
              pagesCount={pagesCount}
              setPage={this.setPage}
            />
          </div>
        </div>
      </div>
    );
  }

}

SettingsCompanyMembers.PropTypes = {
  users: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  inviteMember: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
}

function getParams(state) {
  return {
    users: state.users
  }
}

export default connect(getParams, {
  showModal,
  updateUser,
  inviteMember
})(SettingsCompanyMembers);
