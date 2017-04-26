import axios from 'axios'
import {
  TEAM_CRUD,
  ADD_TEAM,
  FETCH_TEAMS,
  ADD_TEAM_MEMBERS,
  DELETE_TEAM_MEMBERS,
  DELETE_TEAM,
  CHANGE_TEAM_NAME
} from '../constants'

export function saveTeam(teamName, companyId) {
  return {
    type: ADD_TEAM,
    teamName: teamName,
    companyId: companyId,
    callAPI: `/api/teams/${teamName}`,
    reqType: 'post',
    body: {
      companyId: companyId
    }
  }
}

export function addTeamMembers(teamId, newMembers, companyId) {
  return {
    type: ADD_TEAM_MEMBERS,
    teamId: teamId,
    addToState: {
      newMembers: newMembers
    },
    callAPI: `/api/teams/addTeamMembers`,
    reqType: 'post',
    body: {
      teamId: teamId,
      membersEmails: newMembers,
      companyId: companyId
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
    teamId: teamId,
    callAPI: `/api/teams/${teamId}`,
    reqType: 'delete'
  }
}

export function changeTeamName(teamId, newName, companyId) {
  return {
    type: CHANGE_TEAM_NAME,
    callAPI: `/api/teams/changeName`,
    reqType: 'put',
    teamId: teamId,
    body: {newName, companyId, teamId}
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
    return function(dispatch) {
        axios.post('/login', {username: login, password: password});
        console.log(login + password);
    }
}

export function fetchTEams(companyId) {
  return {
    type: FETCH_TEAMS,
    callAPI: `${TEAM_CRUD}/getTeamsFor/${companyId}`
  }
}
