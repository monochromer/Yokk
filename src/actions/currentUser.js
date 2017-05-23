import {
  SET_CURRENT_USER,
  FETCH_CURRENT_USER,
  FETCH_CURRENT_USER_URI,
  REGISTER_USER_URL
} from '../constants';
import axios from 'axios';

export function login(userData){
	return dispatch => {
    return axios.post('/api/login', userData);
	}
}

export function register(userData){
	return dispatch => {
    return axios.post(REGISTER_USER_URL, userData);
	}
}

export function sendResetPasswordLink(userData){
	return dispatch => {
    return axios.post('/api/resetPassword/sendLink', userData);
	}
}

export function resetPassword(userData){
	return dispatch => {
    return axios.post('/api/resetPassword', userData);
	}
}

export function fetchCurrentUser() {
  return {
    type: FETCH_CURRENT_USER,
    loadItems: FETCH_CURRENT_USER_URI
  }
}

export function setCurrentUser(user){
	return {
		type: SET_CURRENT_USER,
		user
	};
}

export function changeCurrentCompany(companyId) {
  return {
    type: "CHANGE_CURRENT_COMPANY",
    payload: {
      companyId: companyId
    }
  }
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
