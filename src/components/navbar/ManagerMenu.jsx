import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

class ManagerMenu extends React.Component {

  render() {
    return (
      <div className="top-panel">
        <div className="top-panel_manager-menu">
          <ul>
            <li>
              <div
                className="top-panel_manager-menu-close"
                onClick={this.props.hideManagerMenu}
              >
                <span className="glyphicons glyphicons-chevron-left"></span>
              </div>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/teams"
              >
                <span className="glyphicons glyphicons-building"></span>{" "}
                Create new company
              </Link>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/teams"
              >
                <span className="glyphicons glyphicons-group"></span>{" "}
                Create new team
              </Link>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/teams"
              >
                <span className="glyphicons glyphicons-user"></span>{" "}
                Invite new member
              </Link>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                activeClassName="active"
                to="/teams"
              >
                <span className="glyphicons glyphicons-electrical-plug"></span>{" "}
                Add plugin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ManagerMenu.PropTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default ManagerMenu;
