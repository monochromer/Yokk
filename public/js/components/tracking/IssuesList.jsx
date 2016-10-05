import React from 'react'
import IssuesPerDay from './IssuesPerDay.jsx'
import store from '../../store'
import moment from 'moment'
import { fetchIssues } from '../../actions/issues'
import { connect } from 'react-redux'
import { dayBeatify, durationBeatify, groupIssuesByDay } from '../../helpers'

var IssuesList = React.createClass({
    componentWillMount: function() {
        store.dispatch(fetchIssues());
    },

    render: function() {
        const { issues } = this.props;
        var days = groupIssuesByDay(issues);
        var rows = [];

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
        return {
            issues: state.issues
        }
}

export default connect(getProps)(IssuesList)
