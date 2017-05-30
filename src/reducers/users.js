import {
  dummy,
  DELETE_USER,
  INVITE_MEMBER,
  UPDATE_USER
} from '../constants';
import _ from 'lodash'

const defaultState = {};

export default function(state = defaultState, action) {
  const { type, payload, userId } = action;
  var newState = "";
  switch (type) {
    case DELETE_USER:
      newState = {};
      for(let id in state){
        if(id !== payload._id){
          newState[id] = {...state[id]};
        }
      }
      return newState;

    case UPDATE_USER:
      return {
        ...state,
        [payload.userId]: {
          ...state[payload.userId],
          ...payload.fields
        }
      };
    case INVITE_MEMBER:
      newState = {};
      payload.forEach((user) => {
        newState[user._id] = {
          _id: user._id,
          firstName: 'Pending',
          lastName: 'invite',
          pending: true,
          email: user.email,
          role: user.role
        };
      });
      return {
        ...state,
        ...newState
      };
    case "UPDATE_USER_PHOTO":
      return {
        ...state,
        [userId]: {
          ...state[userId],
          ...payload
        }
      };

    case "DELETE_PROFILE_IMG":
      newState = cloneObject(state)

       _.find(newState, o => o._id === userId).profileImg = dummy

      return newState

    case "FETCH_USERS":
      newState = {};
      for(let index = 0; index < payload.length; index++){
        newState[payload[index]._id] = {...payload[index]};
      }
      return newState;

    default:
      return state;
  }
}

function cloneObject(clonedObject) {
  if (typeof clonedObject !== 'object' || clonedObject === null) return clonedObject
  let temporary = clonedObject.constructor()
  for (let key in clonedObject) {
    temporary[key] = cloneObject(clonedObject[key])
  }
  return temporary
}
