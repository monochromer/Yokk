import React from 'react'
import ReactDOM from 'react-dom'
import store from './store.js'
import Layout from './components/Layout.jsx'
import UserTable from './components/UserTable.jsx'
import UserAdd from './components/UserAdd.jsx'
import UserPage from './components/UserPage.jsx'
import UserEdit from './components/UserEdit.jsx'
import RequestTest from './components/RequestTest.jsx'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

const router = (
	<Provider store={ store }>
		<Router history={ browserHistory }>
			<Route path="/" component={ Layout }>
				<IndexRoute component={ UserTable }></IndexRoute>
				<Route path="addUser" component={ UserAdd }></Route>
				<Route path="user/:login" component={ UserPage }></Route>
				<Route path="user/edit/:login" component={ UserEdit }></Route>
				<Route path="tests" component={ RequestTest }></Route>
			</Route>
		</Router>
	</Provider>
)


var render = function() { ReactDOM.render(router, document.getElementById("content")); }

render();

store.subscribe(render);
