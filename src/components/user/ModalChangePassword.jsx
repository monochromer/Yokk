import React from 'react'
import store from '../../store'
import { connect } from 'react-redux'
import { refsToObject } from '../../helpers'
import { updateUser } from '../../actions/users'

class ModalChangePassword extends React.Component {
  getInitialState: function() {
    return {password: '', repeatPassword: '', matched: true};
  },

  validate: function() {
    let { password, repeatPassword } = this.state
    if(password === repeatPassword) {
      this.setState({matched:true});
      return true;
    } else {
      this.setState({matched:false});
      return false;
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    let data = refsToObject(this.refs);
    data.login = this.props.login;
    if(this.validate()) {
      store.dispatch(updateUser(data));
    }
  },

  handleClose: function() {
    store.dispatch({type: "MODAL_CHANGE_PASSWORD_CLOSE"});
  },

  handleChange: function(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  },

  render: function() {
    if(!this.state.matched) {
      var notification = ( <span className="help-block">Password and Repeat Password have to be matched!</span> );
    } else {
      var notification = "";
    }
    var formGroupClass = this.state.matched ? "form-group" : "form-group has-error";
    return (
      <div className={ this.props.visible ? "modal fade in visible" : "modal fade in" } tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
			  	<div className="modal-content">
            <form onSubmit={this.handleSubmit}>
  			    		<div className="modal-header">
  			    		<button type="button" className="close" onClick={ this.handleClose } aria-label="Close">
  			    			<span aria-hidden="true">&times;</span>
  			    		</button>
  			    		<h4 className="modal-title">Change password</h4>
  			    		</div>
  			    		<div className="modal-body">
                  <div className={formGroupClass}>
                    <label htmlFor="password">New password</label>
                    <input type="password" className="form-control" name="password" id="password" ref="password" onChange={this.handleChange} />
                  </div>
                  <div className={formGroupClass}>
                    <label htmlFor="repeatPassword">Repeat new password</label>
                    <input type="password" className="form-control" name="repeatPassword" id="repeatPassword" ref="repeatPassword" onChange={this.handleChange} />
                    { notification }
                  </div>
  			    		</div>
  			    		<div className="modal-footer">
  			    		<button type="submit" className="btn btn-success">Change Password</button>
  			    		<button type="button" className="btn btn-default" onClick={ this.handleClose }>Cancel</button>
  			    		</div>
            </form>
			  	</div>
			  	</div>
			</div>
    )
  }
}

const getProps = function(store) {
  return {
    visible: store.modals.userChangePassword.visible,
  }
}

export default connect(getProps)(ModalChangePassword)
