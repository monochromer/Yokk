const defaultState = {
    visible: false,
    login: ""
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case "MODAL_DELETE_SHOW":
            var modalDelete = {
                visible: true,
                login: action.login
            }
            return Object.assign({}, state, {
                modalDelete: modalDelete
            });
            break;

        case "MODAL_DELETE_CLOSE":
            var modalDelete = {
                visible: false
            };
            return Object.assign({}, state, {
                modalDelete: modalDelete
            });
            break;

        default:
            return state;
    }
}
