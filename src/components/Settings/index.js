import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTEams } from '../../actions/teams.js';
import SettingsLeftMenu from './SettingsLeftMenu.jsx';
import SettingsAddNewCompany from './SettingsAddNewCompany.jsx';
import SettingsCompanyProfile from './SettingsCompanyProfile.jsx';

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
      settingsActiveSection: 'user-profile',
      settingsActiveCompanyId: null
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

    this.setState({
      settingsActiveCompanyId: companyId
    });
  }

  /**
   * Handler for change settings section
   * @param e
   */
  onSettingsSectionChange(e) {
    this.setState({
      settingsActiveSection: e.target.getAttribute("data-settings-section")
    });

    this.getSettingsSection = this.getSettingsSection.bind(this);
  }

  /**
   * Get settings section according to the active left menu item
   * @return {XML|boolean}
   */
  getSettingsSection() {
    const {user} = this.props;
    switch ( this.state.settingsActiveSection ) {
      case 'add-new-company':
        return <SettingsAddNewCompany />;
      case 'company-profile':
        return (
          <SettingsCompanyProfile
            user={user}
          />
        );
      default:
        return false;
    }
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
              { this.getSettingsSection() }
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
