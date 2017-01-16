import React, {Component, PropTypes} from 'react'
import store from '../../store.js'
import {connect} from 'react-redux'
import AddUsersModal from './AddUsersModal'
import UserRow from './UserRow'

import {Table, Button, ButtonToolbar} from 'react-bootstrap'
//  import ModalUserAdd from './ModalUserAdd.jsx'

class Team extends Component {

  showModalUserAdd = () => {
    // console.log('showModal');
    store.dispatch({type: "MODAL_ADD_USER_SHOW"})
  }

  static PropTypes = {
    team: PropTypes.array.isRequired
  }

  render() {
    const {showModalUserAdd} = this
    const {team, companyId} = this.props

    // {/*this.props.users.map((user) => {   return <UserRow user={user}
    // currentUser={this.props.currentUser} key={user._id}/> */}

    const teamMembers = getMembersList(team.members)

    return (
      <div className="container container__flex1 container__fixed">
        <div className="row user-table_header">
          <div className="col-md-8 col-md-offset-2 text-center">
            <h2>{team.name}</h2>
          </div>
          <div className="col-md-2 text-right">
            <button className="btn btn__md btn__trans-blue" onClick={showModalUserAdd}>+ Add Users</button>
          </div>
        </div>
        <div className="row users-list_heading">
          <div className="col-md-3 user-list_title">Full name</div>
          <div className="col-md-4 user-list_title">Position</div>
          <div className="col-md-2 user-list_title">Sources</div>
          <div className="col-md-2 user-list_title">Actions</div>
          <div className="col-md-1 user-list_title"></div>
        </div>
        {teamMembers}
        <AddUsersModal companyId={companyId} teamId={team._id}/>
      </div>
    )
  }
}

function getMembersList(teamMembers) {
  if (teamMembers.length === 0)
    return <div style={{ textAlign: "center" }}>
      <div>There is no team members yet. Add them by clicking "+ Add Users" button on the right of a team's name.</div>
    </div>
  return teamMembers.map((teamMember,index) => (<UserRow key={index} user={teamMember}/>))
}

export default connect(({users, currentUser}) => {
  return {users: users.list, currentUser: currentUser}
})(Team);
