import React from 'react'
import InputElement from 'react-input-mask'
import moment from 'moment'
import store from '../../store'
import { deleteTimeEntry, updateTimeEntry } from '../../actions/timeEntries.js'
import { durationBeatify, refsToObject } from '../../helpers'

var ActivityRow = React.createClass({
    getInitialState: function() {
            return {
                editing: false
            }
    },

    handleDelete: function(e) {
        store.dispatch(deleteTimeEntry(this.props.timeEntry._id));
    },

    handleEdit: function() {
        this.setState({ editing: true });
    },

    handleCancel: function() {
        this.setState({ editing: false });
    },

    handleSave: function(e) {
        e.preventDefault();
        let editedTimeEntry = Object.assign({}, this.props.timeEntry, refsToObject(this.refs));
        editedTimeEntry.duration = moment.duration(editedTimeEntry.duration).asMinutes() || this.props.timeEntry.duration;
        console.log(editedTimeEntry);
        store.dispatch(updateTimeEntry(editedTimeEntry));
        this.setState({ editing: false });
    },

    render: function() {

        let { entrySource, description, duration, number } = this.props.timeEntry;
        if (entrySource == "redmine") {
            description = '<a href="http://redmine.soshace.com/issues/' + number + '">issue ' + number + '</a> ' + description;
        }

        const sourceIcon = entrySource == "redmine" ? '<span><img src="/img/redmine_fluid_icon.png" width="20px"/></span>' : '';
        return (
            <tr>
                <td dangerouslySetInnerHTML={{__html: sourceIcon}}></td>
                <td>
                    {
                        !this.state.editing
                            ? <span dangerouslySetInnerHTML={{__html: description}}></span>
                            : <input className="form-control" defaultValue={ description } ref="description" />
                     }
                </td>
                <td>
                    {
                        !this.state.editing
                            ? durationBeatify(duration)
                            : <InputElement className="form-control" mask="9:99" defaultValue={ durationBeatify(duration) } ref="duration" />
                    }
                </td>
            </tr>
        )
    }
})

export default ActivityRow
