import React from 'react'
import IssuesPerDay from './IssuesPerDay.jsx'
import store from '../../store'
import moment from 'moment'
import {fetchIssues, fetchRedmineIssues, fetchNextBatch} from '../../actions/issues'
import {connect} from 'react-redux'
import {dayBeatify, durationBeatify, groupIssuesByDay} from '../../helpers'

var IssuesList = React.createClass({
    getInitialState: function() {
        // return {from: 5}
        return {skip: 0, limit: 20}
    },

    componentWillMount: function() {
        let from = moment().subtract(this.state.from, 'days').format("DD.MM.YYYY");
        let skip = this.state.skip;
        let limit = this.state.limit;
        // store.dispatch(fetchIssues(from));
        store.dispatch(fetchNextBatch(skip, limit, from));
        this.setState({
            from: this.state.from + 10,
            skip: this.state.skip + this.props.offset
        });
    },

    loadMore: function() {

        // as of now from parameter is not being used
        let from = moment().subtract(this.state.from + 10, 'days').format("DD.MM.YYYY");
        let skip = this.state.skip;
        let limit = this.state.limit;
        store.dispatch(fetchNextBatch(skip, limit, from));
        this.setState({
            from: this.state.from + 10,
            skip: this.state.skip + this.props.offset
        });
    },

    render: function() {
        const {days} = this.props;
        var rows = [];
        for (var day in days) {
            var duration = durationBeatify(days[day].totalDuration);
            rows.push(<IssuesPerDay day={day} duration={duration} issues={days[day].list} key={day}/>)
        }
        return (
            <div>
                {rows}
                <button className="btn btn-success center-block loadmore" onClick={this.loadMore}>
                    Load More
                </button>
            </div>
        )
    }
});

var getProps = function(state) {
    return {
        days: groupIssuesByDay(state.issues),
        offset: state.issues.length
    }
}

export default connect(getProps)(IssuesList)
