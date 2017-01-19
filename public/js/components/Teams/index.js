import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {Input} from '../UI.jsx'
import InviteToTeam from './InviteToTeam'
import Team from './Team'
import { fetchCurrentUser } from '../../actions/currentUser.js'
import { saveTeam, fetchTEams } from '../../actions/teams.js'

class Teams extends Component {

  state = {
    teamName: "",
    teamMembersVisible: [],
    teamExists: true,
    modalIsOpen: false
  }

  componentWillReceiveProps(nextProps) {
    const {companyId} = nextProps.user
    if (companyId.length !== 0 && this.props.user.companyId !== companyId) this.props.fetchTEams(companyId)
  }

  componentWillMount() {
    const {companyId} = this.props.user
    if (companyId.length !== 0) this.props.fetchTEams(companyId)
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
    this.props.saveTeam(teamName, user.companyId)
    // store.dispatch(fetchCurrentUser())
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
    const { user, teams } = this.props

    let companyId
    if (user.companies) {
      companyId = user.companyId ? user.companyId : user.companies[0]
    }

    const teamList = (!teams || teams.length === 0)
      ? (
        <div style={{marginTop: "40px", textAlign: "center"}}>Here will be your teams. You can add your first team right now by typing its name in the field above and clicking "Add the team"</div>
      )
      : (teams.map((team) => (
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
        <div style={styles.inputGroup}>
          <div className="row center-xs">
            <div className="col-md-8 col-sm-8 col-xs-10">
              <Input
                handleChange={teamChangeHandler}
                className={inputClassNames}
                name="email"
                label="Team name"
                error={this.props.error}/>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-8 col-sm-8 col-xs-10">
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
      </div>
    )
  }
}

function getTeams(user) {
  if (!user || !user.teams) return
  return user.teams
}

export default connect(({currentUser, currentUserTeams}) => {
  return {user: currentUser, teams: currentUserTeams}
}, { fetchTEams, saveTeam })(Teams)
