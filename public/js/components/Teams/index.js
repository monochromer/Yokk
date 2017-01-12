import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Team from './Team'
import {saveTeam} from '../../actions/teams'
import {Input} from '../UI.jsx'

export default class Teams extends Component {

  state = {
    teamName: "",
    teamMembersVisible: [],
    teamExists: true
  }

  static PropTypes = {
    teams: PropTypes.array
  }

  teamChangeHandler = e => {
    this.setState({teamName: e.target.value})
  }

  addNewTeam = () => {
    const {teamName} = this.state
    // saveTeam(teamName)
    console.log('save team handler')
  }

  addMembers = teamId => e => {
    e.preventDefault()
    // check /test path to see the view
    console.log('addMembersHandler')
  }

  render() {
    const {teamChangeHandler, addNewTeam, addMembers} = this
    const {teamExists} = this.state
    // console.log(this.props.teams) const {teams} = this.props PROTOTYPING
    const teamListArray = [
      {
        _id: "1",
        name: "team 1",
        members: ['1', '2']
      }, {
        _id: "2",
        name: "team 2",
        members: ['3', '4']
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
          <div>{team.name}</div>
          <Team members={team.members}/>
          <a href="#" onClick={addMembers(team._id)}>Add members</a>
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
      <div>

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

        <div className="row" style={styles.teamsList}>
          <div className="col-md-6 col-sm-8 col-xs-10 col-md-offset-3">
            {teamList}
          </div>
        </div>

      </div>
    )
  }
}
