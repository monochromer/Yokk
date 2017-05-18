import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Component for left menu on page Settings
 */
class SettingsLeftMenu extends Component {

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.userSettings = [
      {
        section: "user-profile",
        text: "User Profile",
        roles: [
          'user',
          'manager',
          'admin',
          'owner'
        ]
      },
      {
        section: "notifications",
        text: "Notifications",
        roles: [
          'user',
          'manager',
          'admin',
          'owner'
        ]
      }
    ];
    this.companySettings = [
      {
        section: "add-new-company",
        text: "+ Add New Company",
        roles: [
          'admin',
          'owner'
        ]
      },
      {
        section: "company-profile",
        text: "Company Profile",
        roles: [
          'admin',
          'owner'
        ]
      },
      {
        section: "company-members",
        text: "Company Members",
        roles: [
          'manager',
          'admin',
          'owner'
        ]
      },
      {
        section: "plugins",
        text: "Plugins",
        roles: [
          'admin',
          'owner'
        ]
      }
    ];
  }

  static PropTypes = {
    settingsActiveSection: PropTypes.string,
    onSettingsSectionChange: PropTypes.func,
    user: PropTypes.object
  }

  /**
   * Filter left menu items according user role permissions
   * @param settings
   * @returns {Array} left menu items.
   */
  filterSettingsByUserRole(settings) {
    const currentUserRole = this.props.user.role;
    return settings.filter((item) => {
      return ( item.roles.indexOf(currentUserRole) > -1 );
    });
  }

  /**
   * Get markup for companies select.
   * @return {XML|null}
   */
  getCompaniesSelect() {
    const companies = this.props.user.companies;
    if (typeof companies !== 'undefined') {
      return (
        <select>
          {companies.map((company, index) => {
            return (
              <option value={company._id} key={index}>{company.name}</option>
            );
          })}
        </select>
      );
    } else {
      return null;
    }
  }

  /**
   * React Render
   * @returns {XML}
   */
  render() {
    const onSettingsSectionChange = this.props.onSettingsSectionChange;
    const userSettings = this.filterSettingsByUserRole(this.userSettings);
    const companySettings = this.filterSettingsByUserRole(this.companySettings);
    const companiesSelect = this.getCompaniesSelect();

    return (
      <div className="settings-left-menu">
        <h3>User Settings</h3>
        <ul>
          {userSettings.map((item, index) => {
            let className = 'settings-left-menu__item';
            if ( this.props.settingsActiveSection === item.section ) {
              className += ' settings-left-menu__item_active';
            }

            return (
              <li
                className={className}
                data-settings-section={item.section}
                onClick={onSettingsSectionChange}
                key={index}
              >
                {item.text}
              </li>
            );
          })}
        </ul>

        { ( this.props.user.role !== 'user' ) ? <h3>Company Settings</h3> : "" }

        { companiesSelect }

        <ul>
          {companySettings.map((item, index) => {
            let className = 'settings-left-menu__item';
            if ( item.section === 'add-new-company' ) {
              className += ' settings-left-menu__item-add-new-company';
            }
            if ( this.props.settingsActiveSection === item.section ) {
              className += ' settings-left-menu__item_active';
            }

            return (
              <li
                className={className}
                data-settings-section={item.section}
                onClick={onSettingsSectionChange}
                key={index}
              >
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default SettingsLeftMenu;


