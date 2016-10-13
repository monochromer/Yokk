import request from 'superagent';
import {
    ADD_USER_URI,
    COMBINE_USER_ADDPHOTO_URI,
    FETCH_USERS_URI,
    UPDATE_USER_URI,
    DELETE_USER_URI
} from '../constants'

import {
    addUserSuccess,
    addPhotoSuccess,
    updateUserSuccess
} from '../utils/alerts/users'

export function fetchUsers() {
    return {
        type: "FETCH_USERS",
        loadItems: FETCH_USERS_URI
    }
}

export function deleteUser(login) {
    return {
        type: "DELETE_USER",
        deleteItem: {
            url: DELETE_USER_URI + login
        }
    }
}

export function updateUser(user) {
    return function(dispatch) {
        request.put(UPDATE_USER_URI + user.login).send(user).end((err, response) => {
            dispatch({
                type: "UPDATE_USER",
                payload: response.body
            });
            dispatch({
                type: "ALERT_SHOW",
                class: "success",
                text: updateUserSuccess(user.login)
            });
        });
    }
}

export function addUser(user) {
    return function(dispatch) {
        request.post(ADD_USER_URI).send(user).end((err, response) => {
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
    return function(dispatch) {
        request.post(COMBINE_USER_ADDPHOTO_URI(login)).attach('pic', files[0]).end(function(err, response) {
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
