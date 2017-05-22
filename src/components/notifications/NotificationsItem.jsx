import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';

class NotificationsItem extends React.Component {

  render(){
    const { notification, users } = this.props;
    const avatar = notification.targetType === 'user' ?
      <img
        src={users[notification.targetId].profileImg.small}
        className="img-circle"
        width="40px"
        height="40px"
        alt="profile"
      />
      : <div className="img-circle">T</div>;
    const link = `/${notification.targetType}/${notification.targetId}`;
    return (
      <Link to={link}>
        <div className={"row notifications-item " + (notification.new ? 'new' : '')}>
          <div className="col-md-1 text-cetner">{avatar}</div>
          <div className="col-md-9">{notification.text}</div>
          <div className="col-md-2">{moment(notification.date).format('L')}</div>
        </div>
      </Link>
    )
  }
}

NotificationsItem.propTypes = {
	notification: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired
}

export default NotificationsItem;
