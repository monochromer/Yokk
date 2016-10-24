import React from 'react';
import store from '../../store';
import InputElement from 'react-input-mask';
import moment from 'moment';
import {durationBeatify} from '../../helpers';

class ActivityRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };

    }

    render() {
        let {entrySource, description, duration, number} = this.props.timeEntry;
        if (entrySource == "redmine") {
            description = '<a href="http://redmine.soshace.com/issues/' + number + '">issue ' + number + '</a> ' + description;
        }

        const sourceIcon = entrySource == "redmine"
            ? '<span><img src="/img/redmine_fluid_icon.png" width="20px"/></span>'
            : '';
        return (
            <tr>
                <td dangerouslySetInnerHTML={{ __html: sourceIcon }}></td>
                <td>
                    {
                      !this.state.editing ? <span dangerouslySetInnerHTML={{ __html:description }}></span> : <input className="form-control" defaultValue={description} ref="description"/>
                    }
                </td>
                <td>
                    {
                      !this.state.editing ? durationBeatify(duration) : <InputElement className="form-control" mask="9:99" defaultValue={durationBeatify(duration)} ref="duration"/>
                    }
                </td>
            </tr>
        );
    }
}

export default ActivityRow;
