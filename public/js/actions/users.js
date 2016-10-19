import request from 'superagent';
import {
    USER_CRUD,
    COMBINE_USER_ADDPHOTO_URI,
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

export function deleteUser(login) {
    return {
        type: "DELETE_USER",
        deleteItem: {
            url: USER_CRUD + login
        }
    }
}

export function updateUser(user) {
    return function (dispatch) {
        request.put(USER_CRUD + user.login).send(user).end((err, response) => {
            dispatch({
                type: "UPDATE_USER",
                payload: response.body
            });
            dispatch({
                type: "ALERT_SHOW",
                class: "success",
                text: updateUserSuccess(user.login)
            });
            dispatch({type: "MODAL_CHANGE_PASSWORD_CLOSE"});
        });
    }
}

export function addUser(user) {
    return function (dispatch) {
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
            dispatch({type: "MODAL_ADD_USER_CLOSE"});
        });
    }
}

export function uploadUserPhoto(files, login) {
    return function (dispatch) {
        request.post(COMBINE_USER_ADDPHOTO_URI(login)).attach('pic', files[0]).end(function (err, response) {
            dispatch({
                type: "UPDATE_USER",
                payload: response.body
            });
            dispatch({
                type: "ALERT_SHOW",
                class: "success",
                text: addPhotoSuccess(login)
            });
        });
    }
}
