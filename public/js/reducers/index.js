import users from './users'
import modals from './modals'
import alerts from './alerts'
import currentUser from './currentUser'
import timeEntries from './timeEntries'
import reportRequest from './reportRequest'

import { combineReducers } from 'redux'

export default combineReducers({
    users,
    modals,
    alerts,
    currentUser,
    timeEntries,
    reportRequest
})
