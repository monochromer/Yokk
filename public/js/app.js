import React from 'react'
import ReactDOM from 'react-dom'
import store from './store.js'
import Layout from './components/Layout.jsx'
import UserTable from './components/user/UserTable.jsx'
import UserAdd from './components/user/UserAdd.jsx'
import UserPage from './components/user/UserPage.jsx'
import UserEdit from './components/user/UserEdit.jsx'
import Tracking from './components/tracking'
import RequestTest from './components/RequestTest.jsx'
import RedmineIssuesTable from './components/RedmineIssuesTable.jsx'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

const router = (
	<Provider store={ store }>
		<Router history={ browserHistory }>
			<Route path="/" component={ Layout }>
				<IndexRoute component={ Tracking }></IndexRoute>
				<Route path="users" component={ UserTable }></Route>
				<Route path="addUser" component={ UserAdd }></Route>
				<Route path="user/:login" component={ UserPage }></Route>
				<Route path="user/edit/:login" component={ UserEdit }></Route>
				<Route path="tests" component={ RequestTest }></Route>
        <Route path="issues" component={ RedmineIssuesTable }></Route>
			</Route>
		</Router>
	</Provider>
)


var render = function() { ReactDOM.render(router, document.getElementById("content")); }

render();

store.subscribe(render);
