import React, { Component } from 'react';
import moment from 'moment';
import { createTimeEntry } from '../../actions/timeEntries.js';
import { connect } from 'react-redux';
import { validateDuration } from '../../utils/validators';
import { Input } from '../UI.jsx';
import DatePicker from 'react-datepicker';
import { isEmpty } from 'lodash';

class NewTimeEntryForm extends Component {

  componentWillMount(){
    this.setInitialState();
  }

  setInitialState = () => {
    this.setState({
      description: '',
      duration: '00:00:00',
      date: Date.now(),
      errors: {}
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: ("" + e.target.value).slice(0, 100),
      errors: {
        ...this.state.errors,
        [e.target.name]: ''
      }
    });
  }

  handleDateChange = (e) => {
    this.setState({
      date: e.valueOf()
    });
  }

  checkForm(){
    const errors = {};
    const { description, duration, date } = this.state;
    if(!description.length){
      errors.description = 'Nothing to save!';
    }
    if(!validateDuration(duration)){
      errors.duration = 'Incorrect duration.';
    }
    if(date < 1){
      errors.date = 'Incorrect date.';
    }
    if(!isEmpty(errors)){
      this.setState({errors});
      return false;
    }
    this.setState({errors: {}});
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.checkForm()) {
      return;
    }

    const { description, duration, date } = this.state;


    const timeEntry = {
      date,
      dateCreated: Date.now(),
      description,
      duration: moment.duration(duration).valueOf(),
      entrySource: 'eop',
      executor: this.props.currentUserID
    };

    this.props.createTimeEntry(timeEntry);
  }

  render() {
    const { description, date, errors } = this.state;
    return (
      <div className="container-fluid tracking-form">
        <div className="text-center heading heading__white">
          Track your time
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="container container__fixed">
            <div className="row tracking-form_row">
              <div className="col-md-8 tracking-form_description">
                <Input className="input-group input-group__light-blue"
                    handleChange={this.handleChange}
                    value={description}
                    error={ errors.description }
                    name="description"
                    label="What you are working on?"/>
              </div>
              <div className="col-md-2 tracking-form_date">
                <div className="input-group input-group__light-blue input-group__focus">
                  <label>Date</label>
                  <DatePicker
                    selected={moment(date)}
                    onChange={this.handleDateChange}
                    title="Date of birth"
                    value={moment(date).format('DD.MM.Y')}
                  />
                </div>
              </div>

              <div className="col-md-1 tracking-form_duration">
                <Input className="input-group input-group__light-blue"
                    handleChange={this.handleChange}
                    error={errors.duration}
                    name="duration"
                    defaultValue="00:00:00"
                    label="Duration"
                    mask="99:99:99"/>
              </div>
              <div className="col-md-1 tracking-form_add">
                <button className="btn btn__lg btn__white">Add</button>
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

export default connect(getProps, { createTimeEntry })(NewTimeEntryForm)
