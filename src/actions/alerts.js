import { SET_SYSTEM_ALERT } from '../constants';

export function setSystemAlert(text) {
  return {
    type: SET_SYSTEM_ALERT,
    payload: text
  }
}
