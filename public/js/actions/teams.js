import { TEAM_CRUD, FETCH_TEAMS, ADD_TEAM_MEMBERS } from '../constants'
import request from 'superagent'

export function saveTeam(teamName, companyId) {
  request
    .post(`/api/teams/${teamName}`)
    .send({ companyId: companyId })
    .end((err, res) => {
      if (err) console.log(err)
      // console.log(res)
    })
}

export function addTeamMembers(teamId, newMembers) {
  request
    .post(`/api/teams/addTeamMembers`)
    .send({
      teamId: teamId,
      membersEmails: newMembers
    })
    .end((err, res) => {
      if (err) console.log(err)
      // console.log(res)
    })
  return {
    type: ADD_TEAM_MEMBERS,
    addToState: {
      teamId: teamId,
      newMembers: newMembers
    }
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
        request.post('/login').send({username: login, password: password});
        console.log(login + password);
    }
}

export function fetchTEams(companyId) {
    return {
      type: FETCH_TEAMS,
      callAPI: `${TEAM_CRUD}/getTeamsFor/${companyId}`
    }
}
