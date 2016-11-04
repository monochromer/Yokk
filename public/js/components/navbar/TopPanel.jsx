import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class TopPanel extends React.Component {
    render() {
        return (
            <div className="top-panel">
                <div className="container top-panel_container">
                    <div className="row top-panel_row">
                        <div className="col-md-4">
                            <a href="" className="top-panel_logo">Eye of Providence</a>
                        </div>
                        <div className="col-md-4">
                            <ul className="top-panel_menu">
                                <li className="top-panel_menu-item">
                                    <Link className="top-panel_menu-link" activeClassName="top-panel_menu-link__active"
                                          to="/users">Team</Link>
                                </li>
                                <li className="top-panel_menu-item">
                                    <Link className="top-panel_menu-link" activeClassName="top-panel_menu-link__active"
                                          to="/reports">Reports</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-md-offset-1 tracking-item">
                            <Link className="tracking-block_link" to="/tracking">
                                <div className="tracking-block">
                                    <span>Tracking</span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-1">
                            <div className="profile-block">
                                <img src="/img/max@3x.png" alt="maxim"/>
                                <div className="dropdown">
                                    <div className="dropdown-title ">
                                        { this.props.login }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const getProps = function (store) {
    return {
        login: store.currentUser.login
    }
};

export default connect(getProps)(TopPanel);
