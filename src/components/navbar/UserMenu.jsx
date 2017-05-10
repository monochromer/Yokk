import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

class UserMenu extends React.Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    window.location.reload();
  }

  render() {
    const { user, logout } = this.props;

    return (
      <div className="dropdown">
        <div>{user.firstName}</div>
        <div>
          <a href="#" onClick={this.logout} >Logout</a>
        </div>
      </div>
    )
  }
}

UserMenu.PropTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default UserMenu;
