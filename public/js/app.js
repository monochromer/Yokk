import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Layout from './components/Layout.jsx'
import UserTable from './components/UserTable.jsx'
import addUser from './components/AddUser.jsx'
import RequestTest from './components/RequestTest.jsx'

const router = (
	<Router history={ hashHistory }>
		<Route path="/" component={ Layout }>
			<IndexRoute component={ UserTable }></IndexRoute>
			<Route path="addUser" component={ addUser }></Route>
			<Route path="tests" component={ RequestTest }></Route>
		</Route>
	</Router>
)


ReactDOM.render(router, content);
