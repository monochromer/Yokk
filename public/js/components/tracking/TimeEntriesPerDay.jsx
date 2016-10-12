import React from 'react'
import TimeEntryRow from './TimeEntryRow.jsx'

var TimeEntriesPerDay = React.createClass({
    render: function() {
        var rows = [];
        this.props.timeEntries.map( (timeEntry) => {
            rows.push(<TimeEntryRow timeEntry={ timeEntry } key={ timeEntry._id } />);
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
                                        <td className="issue__actions">Actions</td>
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

export default TimeEntriesPerDay;