import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUser } from '../../actions/users';

class DeleteUserModal extends React.Component {

  state = {
    errors: {}
  }

  handleClose = (e) => {
    if(e && e.preventDefault){
      e.preventDefault();
    }
    this.props.hideModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.deleteUser(this.props.user, (err) => {
      if(err){
        this.setState({errors: err});
        return;
      }
      this.handleClose();
    });
  }

  render() {
    const {
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
                  <h2 className="heading heading__white">
                    Are you sure you want to delete {this.props.user.email} from
                    your company?
                  </h2>
                </div>
              </div>
              <form onSubmit={ this.handleSubmit }>
                {errors.form && <div className="form-error">{errors.form}</div>}
                <div className="row marginTop">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn__blue btn__lg linkService_btn"
                    >Delete</button>
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

DeleteUserModal.PropTypes = {
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(null, { deleteUser })(DeleteUserModal);
