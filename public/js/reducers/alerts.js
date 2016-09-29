const defaultState = {
    visible: false,
    class: "",
    text: ""
}

export default function( state = defaultState, action ) {
    switch ( action.type ) {
        case "ALERT_SHOW":
            return { visible: true, text: action.text, class: action.class }
            break;

        case "ALERT_CLOSE":
            return { visible: false }
            break;

        default:
            return state;
    }
}
