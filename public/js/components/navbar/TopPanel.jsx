import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class TopPanel extends React.Component {
    render() {
        return (
            <div className="top-panel">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"><a href="" className="top-panel_logo">Eye of Providence</a></div>
                        <div className="col-md-4">
                            <ul>
                                <li><Link to="/team">Team</Link></li>
                                <li><Link to="/reports">Reports</Link></li>
                            </ul>
                        </div>
                        <div className="col md-2">
                            <Link to="/tracking">Tracking</Link>
                        </div>
                        <div className="col-md-2">
                            <span>Profile</span>
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
