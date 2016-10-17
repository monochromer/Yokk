import React from 'react'
import ReactDOM from 'react-dom'
import store from './store.js'
import Layout from './components/Layout.jsx'
import UserTable from './components/user/UserTable.jsx'
import UserPage from './components/user/UserPage.jsx'
import UserEdit from './components/user/UserEdit.jsx'
import Tracking from './components/tracking/index.jsx'
import ReportsPage from './components/ReportsPage'
import UserActivityPage from './components/UserActivityPage'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

const router = (
	<Provider store={ store }>
		<Router history={ browserHistory }>
			<Route path="/" component={ Layout }>
				<IndexRoute component={ Tracking }></IndexRoute>
				<Route path="/users" component={ UserTable }></Route>
				<Route path="user/:login" component={ UserPage }></Route>
				<Route path="user/edit/:login" component={ UserEdit }></Route>
				<Route path="user/activityPage/:login" component={ UserActivityPage }></Route>
				<Route path="/ReportsPage" component={ ReportsPage }></Route>
			</Route>
		</Router>
	</Provider>
)


var render = () => { ReactDOM.render(router, document.getElementById("content")); }

render();

store.subscribe(render);
