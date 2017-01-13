import React, {Component, PropTypes} from 'react'

export default function teamMembers(props) {

  const {members} = props

  const membersList = members.map(member => {
    const {_id: key, name, profileImg} = member
    const profileLink = `/user/edit/${name}`

    return (
      <div key={key} className="profile-block">
        <img src={profileImg} alt="img" className="img-circle" width="34px" height="34px"/>
        <a href={profileLink}>{name}</a>
      </div>
    )
  })

  return (
    <div>
      {membersList}
    </div>
  )
}
