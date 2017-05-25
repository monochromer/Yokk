import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../UI.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class SettingsUserProfilePersonal extends React.Component {

  componentWillMount(){
    this.setState(this.initialState);
  }

  initialState = {
    errors: {},
    editing: false,
    birthday: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDateChange = (e) => {
    this.setState({
      birthday: e.valueOf()
    });
  }

  startEditing = () => {
    this.setState({
      editing: true
    });
  }

  cancelEditing = () => {
    this.setState(this.initialState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(this.props.user._id, this.state, (err) => {
      if(err){
        this.setState({errors: err});
        return;
      }
      this.setState(this.initialState);
    });
  }

  render() {
    const {
      gender,
      birthday,
      cv,
      skills
    } = this.props.user;
    const changedBirthday = this.state.birthday || birthday;
    const { editing, errors } = this.state;
    return editing ? (
      <div>
        <div className="row profile_section">
          <div className="col-md-12">
            <h3 className="profile_heading">
              Personal
              <span
                className="glyphicons glyphicons-ok"
                onClick={this.handleSubmit}
              ></span>
              <span
                className="glyphicons glyphicons-remove"
                onClick={this.cancelEditing}
              ></span>
            </h3>
          </div>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="gender"
                label="Gender"
                defaultValue={ gender }
                error={errors.gender}
              />
            </div>
            <div className="col-md-6">
              <div className="label">Date of birth</div>
    					<DatePicker
    						selected={moment(changedBirthday)}
    						onChange={this.handleDateChange}
    						title="Date of birth"
    					/>
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="cv"
                label="CV"
                defaultValue={ cv }
                error={errors.cv}
              />
            </div>
            <div className="col-md-6">
              <Input
                className="input-group input-group__grey"
                handleChange={ this.handleChange }
                name="skills"
                label="Skills"
                defaultValue={ skills }
                error={errors.skills}
              />
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div>
        <div className="row profile_section">
          <div className="col-md-12">
            <h3 className="profile_heading">
              Personal
              <span
                className="glyphicons glyphicons-pencil"
                onClick={this.startEditing}
              ></span>
            </h3>
          </div>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <div className="label">Gender</div>
              <div>{ gender }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Date of birth</div>
              <div>{ moment(birthday).format('L') }</div>
            </div>
          </div>
          <div className="row profile_inputs-row">
            <div className="col-md-6">
              <div className="label">CV</div>
              <div>{ cv }</div>
            </div>
            <div className="col-md-6">
              <div className="label">Skills</div>
              <div>{ skills }</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SettingsUserProfilePersonal.PropTypes = {
  user: PropTypes.object.isRequired
}

export default SettingsUserProfilePersonal;
