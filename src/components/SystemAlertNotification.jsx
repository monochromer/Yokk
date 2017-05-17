import React from 'react';
import PropTypes from 'prop-types';

class SystemAlertNotification extends React.Component {

	render() {
		const { text } = this.props;

    if(!text){
      return <div></div>
    }
		return (
			<div className="system-alert-notification">
				{text}
			</div>
		);
	}

}

SystemAlertNotification.propTypes = {
	text: PropTypes.string.isRequired
}

export default SystemAlertNotification;
