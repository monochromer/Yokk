import {
  FETCH_NOTIFICATIONS,
  MARK_NOTIFICATION,
  MARK_ALL_NOTIFICATIONS,
  NOTIFICATIONS_CRUD
} from '../constants';
import axios from 'axios';

export function fetchNotifications() {
  return dispatch => {
    axios.get(NOTIFICATIONS_CRUD).then((res) => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        notifications: res.data
      });
    }, (err) => {
      console.log('Failed to load notifications ', err);
    });
  }
}

export function markNotification(_id){
  return dispatch => {
    axios.post(NOTIFICATIONS_CRUD + _id).then((res) => {
      dispatch({
        type: MARK_NOTIFICATION,
        _id
      });
    }, (err) => {
      console.log('Failed to mark notification ', err);
    });
  }
}

export function markAllNotifications(){
  return dispatch => {
    axios.post(NOTIFICATIONS_CRUD).then((res) => {
      dispatch({
        type: MARK_ALL_NOTIFICATIONS
      });
    }, (err) => {
      console.log('Failed to mark all notifications ', err);
    });
  }
}
