import React from 'react'
import IssuesPerDay from './IssuesPerDay.jsx'
import store from '../../store'
import moment from 'moment'
import { fetchIssues } from '../../actions/issues'
import { connect } from 'react-redux'
import { dayBeatify, durationBeatify } from '../../helpers'

var IssuesList = React.createClass({
    componentWillMount: function() {
        store.dispatch(fetchIssues());
    },

    render: function() {
        const { issues } = this.props;
        var rows = [];
        for( var date in issues) {
            var day = dayBeatify(date, "DDMMYYYY");
            var duration = durationBeatify(issues[date].totalDuration);
            rows.push(<IssuesPerDay day={ day } duration={ duration } issues={ issues[date].list } key={ date } />)
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
            issues: state.issues.list
        }
}

export default connect(getProps)(IssuesList)
