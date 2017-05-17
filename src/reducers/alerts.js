import { SET_SYSTEM_ALERT } from '../constants';

const defaultState = {
  system: ""
}

export default function( state = defaultState, action ) {
  switch ( action.type ) {
    case SET_SYSTEM_ALERT:
      return {
        ...state,
        system: action.payload
      }

    default:
      return state;
  }
}
