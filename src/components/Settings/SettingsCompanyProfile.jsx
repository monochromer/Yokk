import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Component for view and edit company information
 */
class SettingsCompanyProfile extends Component {

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    user: PropTypes.object.isRequired
  }

  /**
   * React Render
   * @return {XML}
   */
  render() {
    const {user} = this.props;
    console.log(user);
    return(
      <div className="settings-company-profile">
        <h1>Company Profile</h1>
      </div>
    );
  }

}

export default SettingsCompanyProfile;
