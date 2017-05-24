import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCompany } from '../../actions/companies';
import { Input } from '../UI.jsx'

class SettingsAddNewCompany extends React.Component {

  state = {
    name: '',
    address: '',
    billingInfo: '',
    errors: {}
  }

  initialState = {
    name: '',
    address: '',
    billingInfo: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createCompany(this.state, (err) => {
      if(err){
        this.setState({
          errors: err
        });
        return false;
      }
      this.setState(this.initialState);
    });
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState(this.initialState);
  }

  render() {
    const {
      name,
      address,
      billingInfo,
      errors
    } = this.state;
    return(
      <div>
        <h1>Create New Company</h1>
        <form
          className="settings-add-new-company__form"
          onSubmit={this.handleSubmit}
        >
            <Input
              handleChange={this.handleChange}
              className="input-group input-group__grey"
              label="Company Name *"
              error={errors.name}
              defaultValue={name}
              name="name"
            />
            <Input
              handleChange={this.handleChange}
              className="input-group input-group__grey"
              label="Company Address"
              error={errors.address}
              defaultValue={address}
              name="address"
            />
          <div className="form-group billing-information">
            <label htmlFor="companyBillingInformation">
              Company Billing Information
            </label>
            <textarea
              id="companyBillingInformation"
              name="billingInfo"
              rows="6"
              value={billingInfo}
              onChange={this.handleChange}
            />
            {
              errors.billingInfo &&
              <div className="form-error">{errors.billingInfo}</div>
            }
          </div>
          {errors.form && <div className="form-error">{errors.form}</div>}
          <div className="form-group billing-information">
            <button
              className="btn btn__md btn__blue"
              type="submit"
            >
              Create
            </button>
            <button
              className="btn btn__md"
              type="submit"
              onClick={this.handleCancel}
            >
              Cancel
          </button>
          </div>
        </form>
      </div>
    );
  }

}

SettingsAddNewCompany.PropTypes = {
  createCompany: PropTypes.func.isRequired
}

export default connect(null, { createCompany })(SettingsAddNewCompany);
