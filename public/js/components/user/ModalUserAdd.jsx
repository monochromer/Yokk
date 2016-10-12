import React from 'react'
import { connect } from 'react-redux'

const ModalUserAdd = React.createClass({
    getInitialState: function() {
        return {login: '', password: '', repeatPassword: ''};
    },

    validation: function(user) {

        if (_.find(this.props.users, (o) => o.login == user.login) != undefined) {
            var text = "Login " + user.login + " is already used! Try another login."
            store.dispatch({type: "ALERT_SHOW", class: "danger", text: text});
            return false;
        }

        if (user.password <= 5) {
            var text = "Password requires more then 5 symbols!";
            store.dispatch({type: "ALERT_SHOW", class: "danger", text: text});
            return false;
        }

        if (user.password != user.repeatPassword) {
            var text = "Password and Repeat Password don't match!";
            store.dispatch({type: "ALERT_SHOW", class: "danger", text: text});
            return false;
        }

        return true;
    },

    handleSubmit: function(event) {
        event.preventDefault();

        var user = refsToObject(this.refs);

        if (this.validation(user)) {
            store.dispatch(addUser(user));
        }
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
			        		<h4 className="modal-title">Add new user</h4>
			      		</div>
			      		<div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="login">Login</label>
                                    <input type="text" className="form-control" id="login" ref="login" placeholder="username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" ref="password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="repeatPassword">Repeat password</label>
                                    <input type="password" className="form-control" id="repeatPassword" ref="repeatPassword"/>
                                </div>
                                <button type="submit" className="btn btn-default">Add User</button>
                            </form>
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
})

const getProps = function(store) {
    return {
        visible: store.modals.userAdd.visible,
        users: store.users
    }
}

export default connect(getProps)(ModalUserAdd)
