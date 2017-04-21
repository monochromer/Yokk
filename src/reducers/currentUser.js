import { SET_CURRENT_USER } from '../constants';
import isEmpty from 'lodash/isEmpty';

const initialState = {
	data: {},
	authenticated: false
}

export default (state = initialState, action = {}) => {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				authenticated: !isEmpty(action.user),
				data: action.user
			};
		default: return state;
	}
}