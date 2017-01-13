import { browserHistory } from 'react-router'

var initialState = {
  companies: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case "GET_LIST_OF_USER_COMPANIES":
      console.log(payload);
      return Object.assign({}, state, { email: action.createItem.data.email });
      break;

    default:
      return state;
      break;
  }
}
