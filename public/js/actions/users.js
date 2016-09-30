import { FETCH_USERS_URI } from '../constants'

export function fetchUsers() {
    return {
        type: "FETCH_USERS",
        loadItems: FETCH_USERS_URI
    }
}
