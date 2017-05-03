import React from 'react';
import { connect } from 'react-redux';
import { addTeamMembers } from '../../actions/teams';
import { Input } from '../UI.jsx';
import { browserHistory } from 'react-router';

class Step5 extends React.Component {
  
  state = {
    invitations: [""]
  }

  addInvitation = () => {
    this.setState({
      invitations: [
        ...this.state.invitations,
        ""
      ]
    });
  }

  handleChange = (e) => {
    const { invitations } = this.state;
    invitations[e.target.name] = e.target.value;
    this.setState({invitations});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { teamId, companyId, addTeamMembers } = this.props;
    addTeamMembers(teamId, this.state.invitations, companyId);
    browserHistory.push('/login');
  }

  handleSkip = (e) => {
    e.preventDefault();
    browserHistory.push('/login');
  }

  render() {
    const { invitations } = this.state;
    const invitationRows = invitations.map((invitation, index) => {
      return(
        <div className="row center-xs invintations_row" key={index}>
          <div className="col-md-6 col-sm-8 col-xs-10">
            <Input
              handleChange={this.handleChange}
              className="input-group input-group__grey"
              type="email"
              name={ index }
              label="E-mail"
            />
          </div>
        </div>
      );
    });

    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <div className="container">
          <div className="row center-xs step__heading">
            <div className="col-md-12 col-sm-12 col-xs-10">
              <h1 className="heading">Send Invitations</h1>
            </div>
          </div>
          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>
                Your team is ready to go. You can invite people to use Yokk!
                with you now or later.
              </p>
            </div>
          </div>

          {invitationRows}

          <div className="row center-xs">
            <div className="col-md-3 col-sm-3 col-xs-6">
              <div className="btn btn_link btn_white" onClick={ this.addInvitation.bind(this) }>+ Add
                another invitations
              </div>
            </div>
          </div>


          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button className="btn btn__lg btn__blue team-create__create">
                Send Invitations
              </button>
              <button
                className="btn btn__lg btn__blue team-create__create"
                onClick={this.handleSkip}
              >
                Skip this step
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function getProps(state) {
  return {
    companyId: state.registration.companyId,
    teamId: state.registration.teamId
  }
}

export default connect(getProps, { addTeamMembers })(Step5)
