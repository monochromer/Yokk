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
    }
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

        case "MODAL_DELETE_CLOSE":
            return Object.assign({}, state, {
                userDelete: {
                    visible: false
                }
            });

        case "MODAL_ADD_USER_SHOW":
            return Object.assign({}, state, {
                userAdd: {
                    visible: true
                }
            })
        case "MODAL_ADD_USER_CLOSE":
            return Object.assign({}, state, {
                userAdd: {
                    visible:false
                }
            })

        case "MODAL_CHANGE_PASSWORD_SHOW":
            return Object.assign({}, state, {
                userChangePassword: {
                    visible: true,
                    login: action.login
                }
            })

        case "MODAL_CHANGE_PASSWORD_CLOSE":
            return Object.assign({}, state, {
                userChangePassword: {
                    visible: false
                }
            })

        default:
            return state;
    }
}
