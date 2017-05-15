import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'

export default class CompaniesDropdown extends Component {

  state = {
    currentCompany: ""
  }

  _onSelect = option => {
    this.props.onCompanyChange(option.value)()
  }

  render() {
    const { companies } = this.props

    const companiesList = getUserCompaniesList(companies)
    let defaultOption = companiesList[0] ? companiesList[0] : 'select'

    const style = {
      pofition: 'static'
    }

    return (
      <Dropdown
        options={companiesList}
        onChange={this._onSelect}
        value={defaultOption}
        style={style}
      />
    )
  }

}

CompaniesDropdown.propTypes = {
  companies: PropTypes.array.isRequired,
  onCompanyChange: PropTypes.func.isRequired
}

function getUserCompaniesList(companies) {
  // if (!companies) return []
  if (!companies) return [] //delete when there's now fake companies
  return companies.map(company => ({
    value: company._id,
    label: company.name
  }))
}
