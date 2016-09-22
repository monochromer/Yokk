import React from 'react';
import { Link } from 'react-router'

var UserRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td><Link  to={ '/user/' + this.props.name }>{ this.props.name }</Link></td>
				<td>{ this.props.position }</td>
				<td>{ this.props.joinedOn }</td>
				<td>Some actions...</td>
			</tr>	
		)
	}
})

export default UserRow