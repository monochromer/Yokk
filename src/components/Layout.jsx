import React from 'react'
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TopPanel from './navbar/TopPanel.jsx'
import Footer from './footer/Footer.jsx'
import LinkService from './linkService/LinkService.jsx'
import { fetchTeamUsers } from '../actions/users.js'
import { fetchCurrentUser } from '../actions/currentUser.js'
import { fetchNotifications } from '../actions/notifications'
import { setSystemAlert } from '../actions/alerts'
import SystemAlertNotification from './SystemAlertNotification.jsx'

class Layout extends React.Component {

  componentWillMount() {
    if(this.props.authenticated){
      this.props.fetchTeamUsers();
      this.props.fetchCurrentUser();
      this.props.fetchNotifications();
    }
    this.startWebSocket();
  }

  componentWillReceiveProps(newProps){
    if(!this.props.authenticated && newProps.authenticated){
      this.props.fetchTeamUsers();
      this.props.fetchCurrentUser();
      this.props.fetchNotifications();
    }
  }

  startWebSocket = () => {
    const socket = new WebSocket("ws://localhost:9001");
    socket.onopen = function() {
      console.log("Connection established");
      this.props.setSystemAlert('');
    }.bind(this);
    socket.onclose = function(event) {
      this.props.setSystemAlert('Lost connection');
      setTimeout(this.startWebSocket, 3000);
    }.bind(this);
    socket.onmessage = function(event) {
      console.log("Received data ", event.data);
    };
    socket.onerror = function(error) {
      console.log("Error ", error);
    };
  }

  render(){
    const { children, authenticated, sysAlert } = this.props;
    const topPanel = authenticated ?
      <TopPanel />
      : [];
    const footer = authenticated ? <Footer /> : [];
    const linkService = authenticated ? <LinkService /> : [];

    return (
      <div className={classnames({'index-container': authenticated})}>
        <SystemAlertNotification text={sysAlert} />
        {topPanel}
        { children }
        {footer}
        {linkService}
      </div>
    );
  }
}

Layout.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  fetchTeamUsers: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  setSystemAlert: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    authenticated: state.currentUser.authenticated,
    sysAlert: state.alerts.system
  };
}

export default connect(mapStateToProps, {
  fetchTeamUsers,
  fetchCurrentUser,
  fetchNotifications,
  setSystemAlert,
})(Layout);
