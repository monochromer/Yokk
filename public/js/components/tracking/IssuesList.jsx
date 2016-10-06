import React from 'react'
import IssuesPerDay from './IssuesPerDay.jsx'
import store from '../../store'
import moment from 'moment'
import { fetchIssues, fetchRedmineIssues } from '../../actions/issues'
import { connect } from 'react-redux'
import { dayBeatify, durationBeatify, groupIssuesByDay } from '../../helpers'

var IssuesList = React.createClass({
    getInitialState: function() {
        return {
            from: 5
        }
    },

    componentWillMount: function() {
        let from = moment().subtract(this.state.from, 'days').format("DD.MM.YYYY");
        store.dispatch(fetchIssues(from));
    },

    loadMore: function() {
        let from = moment().subtract(this.state.from + 10, 'days').format("DD.MM.YYYY");
        store.dispatch(fetchIssues(from));
        this.setState({ from: this.state.from + 10 });
    },

    render: function() {
        const { days } = this.props;
        var rows = [];
        for( var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<IssuesPerDay day={ day } duration={ duration } issues={ days[day].list } key={ day } />)
        }
        return (
            <div>
                { rows }
                <button className="btn btn-success center-block loadmore" onClick={ this.loadMore }> Load More </button>
            </div>
        )
    }
});

var getProps = function(state) {
    return {
        days: groupIssuesByDay(state.issues)
    }
}

export default connect(getProps)(IssuesList)
