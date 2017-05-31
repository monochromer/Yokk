import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { ADD_TEAM, INVITE_MEMBER } from '../../constants';

class ManagerMenu extends React.Component {

  showCreateNewTeam = (e) => {
    e.preventDefault();
    this.props.showModal(ADD_TEAM);
  }

  showInviteNewMember = (e) => {
    e.preventDefault();
    this.props.showModal(INVITE_MEMBER);
  }

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
                to="/settings#add-new-company"
              >
                <span className="glyphicons glyphicons-building"></span>{" "}
                Create new company
              </Link>
            </li>
            <li>
              <a
                className="top-panel_menu-item"
                href="#"
                onClick={this.showCreateNewTeam}
              >
                <span className="glyphicons glyphicons-group"></span>{" "}
                Create new team
              </a>
            </li>
            <li>
              <a
                className="top-panel_menu-item"
                href="#"
                onClick={this.showInviteNewMember}
              >
                <span className="glyphicons glyphicons-user"></span>{" "}
                Invite new member
              </a>
            </li>
            <li>
              <Link
                className="top-panel_menu-item"
                to="/settings#plugins"
              >
                <span className="glyphicons glyphicons-electrical-plug"></span>
                {" "}Add plugin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ManagerMenu.PropTypes = {
  hideManagerMenu: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

export default ManagerMenu;
