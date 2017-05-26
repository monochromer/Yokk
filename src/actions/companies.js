import {
  COMPANY_CRUD,
  FETCH_COMPANIES,
  CREATE_COMPANY,
  UPDATE_COMPANY,
} from '../constants';
import axios from 'axios';

export function fetchCompanies() {
  return {
    type: FETCH_COMPANIES,
    loadItems: COMPANY_CRUD
  }
}

export function createCompany(data, callback) {
	return dispatch => {
    axios.post(COMPANY_CRUD, data).then((res) => {
      dispatch({
        type: CREATE_COMPANY,
        payload: res.data
      });
      callback();
    }, (err) => {
      callback(err.response.data);
    });
	}
}

export function updateCompany(companyId, data, callback) {
	return dispatch => {
    axios.put(COMPANY_CRUD + companyId, data).then((res) => {
      dispatch({
        type: UPDATE_COMPANY,
        payload: data,
        companyId
      });
      callback();
    }, (err) => {
      callback(err.response.data);
    });
	}
}
