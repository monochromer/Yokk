import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

class UserMenu extends React.Component {

  render() {
    const { notifications } = this.props;

    let mappedNotifications = [];
    for(let i = 0; i < notifications.length && i < 5; i++){
      const el = notifications[notifications.length - 1 - i];
      mappedNotifications.push(
        <div key={el._id} className={"dropdown-element " + (el.new ? 'new' : '')}>
          <div className="new-notification-circle"></div>
          <Link to={el.link}>{el.text}</Link>
        </div>
      );
    }

    return (
      <div className="dropdown">
        {mappedNotifications}
        <div className="text-center">
          <Link to="/notifications">&gt;&gt; View All &lt;&lt;</Link>
        </div>
      </div>
    )
  }
}

UserMenu.PropTypes = {
  notifications: PropTypes.array.isRequired
}

export default UserMenu;
