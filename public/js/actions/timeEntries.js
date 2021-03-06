import {
    FETCH_REDMINE_TIME_ENTRIES_URI,
    FETCH_UPWORK_TIME_ENTRIES_URI,
    TIME_ENTRY_CRUD
} from '../constants'

export function fetchNextTimeEntryBatch(skip, limit) {
    return {
        type: "FETCH_NEXT_TIME_ENTRY_BATCH",
        loadItems: TIME_ENTRY_CRUD + '?skip=' + skip + '&limit=' + limit
    }
}

export function initializeUserActivity(skip, limit, user, from, to) {
    return {
        type: "INITIALIZE_USER_ACTIVITY",
        loadItems: TIME_ENTRY_CRUD + '?skip=' + skip + '&limit=' + limit + '&login=' + user,
        user: user
    }
}

export function fetchUserActivityFilteredByDate(range, dateStrings) {
    const {from, to} = range;
    return {
        type: "FETCH_USER_ACTIVITY",
        loadItems: TIME_ENTRY_CRUD + '?from=' + from + '&to=' + to + '&dateStrings=' + dateStrings
    }
}


export function fetchCustomUserNextTimeEntryBatch(skip, limit, user, from, to) {
    return {
        type: "FETCH_USER_ACTIVITY",
        loadItems: TIME_ENTRY_CRUD + '?skip=' + skip + '&limit=' + limit + '&login=' + user,
        user: user
    }
}

export function fetchNextTimeEntryBatchWhenChangingDate(skip, limit, user, from, to) {
    return {
        type: "FETCH_USER_ACTIVITY",
        loadItems: TIME_ENTRY_CRUD + '?skip=' + skip + '&limit=' + limit + '&login=' + user + '&from=' + from + '&to=' + to,
        user: user
    }
}

export function fetchRedmineTimeEntries() {
    return {
        type: "FETCH_REDMINE_TIME_ENTRIES",
        loadItems: FETCH_REDMINE_TIME_ENTRIES_URI
    }
}

export function fetchUpworkTimeEntries() {
    return {
        type: "FETCH_UPWORK_TIME_ENTRIES",
        loadItems: FETCH_UPWORK_TIME_ENTRIES_URI
    }
}

export function createTimeEntry(timeEntry) {
    return {
        type: "CREATE_TIME_ENTRY",
        createItem: {
            url: TIME_ENTRY_CRUD,
            data: timeEntry
        }
    }
}

export function deleteTimeEntry(id) {
    return {
        type: "DELETE_TIME_ENTRY",
        deleteItem: {
            url: TIME_ENTRY_CRUD + id
        }
    }
}

export function updateTimeEntry(timeEntry) {
    return {
        type: "UPDATE_TIME_ENTRY",
        updateItem: {
            url: TIME_ENTRY_CRUD + timeEntry._id,
            data: timeEntry
        }
    }
}
