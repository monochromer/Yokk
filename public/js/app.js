import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import Layout from './components/Layout.jsx';
import UserTable from './components/UserTable.jsx';
import addUser from './components/AddUser.jsx';
import RequestTest from './components/RequestTest.jsx';
import store from './store.js';

const router = (
	<Provider store={ store }>
		<Router history={ hashHistory }>
			<Route path="/" component={ Layout }>
				<IndexRoute component={ UserTable } users={store.getState().users}></IndexRoute>
				<Route path="addUser" component={ addUser }></Route>
				<Route path="tests" component={ RequestTest }></Route>
			</Route>
		</Router>
	</Provider>	
)


ReactDOM.render(router, content);
