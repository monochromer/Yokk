import React from 'react'
import store from '../../store'
import { fetchRedmineIssues } from '../../actions/issues'

var SyncRedmine = React.createClass({
    sync: function(event) {
        event.preventDefault();
        store.dispatch(fetchRedmineIssues());
    },

    render: function() {
        return <button onClick={this.sync}>Sync Redmine</button>
    }
});

export default SyncRedmine
