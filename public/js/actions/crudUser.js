import axios from 'axios';

export function addUser(user) {
    return function (dispatch) {
	    axios.post('/users/add', user)
    		.then( (response) => {
		        dispatch({
		          type: "ADD_USER",
		          payload: response.data
		        });
		        dispatch({
		          type: "ALERT_SHOW",
		          text: "User " + user.login + " has been added!",
		          class: "success" 
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

export function changeUser(login, fields) {
	return function(dispatch) {
		axios.put('/user/' + login, fields)
			.then( (response) => {
				dispatch({
					type: "CHANGE_USER",
					payload: response.data
		        })
			}); 
	}
}

export function deleteUser(login) {
	return function(dispatch) {
		axios.delete('/user/' + login)
			.then( (response) => {
				dispatch({
					type: "DELETE_USER",
					payload: response.data
		        })
			}); 
	}
}
