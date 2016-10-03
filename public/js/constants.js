export const FETCH_USERS_URI = '/api/user'
export const FETCH_CURRENT_USER_URI = '/api/user/check_permissions'
export const UPDATE_USER_URI = '/api/user/'
export const DELETE_USER_URI = '/api/user/'
export const ADD_USER_URI = '/api/user/add'
export const FETCH_ISSUES_URI = '/redmine/issues'
export const CREATE_ISSUE_URI = '/api/task/add'

export function COMBINE_USER_ADDPHOTO_URI(login) {
    return '/api/user/' + login + '/upload_profile_picture';
}
