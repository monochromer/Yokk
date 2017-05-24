import React from 'react';
import SettingsLeftMenu from './SettingsLeftMenu.jsx';
import SettingsAddNewCompany from './SettingsAddNewCompany.jsx';
import SettingsCompanyProfile from './SettingsCompanyProfile.jsx';
import SettingsUserProfile from './SettingsUserProfile.jsx';

class Settings extends React.Component {

  getSettingsSection = () => {
    switch ( window.location.hash ) {
      case '#add-new-company':
        return <SettingsAddNewCompany />;
      case '#company-profile':
        return <SettingsCompanyProfile />;
      default:
        return <SettingsUserProfile />;
    }
  }

  render() {
    return (
      <div className="container container__flex1 container__fixed">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3">
            <SettingsLeftMenu />
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

export default Settings
