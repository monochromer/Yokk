import React from 'react'
import Alert from './Alert.jsx'
import ModalUserDelete from './ModalUserDelete.jsx'
import TopPanel from './TopPanel.jsx'
import store from '../store.js'

import { fetchUsers } from '../actions/users.js'
import { fetchCurrentUser } from '../actions/currentUser.js'
import { fetchIssues } from '../actions/issues.js'


var Layout = React.createClass({

    componentWillMount: function() {
        store.dispatch(fetchUsers());
        store.dispatch(fetchCurrentUser());
        store.dispatch(fetchIssues());
    },

    render: function() {
        return (
            <div>
                <TopPanel/>
                <div className="container-fluid">
                    <Alert/>
                    <ModalUserDelete/> { this.props.children }
                </div>
            </div>
        )
    }
});

export default Layout
