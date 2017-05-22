import { FETCH_COMPANIES } from '../constants';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANIES:
      return action.payload
    default:
      return state;
  }
}
