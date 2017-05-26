import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../UI.jsx';

class ChangePasswordModal extends React.Component {

  state = {
    passwordOld: '',
    passwordNew: '',
    passwordRepeat: '',
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
    this.props.updateUser(this.props.user._id, this.state, (err) => {
      if(err){
        this.setState({errors: err});
        return;
      }
      this.handleClose();
    });
  }

  render() {
    const {
      passwordOld,
      passwordNew,
      passwordRepeat,
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
                  <h2 className="heading heading__white">Change password</h2>
                </div>
              </div>
              <form onSubmit={ this.handleSubmit }>
                <div className="row marginTop">
                  <div className="col-md-12">
                    <Input
                      handleChange={ this.handleChange }
                      defaultValue={ passwordOld }
                      error={ errors.passwordOld }
                      className="input-group input-group__grey-white"
                      name="passwordOld"
                      label="Old password *"
                      type="password"
                    />
                    <Input
                      handleChange={ this.handleChange }
                      defaultValue={ passwordNew }
                      error={ errors.passwordNew }
                      className="input-group input-group__grey-white"
                      name="passwordNew"
                      label="New password *"
                      type="password"
                    />
                    <Input
                      handleChange={ this.handleChange }
                      defaultValue={ passwordRepeat }
                      error={ errors.passwordRepeat }
                      className="input-group input-group__grey-white"
                      name="passwordRepeat"
                      label="Repeat new password *"
                      type="password"
                    />
                  </div>
                </div>
                {errors.form && <div className="form-error">{errors.form}</div>}
                <div className="row marginTop">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn__blue btn__lg linkService_btn"
                    >Change</button>
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

ChangePasswordModal.PropTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

export default ChangePasswordModal;
