import React from 'react'
import TimeEntryRow from './TimeEntryRow.jsx'

class TimeEntriesPerDay extends React.Component {

  render() {
    let rows = this.props.timeEntries.map( (timeEntry) => {
      return(<TimeEntryRow timeEntry={ timeEntry } key={ timeEntry._id } />);
    });

    return (
      <div className="row">
        <div className="col-md-12 tracking-day">
          <div className="row tracking-day_row">
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <h3>
                <span>
                  { this.props.day }
                </span>
                <span className="tracking-day_duration">
                  { this.props.duration }
                </span>
              </h3>
            </div>
          </div>
          <div className="row tracking-table tracking-table_head">
            <div className="col-md-1"></div>
            <div className="col-md-9 tracking-table_heading">Description</div>
            <div className="col-md-1 tracking-table_heading">Time</div>
            <div className="col-md-1 tracking-table_heading"></div>
          </div>
          { rows }
        </div>
      </div>
    )
  }
}

export default TimeEntriesPerDay;
