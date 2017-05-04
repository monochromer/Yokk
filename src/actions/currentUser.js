import { SET_CURRENT_USER } from '../constants';
import axios from 'axios';
import { FETCH_CURRENT_USER_URI } from '../constants'

export function login(userData){
	return dispatch => {
    return axios.post('/api/login', userData);
	}
}

export function register(userData){
	return dispatch => {
    return axios.post('/api/register', userData);
	}
}

export function fetchCurrentUser() {
  return {
    type: "FETCH_CURRENT_USER",
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