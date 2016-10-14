import _ from 'lodash'

const defaultState = {};

export default function(state = defaultState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case "ADD_USER_TO_REPORT":
            let addUserState = Object.assign({}, state);
            if (!addUserState.usersIds) {
                addUserState.usersIds = []
            };
            // if (!_.includes(newState.usersIds, payload.id)) {
            //     newState.usersIds.push(id)
            // };
            addUserState.usersIds.push(payload.id)
            return addUserState;
            break;

        case "DELETE_USER_FROM_REPORT":
            let deleteUserState = Object.assign({}, state);
            _.remove(deleteUserState.usersIds, function(id) {
                return id === payload.id;
            });
            return deleteUserState;
            break;

        case "CHOOSE_PERIOD_FOR_REPORT":
            console.log(payload);
            return payload;
            break;

        default:
            return state;
    }
}
