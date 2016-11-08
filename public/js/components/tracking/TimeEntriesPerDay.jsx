import React from 'react'
import TimeEntryRow from './TimeEntryRow.jsx'

class TimeEntriesPerDay extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                            <table className="table table-striped timeEntries">
                                <thead>
                                    <tr>
                                        <th className="timeEntries__head issue__source"></th>
                                        <th className="timeEntries__head issue__description">Task</th>
                                        <th className="timeEntries__head issue__duration">Duration</th>
                                        <th className="timeEntries__head issue__actions">Actions</th>
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
}

export default TimeEntriesPerDay;
