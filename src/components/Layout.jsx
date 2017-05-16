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

class Layout extends React.Component {

  componentWillMount() {
    if(this.props.authenticated){
      this.props.fetchTeamUsers();
      this.props.fetchCurrentUser();
      this.props.fetchNotifications();
    }
    const socket = new WebSocket("ws://localhost:9001");
    socket.onopen = function() {
      console.log("Connection established");
    };
    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('Connection closed clean');
      } else {
        console.log('Lost connection');
      }
      console.log('Code: ' + event.code + ' reason: ' + event.reason);
    };
    socket.onmessage = function(event) {
      console.log("Received data " + event.data);
    };
    socket.onerror = function(error) {
      console.log("Error " + error.message);
    };
  }

  componentWillReceiveProps(newProps){
    if(!this.props.authenticated && newProps.authenticated){
      this.props.fetchTeamUsers();
      this.props.fetchCurrentUser();
      this.props.fetchNotifications();
    }
  }

  render(){
    const { children, authenticated } = this.props;
    const topPanel = authenticated ?
      <TopPanel />
      : [];
    const footer = authenticated ? <Footer /> : [];
    const linkService = authenticated ? <LinkService /> : [];

    return (
      <div className={classnames({'index-container': authenticated})}>
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
}

function mapStateToProps(state) {
  return {
    authenticated: state.currentUser.authenticated
  };
}

export default connect(mapStateToProps, {
  fetchTeamUsers,
  fetchCurrentUser,
  fetchNotifications,
})(Layout);
