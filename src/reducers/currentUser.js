import { SET_CURRENT_USER } from '../constants';
import isEmpty from 'lodash/isEmpty';
import { dummy } from '../constants';

const initialState = {
	data: {
    role: '',
    login: '',
    companyId: ''
  },
	authenticated: false
}

export default (state = initialState, action = {}) => {

  switch (action.type) {
		case SET_CURRENT_USER:
			return {
				authenticated: !isEmpty(action.user),
				data: {
          ...state.data,
          _id: action.user._id,
          login: action.user.login
        }
			};
    case 'FETCH_CURRENT_USER':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case 'CHANGE_CURRENT_COMPANY':
      return {
        ...state,
        data: {
          ...state.data,
          companyId: action.payload.companyId
        }
      };
    case 'UPDATE_USER': 
      if (state.data._id !== action.payload._id){
        return {
          ...state,
          data: {
            ...state.data,
            ...action.payload
          }
        };
      }
      else{
        return state;
      }
    case 'DELETE_PROFILE_IMG':
      return {
        ...state,
        data: {
          ...state.data,
          profileImg: dummy
        }
      };
    case 'CREATE_COMPANY':
      let newState = {...state};
      newState.data.companies.push(action.payload);
      return newState;
    default:
      return state;
  }
}
