import React from 'react'
import store from '../../store'
import { fetchIssues } from '../../actions/issues'
import { connect } from 'react-redux'

var IssuesList = React.createClass({
    componentWillMount: function() {
        store.dispatch(fetchIssues());
    },
    render: function() {
        return (
            <div>
                {
                    this.props.issues.map( (day) => {
                        return <IssuesPerDay issues={ day.list } totalDuration={ day.totalDuration } />
                    })
                }
            </div>
        )
    }
});

var getProps = function(store) {
        return {
            issues: store.issues.list
        }
}

export default connect(getProps)(IssuesList)
