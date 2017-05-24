import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

/**
 * Component for left menu on page Settings
 */
class SettingsLeftMenu extends React.Component {

  onSectionSelect = (e) => {
    browserHistory.push('/settings#' + e.target.getAttribute('value'));
  }

  selectCompany = () => {
    
  }

  render() {
    const { user, companies } = this.props;
    let adminMenuItems = [];
    if(user.role === 'admin' || user.role === 'owner'){
      adminMenuItems = <div>
        <li
          className="settings-left-menu__item"
          value="company-profile"
          onClick={this.onSectionSelect}
        >
          Company profile
        </li>
        <li
          className="settings-left-menu__item"
          value="company-members"
          onClick={this.onSectionSelect}
        >
          Company members
        </li>
        <li
          className="settings-left-menu__item"
          value="plugins"
          onClick={this.onSectionSelect}
        >
          Plugins
        </li>
      </div>;
    }

    const options = companies.map((company) => {
      return(
        <option
          key={company._id}
          value={company._id}
        >{company.name}</option>
      );
    });
    const mappedCompanies = (
      <select
        className="dropdown-element"
        onChange={this.selectCompany}
        value={user.companyId}
      >
        {options}
      </select>
    );

    return (
      <div className="settings-left-menu">
        <h3>User Settings</h3>
        <ul>
          <li
            className="settings-left-menu__item"
            value="user-profile"
            onClick={this.onSectionSelect}
          >
            User profile
          </li>
          <li
            className="settings-left-menu__item"
            value="notifications"
            onClick={this.onSectionSelect}
          >
            Notifications
          </li>
        </ul>
        <h3>Company Settings</h3>
        {mappedCompanies}
        <ul>
          <li
            className="settings-left-menu__item"
            value="add-new-company"
            onClick={this.onSectionSelect}
          >
            <span className="glyphicons glyphicons-plus-sign"></span>{" "}
            Add new company
          </li>
          {adminMenuItems}
        </ul>
      </div>
    );
  }

}

SettingsLeftMenu.PropTypes = {
  companies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

function getParams(state) {
  return {
    user: state.users[state.currentUser._id],
    companies: state.companies
  }
}

export default connect(getParams)(SettingsLeftMenu)
