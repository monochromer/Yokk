import moment from 'moment'

export const FETCH_CURRENT_USER_URI = '/api/user/check_permissions';

export const USER_CRUD = '/api/user/';

export const USER_TEAM = '/api/user/get/team';

export const TIME_ENTRY_CRUD = '/api/timeEntry/';

export const FETCH_REDMINE_TIME_ENTRIES_URI = '/api/sync/redmine';
export const FETCH_UPWORK_TIME_ENTRIES_URI = '/api/sync/upwork';

export const REPORT_API_URI = '/api/report/';

export const TEAM_CRUD = '/api/teams/';

export function COMBINE_USER_ADDPHOTO_URI(login) {
    return '/api/user/' + login + '/upload_profile_picture';
}

export const REDMINE = {
    name: "Redmine",
    logo: "/img/upwork-logo.svg"
};

export const RANGES = {
    'Today': [
        moment(), moment()
    ],
    'Yesterday': [
        moment().subtract(1, 'days'),
        moment().subtract(1, 'days')
    ],
    'Last 7 Days': [
        moment().subtract(6, 'days'),
        moment()
    ],
    'Last 30 Days': [
        moment().subtract(29, 'days'),
        moment()
    ],
    'This Month': [
        moment().startOf('month'), moment().endOf('month')
    ],
    'Last Month': [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month')
    ]
};
