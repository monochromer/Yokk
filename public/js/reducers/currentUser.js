const defaultState = {
    role: "",
    login: ""
}

export default function( state = defaultState, action ) {
    switch ( action.type ) {
        case "SET_USER_PERMISSIONS":
            return Object.assign( {}, state, action.payload );
            break;

        default:
            return state;
    }
}
