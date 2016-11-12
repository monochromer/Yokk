import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class TopPanel extends React.Component {
    render() {
        const photo = this.props.user.profileImg ? this.props.user.profileImg.small : "";
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
                        <div className="col-md-4 text-right tracking-item">
                            <div className="row vertical-center">
                                <div className="col-md-5">
                                    <Link className="tracking-block_link" to="/">
                                        <div className="tracking-block">
                                            <span>Tracking</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-5">
                                    <div className="profile-block">
                                        <img src={ photo } alt="maxim" className="img-circle" width="34px" height="34px"/>
                                        <div className="dropdown">
                                            <div className="dropdown-title ">
                                                <Link to={ "/user/edit/" + this.props.user.login }>{ this.props.user.login }</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <a href="/logout">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const getProps = function(store) {
    return {
        user: store.currentUser
    }
};

export default connect(getProps)(TopPanel);
