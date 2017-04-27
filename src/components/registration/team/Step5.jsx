import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { step5 } from '../../../actions/teams'
import { Input } from '../../UI.jsx'
import store from '../../../store'

class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invitations: [],
      rows: 2
    }
  }

  addInvitation() {
    this.setState({
      rows: this.state.rows + 1
    });
  }

  handleChange(e) {
    this.state.invitations[e.target.name] = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    store.dispatch(step5(this.props.teamName,this.state.invitations));
    setTimeout(() => { document.location.href = '/login'} , 1000); // wtf !?
  }

  render() {
    const invitationRows = [];

    for (var i = 0; i < this.state.rows; i++) {
      invitationRows.push(
        <div className="row center-xs invintations_row" key={ _.uniqueId() }>
          <div className="col-md-6 col-sm-8 col-xs-10">
            <Input handleChange={ this.handleChange.bind(this) }
                defaultValue={ this.state.invitations[i] }
                className="input-group input-group__grey" type="email"
                name={ i }
                label="E-mail"/>
          </div>
        </div>
      );
    }

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
              <p>Your team is ready to go. Know a few friends or coworkers <br/>
                who’d like to explore Eye of Providence with you.</p>
            </div>
          </div>

          {
            invitationRows.map((o) => o)
          }

          <div className="row center-xs">
            <div className="col-md-3 col-sm-3 col-xs-6">
              <div className="btn btn_link btn_white" onClick={ this.addInvitation.bind(this) }>+ Add
                another invitations
              </div>
            </div>
          </div>


          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button className="btn btn__lg btn__blue team-create__create">Send
                Invitations
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
    teamName: state.teams.teamName,
    login: state.teams.login,
    password: state.teams.password
  }
}

export default connect(getProps)(Step5)
