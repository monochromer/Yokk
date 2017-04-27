import React from 'react'
import store from '../../../store';
import { step4 } from '../../../actions/companies'
// import { step4 } from '../../../actions/teams'
import { connect } from 'react-redux'
import { Input } from '../../UI.jsx'

class Step4 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teamName: ""
    }
  }

  handleChange(event) {
    this.setState({
      teamName: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    store.dispatch(step4(this.state.teamName, this.props.email));
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <div className="container">
          <div className="row center-xs step__heading">
            <div className="col-md-12 col-sm-12 col-xs-10">
              <h1 className="heading">What’s your company called?</h1>
            </div>
          </div>
          <div className="row center-xs step__message">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <p>You’ll be able to change the name later,<br/>
                but it should be unique within our system.</p>
            </div>
          </div>
          <div className="row center-xs step__code">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <Input className="input-group input-group__grey"
                  type="text"
                  handleChange={ this.handleChange.bind(this) }
                  name="name"
                  label="Company name"/>
            </div>
          </div>
          <div className="row center-xs">
            <div className="col-md-6 col-sm-8 col-xs-10">
              <button className="btn btn__blue btn__lg team-create__create"
                  disabled={ !this.state.teamName ? "disabled" : "" }>Go to Sign In
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
    email: state.teams.email
  }
}

export default connect(getProps)(Step4)
