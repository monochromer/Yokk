const defaultState = {
    userDelete: {
        visible: false,
        login: "",
    },
    userAdd: {
        visible: false
    },
    userChangePassword: {
        visible: false
    },
    teamId: ""
}

export default function( state = defaultState, action ) {
    switch ( action.type ) {
        case "MODAL_DELETE_SHOW":
            return Object.assign({}, state, {
                userDelete: {
                    visible: true,
                    login: action.login
                }
            });
            break;

        case "MODAL_DELETE_CLOSE":
            return Object.assign({}, state, {
                userDelete: {
                    visible: false
                }
            });
            break;

        case "MODAL_ADD_USER_SHOW":
            return Object.assign({}, state, {
                userAdd: {
                    visible: true
                },
                teamId: action.teamId
            })
            break;
        case "MODAL_ADD_USER_CLOSE":
            return Object.assign({}, state, {
                userAdd: {
                    visible:false
                }
            })
            break;

        case "MODAL_CHANGE_PASSWORD_SHOW":
            return Object.assign({}, state, {
                userChangePassword: {
                    visible: true,
                    login: action.login
                }
            })
            break;

        case "MODAL_CHANGE_PASSWORD_CLOSE":
            return Object.assign({}, state, {
                userChangePassword: {
                    visible: false
                }
            })
            break;

        default:
            return state;
    }
}
