import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsLeftMenu from './SettingsLeftMenu.jsx';
import SettingsAddNewCompany from './SettingsAddNewCompany.jsx';
import SettingsCompanyProfile from './SettingsCompanyProfile.jsx';
import SettingsUserProfile from './SettingsUserProfile.jsx';

class Settings extends Component {

  state = {
    activeSection: 'user-profile'
  }

  static PropTypes = {
    user: PropTypes.object,
    teams: PropTypes.array
  }

  /**
   * Handler for change settings section
   * @param e
   */
  onSettingsSectionChange = (e) => {
    this.setState({
      settingsActiveSection: e.target.getAttribute("data-settings-section")
    });

    this.getSettingsSection = this.getSettingsSection.bind(this);
  }

  /**
   * Get settings section according to the active left menu item
   * @return {XML|boolean}
   */
  getSettingsSection = () => {
    const { user } = this.props;
    switch ( this.state.activeSection ) {
      case 'user-profile':
        return <SettingsUserProfile
          user={user}
        />;
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
    const {user, companies} = this.props;

    return (
      <div className="container container__flex1 container__fixed">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3">
            <SettingsLeftMenu
              activeSection={this.state.activeSection}
              onSectionChange={this.onSectionChange}
              user={user}
              companies={companies}
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
    user: state.users[state.currentUser._id],
    teams: state.teams,
    companies: state.companies
  }
}

export default connect(getParams)(Settings)
