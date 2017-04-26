import React, {Component, PropTypes} from 'react'

export default function Users(props) {

  const {members} = props

  return (
    <div className="container container__flex1 container__fixed">
      <div className="row user-table_header">
        <div className="col-md-8 col-md-offset-2 text-center">
          <h2>Team name</h2>
        </div>
        <div className="col-md-2 text-right">
          <button className="btn btn__md btn__trans-blue" onClick={showModalUserAdd}>+ Add Users</button>
        </div>
      </div>
      <div className="row users-list_heading">
        <div className="col-md-3 user-list_title">Full name</div>
        <div className="col-md-4 user-list_title">Position</div>
        <div className="col-md-2 user-list_title">Sources</div>
        <div className="col-md-2 user-list_title">Actions</div>
        <div className="col-md-1 user-list_title"></div>
      </div>
      <AddUsersModal />
    </div>
  )
}
