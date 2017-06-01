import React from 'react'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'
import { addTeam } from '../../actions/teams';
import { isEmpty } from 'lodash';
import { RANDOM_TEAM_NAME } from '../../constants';

class AddTeamModal extends React.Component {

  state = {
    name: RANDOM_TEAM_NAME(),
    errors: {},
    invites: [
      {
        userId: 0,
        role: 'user'
      }
    ]
  }

  handleClose = (e) => {
    if(e && e.preventDefault){
      e.preventDefault();
    }
    this.props.hideModal();
  }

  checkForm = () => {
    const { name } = this.state;
    const errors = {};
    if(!name.length){
      errors.name = 'Nothing to save!';
    }
    if(name.length > 100){
      errors.name = 'Name must be 100 characters or less';
    }
    this.setState({errors});
    if(isEmpty(errors)){
      return true;
    }
    return false;
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleChangeUser = (e) => {
    const index = parseInt(e.target.name, 10);
    if (index < 0){
      return;
    }
    const userId = e.target.value;
    this.setState({
      invites: [
        ...this.state.invites.slice(0, index),
        {
          ...this.state.invites[index],
          userId
        },
        ...this.state.invites.slice(index + 1),
      ]
    });
  }

  handleChangeRole = (e) => {
    const index = parseInt(e.target.name, 10);
    if (index < 0){
      return;
    }
    const role = e.target.value;
    this.setState({
      invites: [
        ...this.state.invites.slice(0, index),
        {
          ...this.state.invites[index],
          role
        },
        ...this.state.invites.slice(index + 1),
      ]
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(!this.checkForm()) return;
    this.props.addTeam(this.state, (err) => {
      if(err){
        this.setState({errors: err});
        return;
      }
      this.handleClose();
    });
  }

  handleAddInvite = () => {
    this.setState({
      invites: [
        ...this.state.invites,
        {
          userId: 0,
          role: 'user'
        }
      ]
    });
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
          <div className="col-md-6">
            <select
              value={invite.userId}
              onChange={this.handleChangeUser}
              name={index}
            >
              <option value={0}>Select...</option>
              {userOptions}
            </select>
          </div>
          <div className="col-md-6">
            <select
              value={invite.role}
              onChange={this.handleChangeRole}
              name={index}
            >
              <option value="manager">Manager</option>
              <option value="user">User</option>
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
                <div className="row marginTop">
                  <div className="col-md-6">
                    <div>
                      Add member
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      Role
                    </div>
                  </div>
                </div>
                {invitationRows}
                <div
                  className="row marginTop"
                  onClick={this.handleAddInvite}
                >
                  <div className="col-md-6">
                    <span className="glyphicons glyphicons-plus">
                    </span> Add another
                  </div>
                </div>
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
                      onClick={this.handleClose}
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

export default connect(mapStateToProps, { addTeam })(AddTeamModal)
