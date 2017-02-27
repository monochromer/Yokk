import React from 'react'
import TopPanel from './navbar/TopPanel.jsx'
import Footer from './footer/Footer.jsx'
import LinkService from './linkService/LinkService.jsx'
import store from '../store.js'
import { fetchTeamUsers } from '../actions/users.js'
import { fetchCurrentUser } from '../actions/currentUser.js'

class Layout extends React.Component {

    constructor(props) {
        super(props);

        this.onCreateNewCompany = this.onCreateNewCompany.bind(this);
    }

    componentWillMount() {
        store.dispatch(fetchTeamUsers());
        store.dispatch(fetchCurrentUser());
    }

    onCreateNewCompany() {
        store.dispatch({ type: 'MODAL_NEW_COMPANY_OPEN' });
    }

    render() {
        return (
            <div className="index-container">
                <TopPanel location={ this.props.location.pathname }
                    onCreateNewCompany={ this.onCreateNewCompany }/>
                { this.props.children }
                <Footer />
                <LinkService />
            </div>
        );
    }
}

export default Layout
