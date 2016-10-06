import { FETCH_ISSUES_URI, CREATE_ISSUE_URI, DELETE_ISSUE_URI, FETCH_REDMINE_ISSUES_URI, UPDATE_ISSUE_URI } from '../constants'
import moment from 'moment'

export function fetchIssues(from) {
    return {
        type: "FETCH_ISSUES",
        loadItems: FETCH_ISSUES_URI + '?from=' + from
    }
}

export function fetchRedmineIssues() {
    return {
        type: "FETCH_REDMINE_ISSUES",
        loadItems: FETCH_REDMINE_ISSUES_URI
    }
}

export function createIssue(issue) {
    return {
        type: "CREATE_ISSUE",
        createItem: {
            url: CREATE_ISSUE_URI,
            data: issue
        }
    }
}

export function deleteIssue(id) {
    return {
        type: "DELETE_ISSUE",
        deleteItem: {
            url: DELETE_ISSUE_URI + id
        }
    }
}

export function updateIssue(issue) {
    console.log(issue);
    return {
        type: "UPDATE_ISSUE",
        updateItem: {
            url: UPDATE_ISSUE_URI + issue._id,
            data: issue
        }
    }
}
