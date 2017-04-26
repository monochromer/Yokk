import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {Input} from '../UI.jsx'
import {addTeamMembers, closeAddTeamMembersModal} from '../../actions/teams'
import _ from 'lodash'

class AddUsersModal extends React.Component {

  state = {
    rows: 1,
    invitations: [],
    teamId: ""
  }

  handleClose = () => {
    this.props.closeAddTeamMembersModal()
  }

  handleChange = e => {
    this.state.invitations[e.target.name] = e.target.value;
  }

  handleSubmit = teamId => e => {
    e.preventDefault()
    const {invitations} = this.state
    const {teamId, companyId} = this.props
    this.props.addTeamMembers(teamId, invitations, companyId)
    this.props.closeAddTeamMembersModal()
  }

  addInvitation = () => {
    this.setState({
      rows: this.state.rows + 1
    });
  }

  render() {
    const {teamId} = this.props
    const modalClasses = classNames({
      modal: true,
      hide: !this.props.status
    });

    var invitationRows = [];
    for (let i = 0; i < this.state.rows; i++) {
      invitationRows.push(
        <div className="row center-xs invintations_row" key={_.uniqueId()}>
          <div className="col-md-8 col-sm-8 col-xs-10">
            <Input
              handleChange={this.handleChange}
              defaultValue={this.state.invitations[i]}
              className="input-group input-group__grey-white"
              type="email"
              name={i}
              label="E-mail"/>
          </div>
        </div>
      );
    }

    return (
      <div className={modalClasses}>
        <div className="modal_close" onClick={this.handleClose}></div>
        <div className="container">
          <div className="row center-md vertical-center modal_row">
            <div className="col-md-6">
              <div className="row text-center">
                <div className="col-md-12 text-center">
                  <h2 className="heading heading__white">Send Invitations</h2>
                </div>
              </div>
              <form onSubmit={this.handleSubmit(teamId)}>

                {invitationRows}

                <div className="row center-xs">
                  <div className="col-md-12">
                    <div className="btn link__white" onClick={this.addInvitation}>+ Add another invitations
                    </div>
                  </div>
                </div>

                <div className="row marginTop">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn__blue btn__lg linkService_btn">Send</button>
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

export default connect(({modals, users, currentUser}) => ({
  status: modals.userAdd.visible, users: users.list, login: currentUser.login, teamId: modals.teamId
}), {addTeamMembers, closeAddTeamMembersModal})(AddUsersModal)
