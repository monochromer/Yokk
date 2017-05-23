import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { hideModal } from '../../actions/modals'
import { Input } from '../UI.jsx'
import { createCompany } from '../../actions/registration'

class AddTeamModal extends React.Component {

  state = {
    name: '',
    error: ''
  }

  handleClose = () => {
    this.props.hideModal();
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTeam(this.state.name);
  }

  render() {
    const { name, error } = this.state;

    return (
      <div className="modal">
        <div className="modal_close" onClick={ this.handleClose }></div>
        <div className="container">
          <div className="row center-md vertical-center modal_row">
            <div className="col-md-6">
              <div className="row text-center">
                <div className="col-md-12 text-center">
                  <h2 className="heading heading__white">New team</h2>
                </div>
              </div>
              <form onSubmit={ this.handleSubmit }>
                <div className="row marginTop">
                  <div className="col-md-12">
                    <Input
                      handleChange={ this.handleChange }
                      defaultValue={ name }
                      error={ error }
                      className="input-group input-group__grey-white"
                      name="name"
                      label="Name"/>
                  </div>
                </div>
                <div className="row marginTop">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn__blue btn__lg linkService_btn">Create</button>
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

export default connect(null, { hideModal })(AddTeamModal)
