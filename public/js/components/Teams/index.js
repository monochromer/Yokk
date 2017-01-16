import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {saveTeam} from '../../actions/teams'
import {Input} from '../UI.jsx'
import InviteToTeam from './InviteToTeam'
import Team from './Team'
import { fetchCurrentUser } from '../../actions/currentUser.js'

class Teams extends Component {

  state = {
    teamName: "",
    teamMembersVisible: [],
    teamExists: true,
    modalIsOpen: false
  }

  static PropTypes = {
    teams: PropTypes.array
  }

  teamChangeHandler = e => {
    this.setState({teamName: e.target.value})
  }

  addNewTeam = () => {
    const {teamName} = this.state
    const {user} = this.props
    // change user.companies[0] to right companyId (should be fetched from props)
    // saveTeam(teamName, this.props.companyId)
    saveTeam(teamName, user.companies[0])
    // save team should add new team to current user instead of fetching current user
    store.dispatch(fetchCurrentUser())
  }

  addMembers = teamId => e => {
    e.preventDefault()
    const { modalIsOpen } = this.state

    modalIsOpen ?
    this.setState({
      modalIsOpen: false
    }) :
    this.setState({
      modalIsOpen: true
    })
  }

  render() {
    const {teamChangeHandler, addNewTeam, addMembers} = this
    const { teamExists, modalIsOpen } = this.state
    const { user } = this.props

    // change this!!!
    let companyId
    if (user.companies) {
      companyId = user.companyId ? user.companyId : user.companies[0]
    }

    //PROTOTYPING
    const teamListArrayProto = [
      {
        _id: "1",
        name: "team 1",
        members: [
          {
            _id: '1',
            name: 'Oleg',
            profileImg: '1'
          },
          {
            _id: '2',
            name: 'Konstantin',
            profileImg: '2'
          },
        ]
      }, {
        _id: "2",
        name: "team 2",
        members: [
          {
            _id: '3',
            name: 'Natalia',
            profileImg: '3'
          },
          {
            _id: '4',
            name: 'Sophia',
            profileImg: '4'
          },
        ]
      }
    ]
    //PROTOTYPING

    const teamListArray = getTeams(user)
    const teamList = (!teamListArray || teamListArray.length === 0)
      ? (
        <div style={{marginTop: "40px", textAlign: "center"}}>Here will be your teams. You can add your first team right now by typing its name in the field above and clicking "Add the team"</div>
      )
      : (teamListArray.map((team) => (
        <div key={team._id}>
          <Team companyId={companyId} team={team}/>
        </div>
      )))

    const styles = {
      inputGroup: {
        marginTop: "50px"
      },
      teamsList: {
        marginTop: "100px"
      }
    }
    const inputClassNames = classNames({'input-group input-group__black': true, 'input-group__error': this.props.error});

    return (
      <div className="container container__flex1 container__fixed">

        {/*
          <InviteToTeam
            modalIsOpen = { modalIsOpen }
            addMembers = { addMembers }
          />
          */}

        <div style={styles.inputGroup}>
          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <Input
                handleChange={teamChangeHandler}
                className={inputClassNames}
                name="email"
                label="Team name"
                error={this.props.error}/>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button
                onClick={addNewTeam}
                className="btn  btn__lg btn__blue team-create__create"
                disabled={!teamExists
                ? "disabled"
                : ""}>Add the team
              </button>
            </div>
          </div>
        </div>
        {teamList}


        {/*
          <div className="row" style={styles.teamsList}>
            <div className="col-md-6 col-sm-8 col-xs-10 col-md-offset-3">
              {teamList}
            </div>
          </div>
          */}

      </div>
    )
  }
}

function getTeams(user) {
  if (!user || !user.teams) return
  return user.teams
}

export default connect(({currentUser}) => {
  // change to 'right' companyId
  return {user: currentUser}
})(Teams)
