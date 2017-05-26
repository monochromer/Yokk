import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCompany } from '../../actions/companies';
import { Input } from '../UI.jsx'

class SettingsCompanyProfile extends React.Component {

  componentWillMount(){
    this.setState(this.initialState);
  }

  initialState = {
    name: this.props.company.name,
    address: this.props.company.address,
    billingInfo: this.props.company.billingInfo,
    errors: {}
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateCompany(this.props.company._id, this.state, (err) => {
      if(err){
        this.setState({
          errors: err
        });
        return false;
      }
      this.setState({
        errors: {}
      });
      this.initialState = {
        name: this.props.company.name,
        address: this.props.company.address,
        billingInfo: this.props.company.billingInfo,
        errors: {}
      }
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
    return (
      <div>
        <h1>Company profile</h1>
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
          <div className="form-group">
            <button
              className="btn btn__md btn__blue"
              type="submit"
            >
              Save
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

SettingsCompanyProfile.PropTypes = {
  company: PropTypes.object.isRequired,
  updateCompany: PropTypes.func.isRequired
}

function getParams(state) {
  return {
    company: state.companies.find(
      el => el._id === state.users[state.currentUser._id].companyId
    ) || {}
  }
}

export default connect(getParams, { updateCompany })(SettingsCompanyProfile);
