const defaultState = {
    visible: false,
    login: "",
    userAdd: {
        visible: false
    }
}

export default function( state = defaultState, action ) {
    switch ( action.type ) {
        case "MODAL_DELETE_SHOW":
            return { visible: true, login: action.login };
            break;

        case "MODAL_DELETE_CLOSE":
            return { visible: false };
            break;

        default:
            return state;
    }
}
