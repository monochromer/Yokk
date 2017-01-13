import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal'
import _ from 'lodash'
import {Input} from '../UI.jsx'

export default class InviteToTeam extends Component {

  state = {
    rows: 2,
    invitations: []
  }

  static PropTypes = {
    modalIsOpen: PropTypes.array.isRequired,
    addMembers: PropTypes.func.isRequired
  }

  handleChange = e => {
    const {name, value} = e.target
    this.state.invitations[name] = value
  }

  sendInvitations = e => {
    e.preventDefault()
    // send invitations throught server
    // store.dispatch(step5(this.props.teamName, this.state.invitations))
  }

  addInvitation = () => {
    this.setState({
      rows: this.state.rows + 1
    })
  }

  render() {
    const {modalIsOpen, addMembers} = this.props

    const {addInvitation, handleChange, sendInvitations} = this

    const {rows, invitations} = this.state

    let invitationRows = []

    for (var i = 0; i < rows; i++) {
      invitationRows.push(
        <div className="row center-xs invintations_row" key={_.uniqueId()}>
          <div className="col-md-6 col-sm-8 col-xs-10">
            <Input
              handleChange={handleChange}
              defaultValue={invitations[i]}
              className="input-group input-group__grey"
              type="email"
              name={i}
              label="E-mail"/>
          </div>
        </div>
      );
    }

    return (
      <Modal isOpen={modalIsOpen} contentLabel="Modal" onRequestClose={sendInvitations}>
        <div style={{
          textAlign: 'right'
        }}>
          <button onClick={addMembers('foo')}>X</button>
        </div>
        <div className="container">
          <div className="row center-xs step__heading">
            <div className="col-md-12 col-sm-12 col-xs-10">
              <h1 className="heading">Send Invitations</h1>
            </div>
          </div>
          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>Your team is ready to go. Know a few friends or coworkers
                <br/>
                who’d like to explore Eye of Providence with you.</p>
            </div>
          </div>

          {invitationRows.map((o) => o)
}

          <div className="row center-xs">
            <div className="col-md-3 col-sm-3 col-xs-6">
              <div className="btn btn_link btn_white" onClick={addInvitation}>+ Add another invitations
              </div>
            </div>
          </div>

          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button className="btn btn__lg btn__blue team-create__create" onClick={sendInvitations}>Send Invitations
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
