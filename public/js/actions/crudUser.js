import axios from 'axios';

export function addUser(user) {
    return function (dispatch) {
	    axios.post('/users/add', user)
    		.then( (response) => {
		        dispatch({
		          type: "ADD_USER",
		          payload: response.data
		        })
	      	});
  		
    }
}

export function fetchUsers() {
	return function(dispatch) {
		axios.get('/user')
			.then( (response) => {
				dispatch({
					type: "FETCH_USERS",
					payload: response.data
		        })
			}); 
	}
}
