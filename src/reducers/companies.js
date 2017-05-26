import { FETCH_COMPANIES, UPDATE_COMPANY } from '../constants';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANIES:
      return action.payload
    case UPDATE_COMPANY:
      let index = -1;
      for(let i = 0; i < state.length; i++){
        if (state[i]._id === action.companyId) {
          index = i;
          break;
        }
      }
      if(index > -1){
        return [
          ...state.slice(0, index),
          {
            ...state[index],
            ...action.payload
          },
          ...state.slice(index + 1)
        ]
      }
      else{
        return state;
      }
    default:
      return state;
  }
}
