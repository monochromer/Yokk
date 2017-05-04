import React from 'react'
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TopPanel from './navbar/TopPanel.jsx'
import Footer from './footer/Footer.jsx'
import LinkService from './linkService/LinkService.jsx'
import store from '../store.js'
import { fetchTeamUsers } from '../actions/users.js'
import { fetchCurrentUser } from '../actions/currentUser.js'

class Layout extends React.Component {

  componentWillMount() {
    if(this.props.authenticated){
      store.dispatch(fetchTeamUsers());
      store.dispatch(fetchCurrentUser());
    }
  }
  
  componentWillReceiveProps(newProps){
    if(!this.props.authenticated && newProps.authenticated){
      store.dispatch(fetchTeamUsers());
      store.dispatch(fetchCurrentUser());
    }
  }

  onCreateNewCompany = () => {
    store.dispatch({ type: 'MODAL_NEW_COMPANY_OPEN' });
  }
    
  render(){
    const { location, children, authenticated } = this.props;
    const topPanel = authenticated ?
      <TopPanel
        location={location.pathname}
        onCreateNewCompany={this.onCreateNewCompany}
       />
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
	authenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return {
		authenticated: state.currentUser.authenticated
	};
}

export default connect(mapStateToProps)(Layout);
