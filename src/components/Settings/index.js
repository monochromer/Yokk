import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTEams } from '../../actions/teams.js';

class Settings extends Component {

  static PropTypes = {
    user: PropTypes.object,
    teams: PropTypes.array
  }

  componentWillReceiveProps(nextProps) {
    const { companyId } = nextProps.user;
    if (companyId.length && this.props.user.companyId !== companyId){
      this.props.fetchTEams(companyId);
    }
  }

  componentWillMount() {
    const { companyId } = this.props.user;
    if (companyId.length) {
      this.props.fetchTEams(companyId);
    }
  }

  render() {
    const {user, teams} = this.props;
    console.log(user);
    console.log(teams);

    return (
      <div className="container container__flex1 container__fixed">
        <h3>Settings</h3>
      </div>
    );
  }

}

function getParams(state) {
  return {
    user: state.currentUser.data,
    teams: state.currentUserTeams
  }
}

export default connect(getParams, {fetchTEams})(Settings)
