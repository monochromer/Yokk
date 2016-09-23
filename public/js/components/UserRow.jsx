import React from 'react';
import { Link } from 'react-router'

var UserRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td><Link  to={ '/user/' + this.props.name }>{ this.props.name }</Link></td>
				<td>{ this.props.position }</td>
				<td>{ this.props.joinedOn }</td>
				<td>
					<div className="btn-group" role="group">
						<Link  to={ '/user/edit/' + this.props.name } className="btn btn-warning">Edit</Link>
						<button className="btn btn-danger">Remove</button>
					</div>	
				</td>
			</tr>	
		)
	}
})

export default UserRow