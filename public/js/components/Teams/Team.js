import React, {Component, PropTypes} from 'react'
import store from '../../store.js'
import {connect} from 'react-redux'
import AddUsersModal from './AddUsersModal'
import UserRow from './UserRow'
import {Table, Button, ButtonToolbar} from 'react-bootstrap'
import {deleteTeam, changeTeamName} from '../../actions/teams'

class Team extends Component {

  state = {
    changingName: false,
    newTeamName: ""
  }

  showModalUserAdd = () => {
    store.dispatch({type: "MODAL_ADD_USER_SHOW", teamId: this.props.team._id})
  }

  static PropTypes = {
    team: PropTypes.array.isRequired
  }

  deleteTeam = e => {
    this.props.deleteTeam(this.props.team._id)
  }

  changeTeamName = () => {
    if (!this.state.changingName) {
      this.setState({changingName: true})
    }
  }

  onNameChange = e => {
    this.setState({newTeamName: e.target.value})
  }

  saveNewName = () => {
    this.props.changeTeamName(this.props.team._id, this.state.newTeamName)
    this.setState({newTeamName: "", changingName: false})
  }

  render() {
    const {showModalUserAdd, deleteTeam, changeTeamName, saveNewName, onNameChange} = this
    const {changingName} = this.state
    const {team, companyId} = this.props
    const teamMembers = getMembersList(team.members, team._id)

    const getTeamName = (teamName, changingName, onNameChangeFunc) => {
      if (changingName)
        return <div style={{
          padding: "30px"
        }}><input
          style={{
          height: '50px',
          width: '700px',
          fontSize: '30px'
        }}
          type="text"
          onChange={onNameChangeFunc}
          /></div>
      if (!teamName && changingName === false)
        return <h2>'Default Name (should be changed)'</h2>
      return <h2>{teamName}</h2>
    }

    const style = {
      unconfirmedUsers: {
        backgroundColor: 'rgb(255,192,129)',
        color: 'white',
        display: 'inline-block',
        width: '200px',
        textAlign: 'center'
      }
    }

    return (
      <div className="container container__flex1 container__fixed">
        <div className="row user-table_header">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div onClick={changeTeamName}>{getTeamName(team.name, changingName, onNameChange)}</div>
            <div>
              {getSaveNameButton(changingName, saveNewName)}
              <button
                className="btn btn__md btn__trans-red"
                style={{
                marginLeft: '10px'
              }}
                onClick={deleteTeam}>Delete team</button>
            </div>
          </div>
          <div className="col-md-2 text-right">
            <button className="btn btn__md btn__trans-blue" onClick={showModalUserAdd}>+ Add Users</button>
          </div>
          <div className="col-md-8 col-md-offset-0">
            <div style={style.unconfirmedUsers}>Unconfirmed users</div>
          </div>
        </div>
        <div className="row users-list_heading">
          <div className="col-md-3 user-list_title">Full name</div>
          <div className="col-md-3 user-list_title">Email</div>
          <div className="col-md-2 user-list_title">Position</div>
          <div className="col-md-1 user-list_title">Sources</div>
          <div className="col-md-2 user-list_title">Activity</div>
          <div className="col-md-1 user-list_title">Actions</div>
        </div>
        {teamMembers}
        <AddUsersModal companyId={companyId} teamId={team._id}/>
      </div>
    )
  }
}

function getMembersList(teamMembers, teamId) {
  if (teamMembers.length === 0)
    return <div style={{
      textAlign: "center"
    }}>
      <div>There is no team members yet. Add them by clicking "+ Add Users" button on the right of a
        team's name.</div>
    </div>
  return teamMembers.map((teamMember, index) => (<UserRow key={index} user={teamMember} teamId={teamId}/>))
}

function getSaveNameButton(changingName, changeTeamNameFunc) {
  if (changingName)
    return <button className="btn btn__md btn__trans-blue" onClick={changeTeamNameFunc}>Save new name</button>
}

export default connect(({users, currentUser}) => {
  return {users: users.list, currentUser: currentUser}
}, {deleteTeam, changeTeamName})(Team);
