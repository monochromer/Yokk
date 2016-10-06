import React from 'react'
import IssuesPerDay from './IssuesPerDay.jsx'
import store from '../../store'
import moment from 'moment'
import { fetchIssues, fetchRedmineIssues } from '../../actions/issues'
import { connect } from 'react-redux'
import { dayBeatify, durationBeatify, groupIssuesByDay } from '../../helpers'

var IssuesList = React.createClass({
    componentWillMount: function() {
        store.dispatch(fetchIssues());
    },

    render: function() {
        const { days } = this.props;
        var rows = [];
        console.log(days);
        for( var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<IssuesPerDay day={ day } duration={ duration } issues={ days[day].list } key={ day } />)
        }
        return (
            <div>
                { rows }
            </div>
        )
    }
});

var getProps = function(state) {
    console.log("STATE_ISSUES_IS");
    console.log(state.issues);    
    return {
        days: groupIssuesByDay(state.issues)
    }
}

export default connect(getProps)(IssuesList)
