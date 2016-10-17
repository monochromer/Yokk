import {
    FETCH_NEXT_TIME_ENTRY_BATCH_URI,
    CREATE_TIME_ENTRY_URI,
    DELETE_TIME_ENTRY_URI,
    FETCH_REDMINE_TIME_ENTRIES_URI,
    UPDATE_TIME_ENTRY_URI
} from '../constants'
import moment from 'moment'

export function fetchNextTimeEntryBatch(skip, limit) {
    return {
        type: "FETCH_NEXT_TIME_ENTRY_BATCH",
        loadItems: FETCH_NEXT_TIME_ENTRY_BATCH_URI + '?skip=' + skip + '&limit=' + limit
    }
}

export function fetchCustomUserNextTimeEntryBatch(skip, limit, user) {
    return {
        type: "FETCH_USER_ACTIVITY",
        loadItems: FETCH_NEXT_TIME_ENTRY_BATCH_URI + '?skip=' + skip + '&limit=' + limit + '&user=' + user
    }
}

export function fetchRedmineTimeEntries() {
    return {
        type: "FETCH_REDMINE_TIME_ENTRIES",
        loadItems: FETCH_REDMINE_TIME_ENTRIES_URI
    }
}

export function createTimeEntry(timeEntry) {
    return {
        type: "CREATE_TIME_ENTRY",
        createItem: {
            url: CREATE_TIME_ENTRY_URI,
            data: timeEntry
        }
    }
}

export function deleteTimeEntry(id) {
    return {
        type: "DELETE_TIME_ENTRY",
        deleteItem: {
            url: DELETE_TIME_ENTRY_URI + id
        }
    }
}

export function updateTimeEntry(timeEntry) {
    console.log(timeEntry);
    return {
        type: "UPDATE_TIME_ENTRY",
        updateItem: {
            url: UPDATE_TIME_ENTRY_URI + timeEntry._id,
            data: timeEntry
        }
    }
}
