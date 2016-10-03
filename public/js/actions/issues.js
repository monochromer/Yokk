import { FETCH_ISSUES_URI, CREATE_ISSUE_URI } from '../constants'

export function fetchIssues() {
    return {
        type: "FETCH_ISSUES",
        loadItems: FETCH_ISSUES_URI
    }
}

export function createIssue(issue) {
    return {
        type: "CREATE_ISSUE",
        createItem: {
            url: "CREATE_ISSUE_URI",
            data: issue
        }
    }
}
