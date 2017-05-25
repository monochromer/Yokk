import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

class UserMenu extends React.Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    window.location.reload();
  }

  selectCompany = (e) => {
    e.preventDefault();
    if(e.target.value){
      this.props.updateUser(this.props.user._id, {
        currentCompany: e.target.value
      });
    }
    else{
      this.props.updateUser(this.props.user._id, {
        currentCompany: e.target.getAttribute("value")
      });
    }

  }

  handleSelectClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const { user, companies } = this.props;
    let mappedCompanies = [];

    if(companies.length > 5){
      const options = companies.map((company) => {
        return(
          <option
            key={company._id}
            value={company._id}
          >{company.name}</option>
        );
      });
      mappedCompanies = (
        <select
          className="dropdown-element"
          onChange={this.selectCompany}
          onClick={this.handleSelectClick}
          defaultValue={user.companyId}
        >
          {options}
        </select>
      );
    }
    else{
      mappedCompanies = companies.map((company) => {
        return(
          <div
            key={company._id}
            className="dropdown-element"
          >
            <a
              href="#"
              value={company._id}
              onClick={this.selectCompany}
            >
              {company.name}
            </a>
          </div>
        );
      });
    }

    return (
      <div className="dropdown">
        {mappedCompanies}
        <div className="dropdown-element">
          <Link to="/settings#add-new-company">
            <span className="glyphicons glyphicons-plus-sign"></span>{" "}
            Add new company
          </Link>
        </div>
        <div className="dropdown-element">
          <Link to="/settings">Settings</Link>
        </div>
        <div className="dropdown-element">
          <a href="#" onClick={this.logout} >Logout</a>
        </div>
      </div>
    )
  }
}

UserMenu.PropTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default UserMenu;
