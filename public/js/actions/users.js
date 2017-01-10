import request from 'superagent';
import {
    USER_CRUD,
    COMBINE_USER_ADDPHOTO_URI,
    USER_TEAM
} from '../constants'

import {
    addUserSuccess,
    addPhotoSuccess,
    updateUserSuccess
} from '../utils/alerts/users'

export function fetchUsers() {
    return {
        type: "FETCH_USERS",
        loadItems: USER_CRUD
    }
}

export function fetchTeamUsers() {
    return {
        type: "FETCH_TEAM_USERS",
        loadItems: USER_TEAM
    }
}

export function deleteUser(login) {
    return {
        type: "DELETE_USER",
        deleteItem: {
            url: USER_CRUD + login
        }
    }
}

export function updateUser(id, fields) {
    return {
        type: "UPDATE_USER",
        updateItem: {
            url: USER_CRUD + id,
            data: fields
        }
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

export function addUser(user) {
    return function(dispatch) {
        request.post(USER_CRUD).send(user).end((err, response) => {
            dispatch({
                type: "ADD_USER",
                payload: response.body
            });
            dispatch({
                type: "ALERT_SHOW",
                text: addUserSuccess(user.login),
                class: "success"
            });
            dispatch({ type: "MODAL_ADD_USER_CLOSE" });
        });
    }
}

export function uploadUserPhoto(files, login) {
    return function(dispatch) {
        dispatch({type: "PHOTO_UPLOADING_START"});
        request.post(COMBINE_USER_ADDPHOTO_URI(login)).attach('pic', files[0]).end(function(err, response) {
            dispatch({
                type: "UPDATE_USER",
                payload: response.body
            })
        });
    }
}

export function deleteUserPhoto(photoId) {
  return {
    type: ""
  }
}
