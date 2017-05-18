import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Component for creating new company
 */
class SettingsAddNewCompany extends Component {

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * React Render
   * @return {XML}
   */
  render() {
    return(
      <div className="settings-add-new-company">
        <h1>Create New Company</h1>
        <form className="settings-add-new-company__form">
          <div className="form-group settings-add-new-company__company-name">
            <label htmlFor="companyName">Company Name <span className="required-field">*</span></label>
            <input type="text" id="companyName" name="company-name" />
          </div>
          <div className="form-group settings-add-new-company__company-address">
            <label htmlFor="companyAddress">Company Address</label>
            <input type="text" id="companyAddress" name="company-address" />
          </div>
          <div className="form-group settings-add-new-company__company-billing-information">
            <label htmlFor="companyBillingInformation">Company Billing Information</label>
            <textarea id="companyBillingInformation" name="company-billing-information" rows="6"></textarea>
          </div>
        </form>
      </div>
    );
  }

}

export default SettingsAddNewCompany;
