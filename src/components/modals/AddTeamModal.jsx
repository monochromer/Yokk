import React from 'react'
import { connect } from 'react-redux'
import { hideModal } from '../../actions/modals'
import { Input } from '../UI.jsx'
import { addTeam } from '../../actions/teams';

class AddTeamModal extends React.Component {

  state = {
    name: '',
    errors: {},
    invites: [
      {
        userId: 0,
        role: 'user'
      }
    ]
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
    const { name, errors, invites } = this.state;
    const { users } = this.props;
    const userOptions = [];
    for(let userId in users){
      const user = users[userId];
      userOptions.push(
        <option key={user._id} value={user._id}>
          {user.firstName + " " + user.lastName}
        </option>
      );
    }

    const invitationRows = invites.map((invite, index) => {
      return(
        <div className="row marginTop" key={index}>
          <div className="col-md-6 input-group">
            <select
              value={invite.userId}
              onChange={this.handleChangeUser}
            >
              {userOptions}
            </select>
          </div>
          <div className="col-md-6 input-group">
            <select
              value={invite.role}
              onChange={this.handleChangeRole}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      );
    });
    return (
      <div className="modal">
        <div className="modal_close" onClick={ this.handleClose }></div>
        <div className="container">
          <div className="row center-md vertical-center modal_row">
            <div className="col-md-6">
              <h2 className="heading heading__white">
                Add new team
              </h2>
              <form onSubmit={ this.handleSubmit }>
                <div className="row marginTop">
                  <div className="col-md-12">
                    <Input
                      handleChange={ this.handleChange }
                      defaultValue={ name }
                      error={ errors.name }
                      className="input-group input-group__grey-white"
                      name="name"
                      label="Team name *"/>
                  </div>
                </div>
                <div className="row  marginTop">
                  <div className="col-md-6 input-group">
                    <div>
                      Add member
                    </div>
                  </div>
                  <div className="col-md-6 input-group">
                    <div>
                      Role
                    </div>
                  </div>
                </div>
                {invitationRows}
                <div className="row marginTop">
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn__blue btn__lg"
                    >
                      Create and invite
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="submit"
                      className="btn btn__white btn__lg"
                    >
                      Cancel
                    </button>
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

function mapStateToProps(state) {
  return{
    users: state.users
  }
}

export default connect(mapStateToProps, { hideModal })(AddTeamModal)
