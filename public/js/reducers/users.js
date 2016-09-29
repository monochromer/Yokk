import _ from 'lodash'

const defaultState = [ ]

export default function( state = defaultState, action ) {
    const { type, payload } = action;

    switch ( type ) {
        case "ADD_USER":
            var newState = Object.assign( {}, state );
            newState.push( action.payload );
            return newState;
            break;
        case "DELETE_USER":
            var newState = Object.assign( {}, state );
            newState = _.filter( state, ( o ) => o.login != action.payload );
            return newState;

        case "CHANGE_USER":
            var newState = Object.assign( {}, state );
            newState = _.filter( state, ( o ) => o.login != action.payload.login );
            newState.push( action.payload );
            return newState;
            break;

        case "FETCH_USERS":
            return state.concat( action.payload );
            break;

        default:
            return state;
    }
}
