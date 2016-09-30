import axios from 'axios';
import request from 'superagent';


export function addUser(user) {
    return function (dispatch) {
	    axios.post('/api/users/add', user)
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

export function deleteUser(login) {
	return function(dispatch) {
		axios.delete('/api/user/' + login)
			.then( (response) => {
				dispatch({
					type: "DELETE_USER",
					payload: response.data
		        });

		        dispatch({ type: "MODAL_DELETE_CLOSE" });

		        var text = "User " + login + " has been succesfully deleted!";
		        dispatch({ type: "ALERT_SHOW", class: "success", text: text });
			});
	}
}

export function uploadUserPhoto(files, login) {
	return function(dispatch) {
		var file = files[0];
        var postUrl = '/api/user/' + login + '/upload_profile_picture';

        request
            .post(postUrl)
            .attach('pic', file)
            .end(function(err, response) {
                dispatch({
					type: "CHANGE_USER",
					payload: response.body
		        });
		        var text = "Photo of " + login + " has been succesfully changed!";
		        dispatch({ type: "ALERT_SHOW", class: "success", text: text });
            });
	}
}
