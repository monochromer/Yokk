import { SET_CURRENT_USER } from '../constants';
import axios from 'axios';

export function login(userData){
	return dispatch => {
    if(userData.auth){
      return axios.post('/api/login', userData);
    }
    else{
      return axios.post('/api/register', userData);
    }
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
	delete axios.defaults.headers.common['Authorization'];
	return({
		type: SET_CURRENT_USER,
		authenticated: false,
		email: null
	});
}