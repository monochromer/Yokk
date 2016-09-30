import { FETCH_USERS_URI, UPDATE_USER_URI } from '../constants'

export function fetchUsers() {
    return {
        type: "FETCH_USERS",
        loadItems: FETCH_USERS_URI
    }
}

export function updateUser(user) {
    return {
        type: "UPDATE_USER",
        updateItem: {
            url: UPDATE_USER_URI + user.login,
            data: user
        }
    }
}
