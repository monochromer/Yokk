import { FETCH_ISSUES_URI } from '../constants'

export function fetchIssues() {
    return {
        type: "FETCH_ISSUES",
        loadItems: FETCH_ISSUES_URI
    }
}
