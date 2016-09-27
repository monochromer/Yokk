import _ from 'loDash';

var initialState = {
	users: [],
	alert: {
		visible: false,
		class: "",
		text: ""
	},
	modalDelete: {
		visible: false,
		login: ""
	}
}

var Reducer = function(state = initialState, action) {
	switch (action.type) {
		
		case "MODAL_DELETE_SHOW": 
			var modalDelete = {
				visible: true,
				login: action.login
			}
			return Object.assign({}, state, { modalDelete: modalDelete }); 
			break;

		case "MODAL_DELETE_CLOSE":
			var modalDelete = { visible: false };
			return Object.assign({}, state, { modalDelete: modalDelete });
			break; 	

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

		case "DELETE_USER":
			var newState = Object.assign({}, state);
			newState.users = _.filter(state.users, (o) => o.login != action.payload);
			return newState; 	

		case "CHANGE_USER":
			var newState = Object.assign({}, state);
			newState.users = _.filter(state.users, (o) => o.login != action.payload.login); 
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
