export const FETCH_CURRENT_USER_URI = '/api/user/check_permissions';

export const USER_CRUD = '/api/user/';

export const USER_TEAM = '/api/user/get/team';

export const TIME_ENTRY_CRUD = '/api/timeEntry/';

export const FETCH_REDMINE_TIME_ENTRIES_URI = '/api/sync/redmine';

export const REPORT_API_URI = '/api/report/';

export const TEAM_CRUD = '/api/teams/';

export function COMBINE_USER_ADDPHOTO_URI(login) {
    return '/api/user/' + login + '/upload_profile_picture';
}
