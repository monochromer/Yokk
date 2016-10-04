import React from 'react'

var IssueRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{ this.props.issue.taskSource }</td>
                <td>{ this.props.issue.description }</td>
                <td>{ this.props.issue.duration }</td>
                <td>
                    <button type="button" className="btn btn-default btn-xs" style={{"marginRight": "5px"}}>
                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                    </button>
                    <button type="button" className="btn btn-default btn-xs">
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>
        )
    }
})

export default IssueRow
