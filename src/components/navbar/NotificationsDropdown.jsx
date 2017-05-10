import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

class UserMenu extends React.Component {

  render() {
    const { notifications } = this.props;

    return (
      <div className="dropdown">
        <div>notifications</div>
        <div>
          <a>Logout</a>
        </div>
      </div>
    )
  }
}

UserMenu.PropTypes = {
  notifications: PropTypes.array.isRequired
}

export default UserMenu;
