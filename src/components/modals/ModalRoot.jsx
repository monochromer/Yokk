import {
  ADD_TEAM,
  CHANGE_PASSWORD,
  INVITE_MEMBER
} from '../../constants';
import React from 'react';
import { connect } from 'react-redux';
import AddTeamModal from './AddTeamModal.jsx';
import ChangePasswordModal from './ChangePasswordModal.jsx';
import InviteMemberModal from './InviteMemberModal.jsx';
import { hideModal } from '../../actions/modals'

const MODAL_COMPONENTS = {
  [ADD_TEAM]: AddTeamModal,
  [CHANGE_PASSWORD]: ChangePasswordModal,
  [INVITE_MEMBER]: InviteMemberModal
}

const ModalRoot = ({ modalType, modalProps, hideModal }) => {
  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal
    {...modalProps}
    hideModal={hideModal}
  />
}

export default connect(
  state => state.modals,
  { hideModal }
)(ModalRoot)
