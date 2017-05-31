import React from 'react';
import TimeEntryRow from './TimeEntryRow.jsx';
import { ENTRY_SOURCES } from '../../constants';

class TimeEntriesPerSource extends React.Component {

  render() {
    const { source, timeEntries, duration } = this.props;
    let rows = timeEntries.map( (timeEntry) => {
      return(<TimeEntryRow timeEntry={ timeEntry } key={ timeEntry._id } />);
    });

    return (
      <div className="row border-wrap">
        <div className="col-md-12 tracking-day">
          <div className="row entry-row vertical-center">
            <div className="col-md-1"></div>
            <div className="col-md-9">
              <span>
                { ENTRY_SOURCES[source] }
              </span>
            </div>
            <div className="col-md-2">
              <span>
                { duration }
              </span>
            </div>
          </div>
          { rows }
        </div>
      </div>
    )
  }
}

export default TimeEntriesPerSource;
