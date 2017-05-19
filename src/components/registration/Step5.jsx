import React from 'react';
import PropTypes from 'prop-types';
import { finishRegistration, inviteMembers } from '../../actions/registration';
import { Input } from '../UI.jsx';

class Step5 extends React.Component {

  state = {
    invitations: [""],
    error: ""
  }

  componentWillMount(){
    if(
      !localStorage.reg_email ||
      !localStorage.reg_code ||
      !localStorage.reg_firstName ||
      !localStorage.reg_lastName ||
      !localStorage.reg_password ||
      !localStorage.reg_companyName
    ){
      this.props.router.push('/registration');
    }
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
    const data = {
      email: localStorage.reg_email,
      code: localStorage.reg_code,
      firstName: localStorage.reg_firstName,
      lastName: localStorage.reg_lastName,
      password: localStorage.reg_password,
      companyName: localStorage.reg_companyName,
      step: '5'
    };
    finishRegistration(data, (err, res) => {
      if(err){
        this.setState({error: "" + err.response.data});
        return false;
      }
      const firstName = localStorage.reg_firstName;
      const lastName = localStorage.reg_lastName;
      const companyName = localStorage.reg_companyName;
      const { teamId, companyId } = res.data;
      inviteMembers(teamId, this.state.invitations, companyId,
        (firstName + " " + lastName), companyName);
      this.props.router.push('/login');
    });
  }

  handleSkip = (e) => {
    e.preventDefault();
    const data = {
      email: localStorage.reg_email,
      code: localStorage.reg_code,
      firstName: localStorage.reg_firstName,
      lastName: localStorage.reg_lastName,
      password: localStorage.reg_password,
      companyName: localStorage.reg_companyName,
      step: '5'
    };
    finishRegistration(data, (err, res) => {
      if(err){
        this.setState({error: "" + err.response.data});
        return false;
      }
      this.props.router.push('/login');
    });
  }

  render() {
    const { invitations, error } = this.state;
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
              <h1 className="heading">Invite someone</h1>
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
              <div
                className="btn btn_link btn_white"
                onClick={ this.addInvitation.bind(this) }
              >
                + Add another invitations
              </div>
            </div>
          </div>


          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              {error && <div className="form-error">{error}</div>}
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

Step5.contextTypes = {
	router: PropTypes.object.isRequired
}

export default Step5;
