import React from 'react'
import { connect } from 'react-redux';
import classnames from 'classnames';
import TopPanel from './navbar/TopPanel.jsx'
import Footer from './footer/Footer.jsx'
import LinkService from './linkService/LinkService.jsx'

class Layout extends React.Component {
  render(){
    const { location, children, authenticated } = this.props;
    const topPanel = authenticated ? <TopPanel location={location.pathname}/> : [];
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
	authenticated: React.PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return {
		authenticated: state.currentUser.authenticated
	};
}

export default connect(mapStateToProps)(Layout);
