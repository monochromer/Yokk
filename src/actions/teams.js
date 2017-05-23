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

export function addTeamMembers(teamId, newMembers, companyId, userName, companyName) {
  return {
    type: ADD_TEAM_MEMBERS,
    teamId: teamId,
    addToState: {
      newMembers: newMembers
    },
    callAPI: `/api/teams/addTeamMembers`,
    reqType: 'post',
    body: {
      teamId,
      membersEmails: newMembers,
      companyId,
      userName,
      companyName
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

export function fetchTeams(companyId) {
  return {
    type: FETCH_TEAMS,
    loadItems: TEAM_CRUD
  }
}
