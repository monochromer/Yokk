import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../../actions/currentUser';

class TopPanel extends React.Component {
	
    logout = (e) => {
        e.preventDefault();
        this.props.logout();
        window.location.reload();
    }

    render() {
        let photo = "";

        if(this.props.user.profileImg) {
            photo = <img src={ this.props.user.profileImg.small } className="img-circle" width="34px" height="34px" alt="user" />
        }
        return (
            <div className="top-panel">
                <div className="row top-panel_row">
                    <div className="col-md-4">
                        <a href="/" className="top-panel_logo">Eye of Providence</a>
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
                        <Link className="tracking-block_link" to="/">
                            <div className="tracking-block">
                                <span>Tracking</span>
                            </div>
                        </Link>

                        <div className="profile-block">
                            { photo }
                            <Link to={ "/user/edit/" + this.props.user.login }>{ this.props.user.login }</Link>
                        </div>

                        <a href="#" onClick={this.logout} className="top-panel_logout">Logout</a>

                    </div>
                </div>
            </div>

        )
    }
}

const getProps = function(store) {
    return {
        user: store.currentUser.data
    }
};

export default connect(getProps, { logout })(TopPanel);
