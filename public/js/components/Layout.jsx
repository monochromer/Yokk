import React from 'react'
import Alert from './alert/Alert.jsx'
import ModalUserDelete from './user/ModalUserDelete.jsx'
import TopPanel from './navbar/TopPanel.jsx'
import store from '../store.js'

import { fetchUsers } from '../actions/users.js'
import { fetchCurrentUser } from '../actions/currentUser.js'

class Layout extends React.Component {

    componentWillMount() {
        store.dispatch(fetchUsers());
        store.dispatch(fetchCurrentUser());
    }

    render() {
        return (
            <div>
                <TopPanel/>
                <div className="container-fluid">
                    <Alert/>
                    <ModalUserDelete/> { this.props.children }
                </div>
            </div>
        );
    }
}

export default Layout
