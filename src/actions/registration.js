import { COMPANY_CRUD } from '../constants';
import axios from 'axios';

export function checkCompanyEmail(email, callback){
  return (dispatch) => {
    axios.post(COMPANY_CRUD, {
      email,
      step: '0'
    }).then(() => {
      dispatch({type: "STEP_0", email});
      callback();
    }, (err) => {
      callback(err.response.data);
    });
  }
}

export function checkConfirmationCode(code, email, callback){
  return (dispatch) => {
    axios.post(COMPANY_CRUD, {
      code,
      email,
      step: '1'
    }).then(() => {
      dispatch({type: "STEP_1", code, email});
    }, (err) => {
      dispatch({type: "STEP_1_FAILED"});
      callback(err.response.data);
    });
  }
}


export function step2(firstName, lastName) {
  return {
    type: "STEP_2",
    firstName,
    lastName
  }
}

export function step3(password) {
  return {
    type: "STEP_3",
    password
  };
}

export function step4(companyName) {
  return {
    type: "STEP_4",
    companyName
  }
}

export function finishRegistration(data) {
  return function(dispatch) {
    return axios.post(COMPANY_CRUD, data);
  }
}

export function createCompany(name, originatorEmail) {
  return {
    type: "CREATE_COMPANY",
    createItem: {
      url: 'api/add-company',
      data: {name}
    }
  }
}
