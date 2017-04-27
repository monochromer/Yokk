import React, { Component } from 'react'
import store from '../../store.js'
import moment from 'moment'
import { createTimeEntry, fetchRedmineTimeEntries, fetchUpworkTimeEntries } from '../../actions/timeEntries.js'
import { connect } from 'react-redux'
import { findUserByLogin } from '../../helpers'
import { validateString, validateDuration, validateDateFormat } from '../../utils/validators'
import { Input } from '../UI.jsx'

class NewTimeEntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: {
        value: '',
        valid: false,
        error: ''
      },
      duration: {
        value: '00:00',
        valid: false,
        error: ''
      },
      date: {
        value: moment().format('DD.MM.YYYY'),
        valid: true,
        error: ''
      }
    };

    this.syncRedmine = this.syncRedmine.bind(this);
    this.syncUpwork = this.syncUpwork.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  syncRedmine() {
    const user = findUserByLogin(this.props.users, this.props.currentUser);
    if (user.redmineApiKey) {
      store.dispatch(fetchRedmineTimeEntries());
    } else {
      alert('Check Redmine integration at your profile!');
    }
  }

  syncUpwork() {
    const user = findUserByLogin(this.props.users, this.props.currentUser);
    if (user.upworkApiKey) {
      store.dispatch(fetchUpworkTimeEntries());
    } else {
      alert('Check Upwork integration at your profile!');
    }
  }

  handleChange(name, value) {
    let valid, error;
    switch(name) {
      case 'description':
        valid = validateString(value);
        error = valid ? '' : 'Description is required.';
        break;
      case 'date':
        valid = validateDateFormat(value);
        error = valid ? '' : 'Invalid date.';
        break;
      case 'duration':
        valid = validateDuration(value);
        error = valid ? '' : 'Invalid duration.';
        break;
      default:
    }

    this.setState({
      [name]: { value, valid, error }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { description, duration, date } = this.state;

    if (!description.valid || !duration.valid || !date.valid) {
      this.handleChange('description', description.value);
      this.handleChange('duration', duration.value);
      this.handleChange('date', date.value);
      return;
    }

    const timeEntry = {
      date: date.value,
      dateCreated: Date.now(),
      description: description.value,
      duration: duration.value,
      entrySource: 'eop',
      executor: this.props.currentUserID
    };

    store.dispatch(createTimeEntry(timeEntry));
  }

  render() {
    return (
      <div className="container-fluid tracking-form">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="flex vertical-center text-center tracking-form_heading">
              <div>
                <h2 className="heading heading__white"> Track your time </h2>
              </div>
              <div>
                <span className="tracking-form_or">or</span>
              </div>
              <button className="btn btn__md btn__trans-white" onClick={ this.syncRedmine }>Sync Redmine
              </button>
              <button className="btn btn__md btn__trans-white" onClick={ this.syncUpwork }>Sync Upwork
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="container container__fixed">
            <div className="row tracking-form_row">
              <div className="col-md-8 tracking-form_description">
                <Input className="input-group input-group__light-blue"
                    handleChange={ event => this.handleChange('description', event.target.value) }
                    error={ this.state.description.error }
                    name="description"
                    label="What you are working on?"/>
              </div>
              <div className="col-md-2 tracking-form_date">
                <Input className="input-group input-group__light-blue"
                    handleChange={ event => this.handleChange('date', event.target.value) }
                    error={ this.state.date.error }
                    defaultValue={ moment().format("DD.MM.YYYY") }
                    name="date"
                    label="Date"
                    mask="99.99.9999"/>
              </div>

              <div className="col-md-1 tracking-form_duration">
                <Input className="input-group input-group__light-blue"
                    handleChange={ event => this.handleChange('duration', event.target.value) }
                    error={ this.state.duration.error }
                    name="duration"
                    defaultValue="00:00"
                    label="Duration"
                    mask="99:99"/>
              </div>
              <div className="col-md-1 tracking-form_add">
                <button className="btn btn__lg btn__white">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function getProps(store) {
  return {
    currentUser: store.currentUser.login,
    currentUserID: store.currentUser._id,
    users: store.users.list
  }
}

export default connect(getProps)(NewTimeEntryForm)
