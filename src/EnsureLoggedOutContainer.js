import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EnsureLoggedOutContainer extends React.Component {
  
  componentDidMount() {
    const { authenticated, router } = this.props;

    if (authenticated) {
      router.push("/");
    }
  }

  render() {
    const { authenticated, children } = this.props;
    
    if (!authenticated) {
      return children;
    } else {
      return null;
    }
  }
}

EnsureLoggedOutContainer.propTypes = {
	authenticated: PropTypes.bool.isRequired
}

EnsureLoggedOutContainer.contextTypes = {
	router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		authenticated: state.currentUser.authenticated
	};
}

export default connect(mapStateToProps)(EnsureLoggedOutContainer)