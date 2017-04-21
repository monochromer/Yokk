import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';
import routes from './routes';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/currentUser';

if(
	localStorage.jwtToken &&
	(
		!localStorage.sessionEnd ||
		localStorage.sessionEnd < Date.now()
	)
){
	localStorage.removeItem('jwtToken');
}

if (localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	store.dispatch(setCurrentUser(jwt.decode(token)));
}

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ browserHistory } routes={routes} />
	</Provider>, document.getElementById("root")
);