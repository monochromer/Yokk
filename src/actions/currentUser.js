import { SET_CURRENT_USER } from '../constants';
import axios from 'axios';

export function login(userData){
	return dispatch => {
		return axios.post('/api/login', userData);
	}
}

export function setCurrentUser(user){
	return {
		type: SET_CURRENT_USER,
		user
	};
}

export function logout(){
	localStorage.removeItem('jwtToken');
	localStorage.setItem('sessionEnd', Date.now());
	delete axios.defaults.headers.common['Authorization'];
	return({
		type: SET_CURRENT_USER,
		authenticated: false,
		email: null
	});
}