import React, {Component, PropTypes} from 'react'

export default class Team extends Component {

  render() {
    const {members} = this.props

    return (
      <div>{members.map(member=><div key={member}>{member}</div>)}</div>
    )
  }
}
