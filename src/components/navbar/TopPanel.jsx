import React from 'react'
import { Link, IndexLink } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { changeCurrentCompany, logout } from '../../actions/currentUser'
import UserMenu from './UserMenu.jsx'
import { isManager } from '../../helpers';
import ManagerMenu from './ManagerMenu.jsx'
import NotificationsDropdown from './NotificationsDropdown.jsx'
import { markAllNotifications } from '../../actions/notifications';
// import NewCompanyModal from './NewCompanyModal.jsx'

class TopPanel extends React.Component {

  state = {
    showUserMenu: false,
    showNotifications: false,
    showManagerMenu: false
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

  showManagerMenu = () => {
    this.setState({
      showManagerMenu: true
    });
  }

  hideManagerMenu = () => {
    this.setState({
      showManagerMenu: false
    });
  }

  onCompanyChange = companyId => e => {
    this.props.changeCurrentCompany(companyId)
  }

  render() {
    const {
      user,
      logout,
      notifications,
      markAllNotifications,
      companies,
      teams
    } = this.props;
    if(!user){
      return(
        <div>Loading data...</div>
      );
    }
    const { showUserMenu, showNotifications, showManagerMenu } = this.state;

    const managerMenuButton = isManager(user, teams) ?
      <div className="top-panel_manager-menu-icon">
        <span
          onClick={this.showManagerMenu}
        >+</span>
      </div>
      : [];

    const userMenu = showUserMenu ?
      <UserMenu
        logout={logout}
        companies={companies}
        user={user}
      />
      : [];

    const newNotifications = notifications.find(el => el.new) ? true : false;
    const notificationsDropdown = showNotifications ?
      <NotificationsDropdown
        notifications={notifications}
        newNotifications={newNotifications}
        markAllNotifications={markAllNotifications}
      />
      : [];

    const photoSrc = (!user.profileImg || !user.profileImg.small) ?
      '/img/dummy/960-720.png' : user.profileImg.small;

    if(showManagerMenu){
      return (
        <ManagerMenu hideManagerMenu={this.hideManagerMenu} />
      );
    }
    return (
      <div className="top-panel">
        <div className="pull-right">
          <div
            className="top-panel_notifications-icon"
             onClick={this.showNotifications}
          >
            <span className="glyphicons glyphicons-bell"></span>
            {newNotifications && <div className="new-notifications-circle"></div>}
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
              <IndexLink
                className="top-panel_menu-item"
                activeClassName="active"
                to="/"
              >Tracker</IndexLink>
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
          </ul>
          {managerMenuButton}
        </div>
      </div>
    )
  }
}

TopPanel.PropTypes = {
  user: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  notifications: PropTypes.array.isRequired,
  markAllNotifications: PropTypes.func.isRequired,
  changeCurrentCompany: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

const getProps = function(store) {
  return {
    user: store.users[store.currentUser._id],
    notifications: store.notifications,
    companies: store.companies,
    teams: store.teams
  }
};


export default connect(getProps, {
  changeCurrentCompany,
  logout,
  markAllNotifications
})(TopPanel)
