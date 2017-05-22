import {
  FETCH_TEAMS,
  ADD_TEAM_MEMBERS,
  DELETE_TEAM_MEMBERS,
  DELETE_TEAM,
  CHANGE_TEAM_NAME,
  ADD_TEAM
} from '../constants'
import _ from 'lodash'

const initialState = []

export default function (state = initialState, action) {
  const {
    type,
    data,
    teamId,
    userId,
    response,
    dontChange
  } = action

  switch (type) {

    case FETCH_TEAMS:
      return data

    case ADD_TEAM:
      const stateAfterTeamAdded = state.slice(0)
      stateAfterTeamAdded.push(response.data)
      return stateAfterTeamAdded

    case ADD_TEAM_MEMBERS:
      // exist
      const newMembers = response.data.saved
      const newState = state.slice(0)

      let indexToChange = 0
      let oldMembers = []
      const newStateItem = Object.assign({}, _.find(state, (o, i) => {
        indexToChange = i
        oldMembers = o.members
        return o._id === teamId
      // }), { members: oldMembers.concat(newMembers.map(o => ({ email: o }))) })
      }), { members: oldMembers.concat(newMembers) })

      newState[indexToChange] = newStateItem

      return newState

    case DELETE_TEAM_MEMBERS:
      const stateAfterDeleted = state.slice(0)

      indexToChange = 0
      oldMembers = []
      const newStateItem2 = Object.assign({}, _.find(state, (o, i) => {
        indexToChange = i
        oldMembers = o.members
        return o._id === teamId
      }), { members: oldMembers.filter(o => o._id !== userId) })

      stateAfterDeleted[indexToChange] = newStateItem2

      return stateAfterDeleted

    case DELETE_TEAM:
      return state.filter(team => team._id !== teamId)

    case CHANGE_TEAM_NAME:
      if (dontChange) return state
      const {newName} = response.data
      const stateAfterChangingName = state.slice(0)

      indexToChange = 0
      oldMembers = []

      const newStateItem3 = Object.assign({}, _.find(state, (o, i) => {
        indexToChange = i
        return o._id === teamId
      }), { name: newName })

      stateAfterChangingName[indexToChange] = newStateItem3

      return stateAfterChangingName

    default:
      return state;
  }
}
