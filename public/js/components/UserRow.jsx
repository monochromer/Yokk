import React from 'react'

var UserRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{ this.props.fullname }</td>
				<td>{ this.props.position }</td>
				<td>{ this.props.joinedOn }</td>
				<td>Some actions...</td>
			</tr>	
		)
	}
})

export default UserRow