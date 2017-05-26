import React from 'react'
import DropPicture from './DropPicture.jsx'
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { updateUser } from '../../actions/users'
import { showModal } from '../../actions/modals'
import SettingsUserProfileAccount from './SettingsUserProfileAccount.jsx'
import SettingsUserProfileGeneral from './SettingsUserProfileGeneral.jsx'
import SettingsUserProfilePersonal from './SettingsUserProfilePersonal.jsx'
import SettingsUserProfileContacts from './SettingsUserProfileContacts.jsx'
import { connect } from 'react-redux'

class SettingsUserProfile extends React.Component {

  state = {
    uploadingPhoto: false
  }


  render() {
    const { user, company, updateUser, showModal } = this.props;
      if (!user || !company) {
        return ( <p> Wait a moment please... </p>);
      }
    const { _id, profileImg } = user;
    const photo = profileImg ? profileImg.medium : "";

    return (
      <div className="row profile">

        <div className="col-sm-4 profile_photo">
          <DropPicture
            _id={ _id }
            photo={ photo }
            uploading={ this.state.uploadingPhoto }
          />
        </div>

        <div className="col-sm-8 prodile_inputs">
          <div className="row">
            <div className="col-sm-6">You profile in {company.name}</div>
            <div className="col-sm-6 text-right">
              <Link to="/">View statistic</Link>
            </div>
          </div>
          <SettingsUserProfileAccount
            user={user}
            updateUser={updateUser}
            showModal={showModal}
          />
          <SettingsUserProfileGeneral
            user={user}
            updateUser={updateUser}
          />
          <SettingsUserProfilePersonal
            user={user}
            updateUser={updateUser}
          />
          <SettingsUserProfileContacts
            user={user}
            updateUser={updateUser}
          />
        </div>
      </div>
    )
  }
}

SettingsUserProfile.PropsTypes = {
  user: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

function getProps(state) {
  return {
    user: state.users[state.currentUser._id],
    company: state.companies.find(
      el => el._id === state.users[state.currentUser._id].companyId
    )
  }
}

export default connect(getProps, { updateUser, showModal })(SettingsUserProfile);
