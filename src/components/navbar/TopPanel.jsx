import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { changeCurrentCompany, logout } from '../../actions/currentUser'
import CompaniesDropdown from './CompaniesDropdown'
import NewCompanyModal from './NewCompanyModal.jsx'

class TopPanel extends React.Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    window.location.reload();
  }

  onCompanyChange = companyId => e => {
    this.props.changeCurrentCompany(companyId)
  }

  render() {
    const { user } = this.props;
    let photo = "";

    if (user.profileImg) {
      photo = <img
        src={user.profileImg.small}
        className="img-circle"
        width="34px"
        height="34px"
        alt="profile"
       />
    }
    return (
      <div className="top-panel">
        <div className="row top-panel_row">
          <div className="col-md-2">
            <a href="/" className="top-panel_logo">Eye of Providence</a>
          </div>
          <div className="col-md-2">
            <CompaniesDropdown companies={user.companies} onCompanyChange={this.onCompanyChange}/>
          </div>
          <div className="col-md-4">
            <ul className="top-panel_menu">
              <li className="top-panel_menu-item">
                <a className="top-panel_menu-link" href="#" onClick={ this.props.onCreateNewCompany }>New company</a>
              </li>
              <li className="top-panel_menu-item">
                <Link className="top-panel_menu-link" activeClassName="top-panel_menu-link__active" to="/teams">Teams list</Link>
              </li>
              <li className="top-panel_menu-item">
                <Link className="top-panel_menu-link" activeClassName="top-panel_menu-link__active" to="/reports">Reports</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-right tracking-item">
            <Link className="tracking-block_link" to="/">
              <div className="tracking-block">
                <span>Tracking</span>
              </div>
            </Link>

            <div className="profile-block">
              {photo}
              <Link to={"/user/edit/" + user.login}>{user.login}</Link>
            </div>

            <a href="#" onClick={this.logout} className="top-panel_logout">Logout</a>

          </div>
        </div>
        <NewCompanyModal/>
      </div>
    )
  }
}

TopPanel.PropTypes = {
  user: React.PropTypes.object.isRequired
}

const getProps = function(store) {
    return {
        user: store.currentUser.data
    }
};


export default connect(getProps, { changeCurrentCompany, logout })(TopPanel)
