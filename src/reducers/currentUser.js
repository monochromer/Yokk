import { SET_CURRENT_USER } from '../constants';
import isEmpty from 'lodash/isEmpty';

const initialState = {
	_id: '',
	authenticated: false
}

export default (state = initialState, action = {}) => {

  switch (action.type) {
		case SET_CURRENT_USER:
			return {
				authenticated: !isEmpty(action.user),
        _id: action.user ? action.user._id : null
			};
    default:
      return state;
  }
}
