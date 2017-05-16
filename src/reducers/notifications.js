import {
  FETCH_NOTIFICATIONS,
  MARK_NOTIFICATION,
  MARK_ALL_NOTIFICATIONS
} from '../constants';
var initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return action.notifications;
    case MARK_NOTIFICATION:
      let index = -1;
      for(let i = 0; i < state.length; i++){
        if (state[i]._id === action._id) {
          index = i;
          break;
        }
      }
      if(index > -1){
        const notification = state[index];
        notification.new = false;
        return [
          ...state.slice(0, index),
          notification,
          ...state.slice(index + 1)
        ];
      }
      else{
        return state;
      }
    case MARK_ALL_NOTIFICATIONS:
      const newState = state.map((el) => {
        el.new = false;
        return el;
      });
      return newState;

    default:
      return state;
  }
}
