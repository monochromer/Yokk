import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Team from './Team'
import { ADD_TEAM } from '../../constants';
import { showModal } from '../../actions/modals';

class Teams extends Component {

  static PropTypes = {
    teams: PropTypes.array
  }

  showAddTeamModal = (e) => {
    e.preventDefault();
    this.props.showModal(ADD_TEAM);
  }

  render() {
    const { companyId, teams } = this.props
    if(!teams.length){
      return(<div>Fetching data...</div>);
    }

    const teamList = teams.map((team) => (
      <Team key={team._id} companyId={companyId} team={team}/>
    ));

    return (
      <div className="container container__flex1 container__fixed">
        <div className="text-right marginTop">
          <a
            onClick={this.showAddTeamModal}
            className=""
          >
            <span className="glyphicons glyphicons-plus"></span>{" "}
            Add new team
          </a>
        </div>
        {teamList}
      </div>
    )
  }
}

function getParams(state) {
  return {
    companyId: state.users[state.currentUser._id].companyId,
    teams: state.teams
  }
}

export default connect(getParams, { showModal })(Teams)
