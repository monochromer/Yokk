import { dummy } from '../constants';

const defaultState = {
  role: '',
  login: '',
  companyId: ''
};

export default function (state = defaultState, action) {
  const newCurrentUser = Object.assign({}, state);
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_CURRENT_USER':
      return Object.assign(newCurrentUser, payload);


    case 'CHANGE_CURRENT_COMPANY':
      return Object.assign(newCurrentUser, { companyId: payload.companyId });


    case 'UPDATE_USER': 
      if (newCurrentUser._id === payload._id) Object.assign(newCurrentUser, payload);
      return newCurrentUser;


    case 'DELETE_PROFILE_IMG':
      return Object.assign(newCurrentUser, { profileImg: dummy });

    default:
      return state;
  }
}
