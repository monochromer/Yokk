import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { changeCurrentCompany, logout } from '../../actions/currentUser'
import UserMenu from './UserMenu.jsx'
import NotificationsDropdown from './NotificationsDropdown.jsx'

class TopPanel extends React.Component {

  state = {
    showUserMenu: false,
    showNotifications: false
  }

  showUserMenu = () => {
    this.setState({
      showUserMenu: true
    });
  }

  showNotifications = () => {
    this.setState({
      showNotifications: true
    });
  }

  onCompanyChange = companyId => e => {
    this.props.changeCurrentCompany(companyId)
  }

  render() {
    const { user, logout, notifications } = this.props;
    const { showUserMenu, showNotifications } = this.state;

    const userMenu = showUserMenu ? 
      <UserMenu
        logout={logout}
        user={user}
      />
      : [];

    const notificationsDropdown = showNotifications ? 
      <NotificationsDropdown
        notifications={notifications}
      />
      : [];

    const photo = user.profileImg ? 
      <img
        src={user.profileImg.small}
        className="img-circle"
        width="40px"
        height="40px"
        alt="profile"
      />
      : [];

    return (
      <div className="top-panel">
        <div className="pull-right">
          <div
            className="top-panel_notifications-icon"
             onClick={this.showNotifications}
          >
            <span className="glyphicon glyphicon-bell"></span>
            {notificationsDropdown}
          </div>
          <div
            className="top-panel_user-icon"
             onClick={this.showUserMenu}
          >
            {photo}
            {userMenu}
          </div>
        </div>
        <div className="top-panel_menu">
          <ul>
            <li>
              <Link activeClassName="active" to="/">Tracker</Link>
            </li>
            <li>
              <Link activeClassName="active" to="/teams">Teams</Link>
            </li>
            <li>
              <Link activeClassName="active" to="/statistic">Statistic</Link>
            </li>
            <li>
              <Link activeClassName="active" to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

TopPanel.PropTypes = {
  user: PropTypes.object.isRequired
}

const getProps = function(store) {
  return {
    user: store.currentUser.data,
    notifications: store.notifications
  }
};


export default connect(getProps, { changeCurrentCompany, logout })(TopPanel)
