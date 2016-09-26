import _ from 'loDash';

var initialState = {
	users: []
}

var Reducer = function(state = initialState, action) {
	switch (action.type) {
		case "ADD_USER": 
			var newState = Object.assign({}, state);
			newState.users.push(action.payload);
			return newState;
			break;

		case "FETCH_USERS":
			return Object.assign({}, state, { users: action.payload });
			break;	
	}
	
    return state;
}

export default Reducer;
