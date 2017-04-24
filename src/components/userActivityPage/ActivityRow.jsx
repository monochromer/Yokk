import React from 'react';
import { durationBeatify } from '../../helpers';

class ActivityRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };

    }

    render() {
        let { entrySource, description, duration, number } = this.props.timeEntry;
        duration = durationBeatify(duration, 'short');
        if (entrySource === "redmine") {
            let link = `http://redmine.soshace.com/issues/number${number}`;

            description = (
                <span>
                    <a href={ link }>issue { number }</a> &nbsp;
                    { description }
                </span>
            );
        }

        const sourceIcon = entrySource === "redmine" ?
          <img src="/img/redmine-active.svg" width="40px" alt="redmine icon" /> : [];

        return (
            <div className="row entry-row vertical-center">
                <div className="col-md-1 text-center">{ sourceIcon }</div>
                <div className="col-md-9 entry-row_description">{ description }</div>
                <div className="col-md-1">{ duration }</div>
                <div className="col-md-1"></div>
            </div>
        )
    }
}

export default ActivityRow;
