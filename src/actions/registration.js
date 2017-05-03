import { COMPANY_CRUD, USER_CRUD } from '../constants';
import axios from 'axios';

export function checkCompanyEmail(email, callback){
  return (dispatch) => {
    axios.post(COMPANY_CRUD, {
      email: email,
      step: '0'
    }).then((resp) => {
      dispatch({type: "STEP_0", payload: resp.data});
    }, (err) => {
      callback(err.response.data);
    });
  }
}

export function checkConfirmationCode(code, email, callback){
  return (dispatch) => {
    axios.post(COMPANY_CRUD, {
      code: code,
      email: email,
      step: '1'
    }).then((resp) => {
      dispatch({type: "STEP_1", payload: resp.data});
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

export function step3(user, callback) {
  return function(dispatch) {
    axios.post(USER_CRUD, user).then((resp) => {
      dispatch({
        type: "STEP_3",
        payload: resp.data
      });
      callback();
    }, (err) => {
      callback(err.response.data);
    });
  }
}

export function step4(teamName, email) {
  return {
    type: "STEP_4",
    teamName: teamName,
    createItem: {
      url: COMPANY_CRUD,
      data: {
        name: teamName,
        email: email,
        step: '4'
      }
    }
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
