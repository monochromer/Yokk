import moment from 'moment';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const MARK_NOTIFICATION = 'MARK_NOTIFICATION';
export const MARK_ALL_NOTIFICATIONS = 'MARK_ALL_NOTIFICATIONS';
export const SET_SYSTEM_ALERT = 'SET_SYSTEM_ALERT';
export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_TEAMS = 'FETCH_TEAMS';
export const ADD_TEAM_MEMBERS = 'ADD_TEAM_MEMBERS';
export const ADD_TEAM = 'ADD_TEAM';
export const DELETE_TEAM_MEMBERS = 'DELETE_TEAM_MEMBERS';
export const DELETE_TEAM = 'DELETE_TEAM';
export const CHANGE_TEAM_NAME = 'CHANGE_TEAM_NAME';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const CREATE_COMPANY = 'CREATE_COMPANY';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const NEW_USER_NOTIFICATION = 'NEW_USER_NOTIFICATION';
export const NEW_TEAM_NOTIFICATION = 'NEW_TEAM_NOTIFICATION';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const INVITE_MEMBER = 'INVITE_MEMBER';
export const ALERT = 'ALERT';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const TIME_ENTRY_CRUD = '/api/timeEntry/';
export const FETCH_REDMINE_TIME_ENTRIES_URI = '/api/sync/redmine';
export const FETCH_UPWORK_TIME_ENTRIES_URI = '/api/sync/upwork';
export const REPORT_API_URI = '/api/report/';
export const COMPANY_CRUD = '/api/company/';
export const TEAM_CRUD = '/api/teams';
export const FETCH_CURRENT_USER_URI = '/api/user/logged_in_user';
export const USER_CRUD = '/api/user/';
export const USER_TEAM = '/api/user/get/team';
export const NOTIFICATIONS_CRUD = '/api/notification/';
export const REGISTER_COMPANY_URL = '/api/register/';
export const REGISTER_USER_URL = '/api/register/user';

export function COMBINE_USER_ADDPHOTO_URI(login) {
  return '/api/user/' + login + '/upload_profile_picture';
}

export const REDMINE = {
  name: 'Redmine',
  logo: '/img/upwork-logo.svg'
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

export const dummy = {
  small: '/img/dummy/960-720.png',
  medium: '/img/dummy/960-720.png',
  original: '/img/dummy/960-720.png'
};
