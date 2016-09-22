import React from 'react'
import axios from 'axios';

var RequestTest = React.createClass({
    requestPost: function(e) {
        axios.post('/new_user', user )
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });

    },
	requestGet() {
        axios.get('/all_users', {
        params: {
        some: 'param'
        }
        })
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
	},

	render: function() {
		return (
			<div>
				<button onClick={this.requestGet}>make GET request</button>
                <button onClick={this.requestPost}>make POST request</button>
			</div>
		);
	}

});

export default RequestTest;
