import _ from 'loDash'

var initialState = {
	users: [
		{
			id: _.uniqueId("id"),
			fullname: "Max",
			position: "Developer",
			joinedOn: "19.09.2016"
		},
		{	
			id: _.uniqueId("id"),
			fullname: "Oleg",
			position: "Developer",
			joinedOn: "19.09.2016"
		}
	],
	newUser: {}
}

var Reducer = function(state = initialState, action) {
    return state;
}

export default Reducer;
