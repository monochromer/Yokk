import React from 'react'
import store from '../../store'
import { deleteIssue, updateIssue } from '../../actions/issues'
import { durationBeatify, refsToObject } from '../../helpers'
import moment from 'moment'
import InputElement from 'react-input-mask'

var IssueRow = React.createClass({
    getInitialState: function() {
            return {
                editing: false
            }
    },

    handleDelete: function(e) {
        store.dispatch(deleteIssue(this.props.issue._id));
    },

    handleEdit: function() {
        this.setState({ editing: true });
    },

    handleCancel: function() {
        this.setState({ editing: false });
    },

    handleSave: function(e) {
        e.preventDefault();
        let editedIssue = Object.assign({}, this.props.issue, refsToObject(this.refs));
        editedIssue.duration = moment.duration(editedIssue.duration).asMinutes();
        store.dispatch(updateIssue(editedIssue));
        this.setState({ editing: false });
    },

    render: function() {
        let { taskSource, description, duration } = this.props.issue;
        let buttons = (
            <div>
                <button type="button" className="btn btn-default btn-xs issue__leftButton" onClick={ this.handleEdit }>
                    <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
                <button type="button" className="btn btn-default btn-xs" onClick={ this.handleDelete }>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
            </div>
        );
        let buttonsEditing = (
            <div>
                <button type="button" className="btn btn-default btn-xs issue__leftButton" onClick={ this.handleSave }>
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                </button>
                <button type="button" className="btn btn-default btn-xs" onClick={ this.handleCancel }>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </div>
        );
        return (
            <tr>
                <td> { taskSource } </td>
                <td>
                    {
                        !this.state.editing
                            ? description
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
                <td>
                    {
                        !this.state.editing ? buttons : buttonsEditing
                    }

                </td>
            </tr>
        )
    }
})

export default IssueRow
