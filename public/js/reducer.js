import _ from 'loDash';

var initialState = {
	users: [],
	alert: {
		visible: false,
		class: "",
		text: ""
	}
}

var Reducer = function(state = initialState, action) {
	switch (action.type) {
		
		case "ALERT_SHOW": 
			var alert = {
				visible: true,
				text: action.text,
				class: action.class
			}
			return Object.assign({}, state, { alert: alert });
		break;
		
		case "ALERT_CLOSE":
			return Object.assign({}, state, 
				{ 
					alert: { 
						visible: false 
					} 
				} 
			);
			break;	

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
