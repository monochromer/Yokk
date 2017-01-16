import React, {Component, PropTypes} from 'react'
import Dropdown from 'react-dropdown'

export default class CompaniesDropdown extends Component {

  _onSelect = option => {
    this.props.onCompanyChange(option.value)()
  }

  render() {
    const { companies, onCompanyChange } = this.props

    //PROTOTYPING
    const fakeCompanies = [
      {
        id: 'Fake 1',
        name: 'Fake 1'
      },
      {
        id: 'Fake 2',
        name: 'Fake 2'
      },
    ].concat(companies)
    //PROTOTYPING


    const companiesList = getUserCompaniesList(fakeCompanies)
    const defaultOption = companiesList[companiesList.length-1]

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

function getUserCompaniesList(companies) {
  // if (!companies) return []
  if (!companies[companies.length-1]) return [] //delete when there's now fake companies
  return companies.map(company => ({
    value: company._id,
    label: company.name
  }))
}
