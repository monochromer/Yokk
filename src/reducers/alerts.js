const defaultState = {
    visible: false,
    class: "",
    text: ""
}

export default function( state = defaultState, action ) {
    switch ( action.type ) {
        case "ALERT_SHOW":
            return { visible: true, text: action.text, class: action.class }

        case "ALERT_CLOSE":
            return { visible: false }

        default:
            return state;
    }
}
