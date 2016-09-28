import React from 'react';
import axios from 'axios';
import DropPicture from './DropPicture.jsx';
import Logout from './Logout.jsx';

var RequestTest = React.createClass({
    getInitialState: function() {
        return {reqUrl: '/api/users/add', reqBody: '{"json":"string"}'};
    },
    onChange: function(e){
        if (e.target.name == 'submitUrl') {
            this.setState({reqUrl: e.target.value});
        } else {
            this.setState({reqBody: e.target.value});
        }

    },
    requestPost: function(e) {
        axios.post(this.state.reqUrl, JSON.parse(this.state.reqBody) )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    },
	requestGet() {
        axios.get(this.state.reqUrl)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
	},
    requestPut() {
        axios.put(this.state.reqUrl, JSON.parse(this.state.reqBody) )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    requestDelete() {
        axios.delete(this.state.reqUrl)
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
                <input name='submitUrl' placeholder='url to submit to' value={this.state.reqUrl} onChange={this.onChange} />
                <input name='reqBody' placeholder='request body'value={this.state.reqBody}  onChange={this.onChange} />
				<button onClick={this.requestGet}>make GET request</button>
                <button onClick={this.requestPost}>make POST request</button>
                <button onClick={this.requestPut}>make PUT request</button>
                <button onClick={this.requestDelete}>make DELETE request</button>
                <DropPicture />
                <Logout />
			</div>
		);
	}

});

export default RequestTest;
