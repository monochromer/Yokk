import React from 'react';
import store from '../store.js';
import { connect } from 'react-redux';
import { deleteUser } from '../actions/crudUser.js';

var ModalUserDelete = React.createClass({
	handleDelete: function() {
		store.dispatch( deleteUser(this.props.login) );
	},

	handleClose: function() {
		store.dispatch({ type: "MODAL_DELETE_CLOSE" });
	},

	render: function() {
		return (
			<div className={ this.props.visible ? "modal fade in visible" : "modal fade in" } tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<button type="button" className="close" onClick={ this.handleClose } aria-label="Close">
			        			<span aria-hidden="true">&times;</span>
			        		</button>
			        		<h4 className="modal-title">Delete { this.props.login }</h4>
			      		</div>
			      		<div className="modal-body">
			        		<p>Do you really want to delete { this.props.login } ?</p>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" className="btn btn-danger" onClick={ this.handleDelete }>Delete</button>
			        		<button type="button" className="btn btn-default" onClick={ this.handleClose }>Cancel</button>
			      		</div>
			    	</div>
			  	</div>
			</div>
		)
	}
});

var getProps = function(store) {
	return {
		visible: store.modalDelete.visible,
		login: store.modalDelete.login
	}
}

export default connect(getProps)(ModalUserDelete);