import { COMPANY_CRUD } from '../constants'
import request from 'superagent'

export function step0(email) {
  return {
    type: "STEP_0",
    createItem: {
      url: COMPANY_CRUD,
      data: {
        email: email,
        step: '0'
      }
    }
  }
}

export function step1(code, email) {
  return {
    type: "STEP_1",
    createItem: {
      url: COMPANY_CRUD,
      data: {
        code: code,
        email: email,
        step: '1'
      }
    }
  }
}


export function step2(login) {
  return {
    type: "STEP_2",
    login: login
  }
}

export function step3(password) {
  return {
    type: "STEP_3",
    password: password
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

export function authUser(login, password) {
  return function (dispatch) {
    request.post('/login').send({ username: login, password: password })
  }
}
