import _ from 'lodash'

const defaultState = [];

export default function(state = defaultState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case "ADD_USER":
            return [...state, payload];
            break;

        case "DELETE_USER":
            return _.filter(state, (o) => o.login != payload);
            break;

        case "UPDATE_USER":
            const newState = _.filter(state, (o) => o.login != payload.login);
            return [...newState, payload];
            break;

        case "FETCH_USERS":
            return payload;
            break;

        case "FETCH_TEAM_USERS":
            return payload;
            break;

        default:
            return state;
    }
}
