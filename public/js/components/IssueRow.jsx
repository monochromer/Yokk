import React from 'react';
import { Link } from 'react-router';
import store from '../store.js';


var IssueRow = React.createClass({

	render: function() {

		return (
			<tr>
				<td>{ this.props.issue.id }</td>
				<td>{ this.props.issue.estimated_hours}</td>
			</tr>
		)
	}
})

export default IssueRow
