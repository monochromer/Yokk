import { browserHistory } from 'react-router'
import { FETCH_TEAMS, ADD_TEAM_MEMBERS } from '../constants'
import _ from 'lodash'

const initialState = []

export default function (state = initialState, action) {
  const { type, data, addToState } = action;

  switch (type) {

    case FETCH_TEAMS:
      return data
      break;

    case ADD_TEAM_MEMBERS:
      // console.log(state);
      // console.log(addToState);
      // const newStateItem = _.find(state => o._id === addToState.teamId)
      return state
      break;

    default:
      return state;
      break;
  }
}
