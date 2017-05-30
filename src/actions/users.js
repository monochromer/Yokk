import axios from 'axios';
import {
  USER_CRUD,
  COMBINE_USER_ADDPHOTO_URI,
  USER_TEAM,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS
} from '../constants'

import {
  addUserSuccess
  // addPhotoSuccess,
  // updateUserSuccess
} from '../utils/alerts/users'

export function fetchUsers() {
  return {
    type: FETCH_USERS,
    loadItems: USER_CRUD
  }
}

export function fetchTeamUsers() {
  return {
    type: "FETCH_TEAM_USERS",
    loadItems: USER_TEAM
  }
}

export function deleteUser(user, callback) {
  return (dispatch) => {
    const data = user.companyId ? {companyId: user.companyId} : {};
    axios.delete(USER_CRUD + user._id, {data}).then((res) => {
      dispatch({
        type: DELETE_USER,
        payload: user
      });
      if(callback){
        callback();
      }
    }, (err) => {
      if(callback){
        callback(err.response.data);
      }
    });
  };
}

export function updateUser(userId, fields, callback) {
  return (dispatch) => {
    axios.put(USER_CRUD + userId, fields).then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: {
          fields,
          userId
        }
      });
      if(callback){
        callback();
      }
    }, (err) => {
      if(callback){
        callback(err.response.data);
      }
    });
  };
}

export function linkServiceOpen(userId, service) {
  return {
    type: "LINK_SERVICE_OPEN",
    service: service,
    userId: userId
  }
}

export function linkService(id, fields) {
  return {
    type: "LINK_SERVICE",
    updateItem: {
      url: USER_CRUD + id,
      data: fields
    }
  }
}

export function addUser(user, callback) {
  return function(dispatch) {
    axios.post(USER_CRUD, user).then((resp) => {
      dispatch({
        type: "ADD_USER",
        payload: resp.data
      });
      dispatch({
        type: "ALERT_SHOW",
        text: addUserSuccess(user.login),
        class: "success"
      });
      dispatch({ type: "MODAL_ADD_USER_CLOSE" });
      callback();
    }, (err) => {
      callback(err.response.data);
    });
  }
}

export function uploadUserPhoto(files, userId) {
  return function(dispatch) {
    dispatch({type: "PHOTO_UPLOADING_START"});
    var data = new FormData();
    data.append('pic', files[0]);
    axios.post(COMBINE_USER_ADDPHOTO_URI(userId), data).then((response) => {
      dispatch({
        type: "UPDATE_USER_PHOTO",
        payload: response.data,
        userId
      })
    });
  }
}

export function deleteUserPhoto(userId) {
 return {
  type: "DELETE_PROFILE_IMG",
  callAPI: `/api/user/${userId}/upload_profile_picture`,
  reqType: 'delete',
  userId: userId
 }
}
