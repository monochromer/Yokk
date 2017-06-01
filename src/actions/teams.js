import {
  TEAM_CRUD,
  ADD_TEAM,
  FETCH_TEAMS,
  ADD_TEAM_MEMBERS,
  DELETE_TEAM_MEMBERS,
  DELETE_TEAM,
  CHANGE_TEAM_NAME
} from '../constants'
import axios from 'axios';

export function addTeam(data, callback) {
  return (dispatch) => {
    axios.post(TEAM_CRUD, data).then((res) => {
      dispatch({
        type: ADD_TEAM,
        payload: res.data
      });
      callback();
    }, (err) => {
      callback(err.response.data);
    });
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
