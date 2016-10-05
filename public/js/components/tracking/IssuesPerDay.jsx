import React from 'react'
import IssueRow from './IssueRow.jsx'

var IssuesPerDay = React.createClass({
    render: function() {
        var rows = [];
        this.props.issues.map( (issue) => {
            rows.push(<IssueRow issue={ issue } key={ issue._id } />);
        });
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row day">
                        <div className="col-md-4 day__date">
                            <h3>{ this.props.day } &nbsp;
                                <span className="day__total-duration">
                                    { this.props.duration }</span>
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <td className="issue__source"></td>
                                        <td className="issue__description">Task</td>
                                        <td>Duration</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    { rows }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default IssuesPerDay;
