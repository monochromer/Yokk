import React from 'react'
import TopPanel from './navbar/TopPanel.jsx'
import Footer from './footer/Footer.jsx'
import store from '../store.js'
import { fetchTeamUsers } from '../actions/users.js'
import { fetchCurrentUser } from '../actions/currentUser.js'

class Layout extends React.Component {

    componentWillMount() {
        store.dispatch(fetchTeamUsers());
        store.dispatch(fetchCurrentUser());
    }

    render() {
        return (
            <div className="index-container">
                <TopPanel location={this.props.location.pathname}/>
                { this.props.children }
                <Footer />
            </div>
        );
    }
}

export default Layout
