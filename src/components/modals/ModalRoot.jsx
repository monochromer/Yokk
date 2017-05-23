import {
  ADD_TEAM
} from '../../constants';
import React from 'react';
import { connect } from 'react-redux';
import AddTeamModal from './AddTeamModal.jsx';

const MODAL_COMPONENTS = {
  [ADD_TEAM]: AddTeamModal
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

export default connect(
  state => state.modals
)(ModalRoot)
