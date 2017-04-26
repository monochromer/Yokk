import React from 'react';
import { connect } from 'react-redux';

class EnsureLoggedInContainer extends React.Component {
  
  componentDidMount() {
    const { authenticated, router } = this.props;

    if (!authenticated) {
      router.push("/registration");
    }
  }

  render() {
    const { authenticated, children } = this.props;
    
    if (authenticated) {
      return children;
    } else {
      return null;
    }
  }
}

EnsureLoggedInContainer.propTypes = {
	authenticated: React.PropTypes.bool.isRequired
}

EnsureLoggedInContainer.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		authenticated: state.currentUser.authenticated
	};
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)