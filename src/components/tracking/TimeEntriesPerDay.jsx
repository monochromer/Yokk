import React from 'react'
import { durationBeatify } from '../../helpers'
import TimeEntriesPerSource from './TimeEntriesPerSource.jsx'

class TimeEntriesPerDay extends React.Component {

  render() {
    const { sources, day } = this.props;
    let rows = [];
    for (let source in sources) {
      let duration = durationBeatify(sources[source].totalDuration, 'short');
      rows.push(
        <TimeEntriesPerSource
          source={ source }
          duration={ duration }
          timeEntries={ sources[source].list }
          key={ source }
        />
      )
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <h3>
                { day }
              </h3>
            </div>
          </div>
          { rows }
        </div>
      </div>
    )
  }
}

export default TimeEntriesPerDay;
