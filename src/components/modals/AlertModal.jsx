import React from 'react';
import PropTypes from 'prop-types';

class AlertModal extends React.Component {

  handleClose = (e) => {
    if(e && e.preventDefault){
      e.preventDefault();
    }
    this.props.hideModal();
  }

  render() {
    const { text } = this.props;

    return (
      <div className="modal">
        <div className="modal_close" onClick={ this.handleClose }></div>
        <div className="container">
          <div className="row center-md vertical-center modal_row">
            <div className="col-md-6">
              <div className="row text-center">
                <div className="col-md-12 text-center">
                  <h2 className="heading heading__white">
                    {text}
                  </h2>
                </div>
              </div>
              <div className="row marginTop">
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn__white btn__lg linkService_btn"
                    onClick={this.handleClose}
                  >Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AlertModal.PropTypes = {
  text: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired
}

export default AlertModal;
