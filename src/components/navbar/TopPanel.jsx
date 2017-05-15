import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { changeCurrentCompany, logout } from '../../actions/currentUser'
import UserMenu from './UserMenu.jsx'
import NotificationsDropdown from './NotificationsDropdown.jsx'
// import NewCompanyModal from './NewCompanyModal.jsx'

class TopPanel extends React.Component {

  state = {
    showUserMenu: false,
    showNotifications: false,
    showNewCompanyModal: false
  }

  showUserMenu = () => {
    if(this.state.showUserMenu){
      return false;
    }

    var hideUserMenu = function(){
      this.setState({showUserMenu:false});
      document.removeEventListener("click", hideUserMenu);
    }.bind(this);

    this.setState({showUserMenu:true});
    document.addEventListener("click", hideUserMenu);
  }

  showNotifications = () => {
    if(this.state.showNotifications){
      return false;
    }

    var hideNotifications = function(){
      this.setState({showNotifications:false});
      document.removeEventListener("click", hideNotifications);
    }.bind(this);

    this.setState({showNotifications:true});
    document.addEventListener("click", hideNotifications);
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
    const newNotifications = notifications.find(el => el.new) ?
      <div className="new-notifications-circle"></div>
      : [];

    const photoSrc = (!user.profileImg || !user.profileImg.small) ?
      '/img/dummy/960-720.png' : user.profileImg.small;

    return (
      <div className="top-panel">
        <div className="pull-right">
          <div
            className="top-panel_notifications-icon"
             onClick={this.showNotifications}
          >
            <span className="glyphicon glyphicon-bell"></span>
            {newNotifications}
            {notificationsDropdown}
          </div>
          <div
            className="top-panel_user-icon"
             onClick={this.showUserMenu}
          >
            <img
              src={photoSrc}
              className="img-circle"
              width="40px"
              height="40px"
              alt="profile"
            />
            {userMenu}
          </div>
        </div>
        <div className="top-panel_menu">
          <ul>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/"
              >Tracker</Link>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/teams"
              >Teams</Link>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/statistic"
              >Statistic</Link>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/settings"
              >Settings</Link>
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
