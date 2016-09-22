import _ from 'loDash'

var initialState = {
	users: [
		{
			_id: _.uniqueId("id"),
			login: "Max",
			position: "Developer",
			joinedOn: "19.09.2016"
		},
		{	
			_id: _.uniqueId("id"),
			login: "Oleg",
			position: "Developer",
			joinedOn: "19.09.2016"
		}
	],
	newUser: {}
}

var Reducer = function(state = initialState, action) {
	switch (action.type) {
		case "ADD_USER": 
			var newState = Object.assign({}, state);
			newState.users.push(action.payload);
			return newState;
		break;	
	}
	
    return state;
}

export default Reducer;
