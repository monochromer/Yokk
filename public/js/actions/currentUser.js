import { FETCH_CURRENT_USER_URI } from '../constants'
export function fetchCurrentUser() {
    return {
        type: "FETCH_CURRENT_USER",
        loadItems: FETCH_CURRENT_USER_URI
    }
}
