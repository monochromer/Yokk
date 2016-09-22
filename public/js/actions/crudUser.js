import axios from 'axios';

export function addUser(user) {
    return function (dispatch) {
	    axios.post('/users/add', user)
    		.then( (response) => {
		        dispatch({
		          type: "ADD_USER",
		          payload: response.data
		        })
	      	})
  		
    }
}
