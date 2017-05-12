import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTEams } from '../../actions/teams.js';
import SettingsLeftMenu from './SettingsLeftMenu.jsx';

/**
 * Component for user and companies settings
 */
class Settings extends Component {

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      settingsActiveSection: 'user-profile'
    };

    this.onSettingsSectionChange = this.onSettingsSectionChange.bind(this);
  }

  static PropTypes = {
    user: PropTypes.object,
    teams: PropTypes.array
  }

  /**
   * React componentWillReceiveProps
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { companyId } = nextProps.user;
    if (companyId.length && this.props.user.companyId !== companyId){
      this.props.fetchTEams(companyId);
    }
  }

  /**
   * React componentWillMount
   */
  componentWillMount() {
    const { companyId } = this.props.user;
    if (companyId.length) {
      this.props.fetchTEams(companyId);
    }
  }

  /**
   * Handler for change settings section
   * @param e
   */
  onSettingsSectionChange(e) {
    this.setState({
      settingsActiveSection: e.target.getAttribute("data-settings-section")
    });
  }

  /**
   * React Render
   * @return {XML}
   */
  render() {
    const {user, teams} = this.props;

    return (
      <div className="container container__flex1 container__fixed">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3">
            <SettingsLeftMenu
              settingsActiveSection={this.state.settingsActiveSection}
              onSettingsSectionChange={this.onSettingsSectionChange}
              user={user}
            />
          </div>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <div className="settings__content">
              {this.state.settingsActiveSection}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

/**
 * Redux get parameters
 * @param state
 * @return {{user: {Object}, teams: {Array}}}
 */
function getParams(state) {
  return {
    user: state.currentUser.data,
    teams: state.currentUserTeams
  }
}

export default connect(getParams, {fetchTEams})(Settings)
