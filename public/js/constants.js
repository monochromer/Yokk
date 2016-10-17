export const FETCH_USERS_URI = '/api/user';
export const FETCH_CURRENT_USER_URI = '/api/user/check_permissions';
export const UPDATE_USER_URI = '/api/user/';
export const DELETE_USER_URI = '/api/user/';
export const ADD_USER_URI = '/api/user/add';

export const TIME_ENTRY_CRUD = '/api/timeEntry/';

export const FETCH_REDMINE_TIME_ENTRIES_URI = '/api/sync/redmine';


export function COMBINE_USER_ADDPHOTO_URI(login) {
    return '/api/user/' + login + '/upload_profile_picture';
}
