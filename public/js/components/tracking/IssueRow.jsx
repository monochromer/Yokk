import React from 'react'
import store from '../../store'
import { deleteIssue } from '../../actions/issues'
import { durationBeatify } from '../../helpers'


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

    render: function() {
        let { taskSource, description, duration } = this.props.issue;
        let buttons = (
            <div>
                <button type="button" className="btn btn-default btn-xs" onClick={ this.handleEdit } style={{"marginRight": "5px"}}>
                    <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
                <button type="button" className="btn btn-default btn-xs" onClick={ this.handleDelete }>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
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
                            : <input className="form-control" defaultValue={ durationBeatify(duration) } ref="duration" />
                    }
                </td>
                <td>
                    {
                        !this.state.editing ? buttons : ""
                    }

                </td>
            </tr>
        )
    }
})

export default IssueRow
