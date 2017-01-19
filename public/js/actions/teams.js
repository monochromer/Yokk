import {
  TEAM_CRUD,
  ADD_TEAM,
  FETCH_TEAMS,
  ADD_TEAM_MEMBERS,
  DELETE_TEAM_MEMBERS,
  DELETE_TEAM,
  CHANGE_TEAM_NAME
} from '../constants'
import request from 'superagent'

export function saveTeam(teamName, companyId) {
  return {
    type: ADD_TEAM,
    teamName: teamName,
    companyId: companyId,
    callAPI: `/api/teams/${teamName}`,
    reqType: 'post'
  }
}

export function addTeamMembers(teamId, newMembers, companyId) {
  request
    .post(`/api/teams/addTeamMembers`)
    .send({
      teamId: teamId,
      membersEmails: newMembers,
      companyId: companyId
    })
    .end((err, res) => {
      if (err) console.log(err)
    })
  return {
    type: ADD_TEAM_MEMBERS,
    teamId: teamId,
    addToState: {

      newMembers: newMembers
    }
  }
}

export function deleteTeamMembers(teamId, userId) {
  return {
    type: DELETE_TEAM_MEMBERS,
    teamId: teamId,
    userId: userId
  }
}

export function deleteTeam(teamId, userId) {
  return {
    type: DELETE_TEAM,
    teamId: teamId
  }
}

export function changeTeamName(teamId, newName) {
  return {
    type: CHANGE_TEAM_NAME,
    teamId: teamId,
    newName: newName
  }
}

export function closeAddTeamMembersModal() {
  return {
    type: "MODAL_ADD_USER_CLOSE"
  }
}

export function step0(email) {
  return {
    type: "STEP_0",
    createItem: {
      url: TEAM_CRUD,
      data: {
        email: email,
        step: '0'
      }
    }
  }
}

export function step1(code, email) {
  console.log(arguments);
  return {
    type: "STEP_1",
    createItem: {
      url: TEAM_CRUD,
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
      url: TEAM_CRUD,
      data: {
        name: teamName,
        email: email,
        step: '4'
      }
    }
  }
}

export function step5(teamName, addMembers) {
  return {
    type: "STEP_5",
    updateItem: {
      url: TEAM_CRUD + teamName,
      data: {
        addMembers: addMembers,
        step: 5
      }
    }
  }
}

export function authUser(login, password) {
  return function (dispatch) {
    request.post('/login').send({ username: login, password: password });
    console.log(login + password);
  }
}

export function fetchTEams(companyId) {
  return {
    type: FETCH_TEAMS,
    callAPI: `${TEAM_CRUD}/getTeamsFor/${companyId}`
  }
}
