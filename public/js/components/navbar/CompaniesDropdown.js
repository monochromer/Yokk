import React, {Component, PropTypes} from 'react'
import Dropdown from 'react-dropdown'

export default function CompaniesDropdown(props) {
  const {companies} = props

  //PROTOTYPING
  const fakeCompanies = [
    {
      name: 'Fake 1'
    },
    {
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
      onChange={console.log('change')}
      value={defaultOption}
      style={style}
    />
  )
}

function getUserCompaniesList(companies) {
  // if (!companies) return []
  if (!companies[companies.length-1]) return [] //delete when there's now fake companies
  return companies.map(company => company.name)
}
