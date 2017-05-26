import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../UI.jsx';
import validator from 'validator';

class InviteMemberModal extends React.Component {

  state = {
    email: '',
    role: '',
    errors: {}
  }

  handleClose = (e) => {
    if(e && e.preventDefault){
      e.preventDefault();
    }
    this.props.hideModal();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!validator.isEmail(this.state.email)){
      this.setState({errors: {email: 'Invalid E-mail'}});
      return;
    }
    this.setState({errors: {}});
    this.props.inviteMember(this.state, (err) => {
      if(err){
        this.setState({errors: err});
        return;
      }
      this.handleClose();
    });
  }

  render() {
    const {
      email,
      role,
      errors
    } = this.state;

    return (
      <div className="modal">
        <div className="modal_close" onClick={ this.handleClose }></div>
        <div className="container">
          <div className="row center-md vertical-center modal_row">
            <div className="col-md-6">
              <div className="row text-center">
                <div className="col-md-12 text-center">
                  <h2 className="heading heading__white">Invite new member</h2>
                </div>
              </div>
              <form onSubmit={ this.handleSubmit }>
                <div className="row marginTop">
                  <div className="col-md-12">
                    <Input
                      handleChange={ this.handleChange }
                      defaultValue={ email }
                      error={ errors.email }
                      className="input-group input-group__grey-white"
                      name="email"
                      label="Email *"
                      type="email"
                    />
                    <Input
                      handleChange={ this.handleChange }
                      defaultValue={ role }
                      error={ errors.role }
                      className="input-group input-group__grey-white"
                      name="role"
                      label="Role *"
                      type="role"
                    />
                  </div>
                </div>
                {errors.form && <div className="form-error">{errors.form}</div>}
                <div className="row marginTop">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn__blue btn__lg linkService_btn"
                    >Send invite</button>
                    <button
                      type="submit"
                      className="btn btn__white btn__lg linkService_btn"
                      onClick={this.handleClose}
                    >Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

InviteMemberModal.PropTypes = {
  inviteMember: PropTypes.func.isRequired
}

export default InviteMemberModal;
