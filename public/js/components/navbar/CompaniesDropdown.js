import React, {Component, PropTypes} from 'react'
import Dropdown from 'react-dropdown'

export default class CompaniesDropdown extends Component {

  _onSelect = option => {
    this.props.onCompanyChange(option.value)()
  }

  static PropTypes = {
    companies: PropTypes.array.isRequired,
    onCompanyChange: PropTypes.func.isRequired
  }

  render() {
    const { companies, onCompanyChange } = this.props

    //PROTOTYPING
    const fakeCompanies = [
      {
        _id: 'Fake 1',
        name: 'Fake 1'
      },
      {
        _id: 'Fake 2',
        name: 'Fake 2'
      },
      {
        _id: 'Fake 3',
        name: 'Fake 3'
      },
      {
        _id: 'Fake 4',
        name: 'Fake 4'
      },
      {
        _id: 'Fake 5',
        name: 'Fake 5'
      },]
    // ].concat(companies)
    //PROTOTYPING


    const companiesList = getUserCompaniesList(fakeCompanies)
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

function getUserCompaniesList(companies) {
  // if (!companies) return []
  if (!companies) return [] //delete when there's now fake companies
  return companies.map(company => ({
    value: company._id,
    label: company.name
  }))
}
