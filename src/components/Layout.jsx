import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopPanel from './navbar/TopPanel.jsx'
import Footer from './footer/Footer.jsx'
import { fetchUsers } from '../actions/users.js'
import { fetchCurrentUser } from '../actions/currentUser.js'
import { fetchNotifications } from '../actions/notifications'
import { setSystemAlert } from '../actions/alerts'
import SystemAlertNotification from './SystemAlertNotification.jsx'
import { isEmpty } from 'lodash';

class Layout extends React.Component {

  componentWillMount() {
    if(this.props.authenticated){
      this.props.fetchUsers();
      this.props.fetchCurrentUser();
      this.props.fetchNotifications();
    }
    this.startWebSocket();
  }

  componentWillReceiveProps(newProps){
    if(!this.props.authenticated && newProps.authenticated){
      this.props.fetchUsers();
      this.props.fetchCurrentUser();
      this.props.fetchNotifications();
      this.webSocket.send('Bearer ' + localStorage.jwtToken);
    }
  }

  startWebSocket = () => {
    const hostname = window.location.hostname;
    const socket = new WebSocket(`ws://${hostname}:9001`);
    this.webSocket = socket;
    socket.onopen = function() {
      console.log("Connection established");
      socket.send('Bearer ' + localStorage.jwtToken);
      if(this.props.sysAlert !== ''){
        this.props.setSystemAlert('');
      }
    }.bind(this);
    socket.onclose = function(event) {
      if(this.props.sysAlert !== 'Lost connection'){
        this.props.setSystemAlert('Lost connection');
      }
      setTimeout(this.startWebSocket, 3000);
    }.bind(this);
    socket.onmessage = function(event) {
      switch(event.data){
        case 'fetch_user':
          this.props.fetchCurrentUser();
          break;
        case 'fetch_notifications':
          this.props.fetchNotifications();
          break;
        default:
          console.log('Received message',event.data);
      }
    }.bind(this);
    socket.onerror = function(error) {
      console.log("Error ", error);
    };
  }

  render(){
    const { children, authenticated, sysAlert, users } = this.props;
    if(authenticated){
      if(isEmpty(users)){
        return(
          <div>Loading data...</div>
        );
      }
      return(
        <div className='index-container'>
          <SystemAlertNotification text={sysAlert} />
          <TopPanel />
          { children }
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <SystemAlertNotification text={sysAlert} />
        { children }
      </div>
    );
  }
}

Layout.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  setSystemAlert: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    authenticated: state.currentUser.authenticated,
    sysAlert: state.alerts.system,
    users: state.users
  };
}

export default connect(mapStateToProps, {
  fetchUsers,
  fetchCurrentUser,
  fetchNotifications,
  setSystemAlert,
})(Layout);
