const defaultState = {
    role: "",
    login: ""
}

export default function( state = defaultState, action ) {
    switch ( action.type ) {
        case "FETCH_CURRENT_USER":
            return action.payload;
            break;

        default:
            return state;
    }
}
