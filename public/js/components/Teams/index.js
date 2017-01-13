import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {saveTeam} from '../../actions/teams'
import {Input} from '../UI.jsx'
import InviteToTeam from './InviteToTeam'
import Team from './Team'

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
    // saveTeam(teamName, this.props.companyId)
    saveTeam(teamName, 'this.props.companyId')
  }

  addMembers = teamId => e => {
    e.preventDefault()
    const { modalIsOpen } = this.state

    console.log(modalIsOpen);

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

    // company should be dynaming (depending on current chosen company)
    const teams = getTeams(user.companies)

    // console.log(this.props.teams) const {teams} = this.props
    // const {}
    //PROTOTYPING
    const teamListArray = [
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

    const teamList = (teamListArray.length === 0)
      ? (
        <div>
          <div>Here will be your teams</div>
          <div>Add your first team right now</div>
          <input type="text" onChange={onTeamNameChange}/>
          <button onClick={saveTeam}>Save Team</button>
        </div>
      )
      : (teamListArray.map((team) => (
        <div key={team._id}>
          <Team team={team}/>
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

function getTeams(companies) {
  if (!companies || !companies[0]) return
  return companies[0].teams
}

export default connect(({currentUser}) => ({user: currentUser}))(Teams)
