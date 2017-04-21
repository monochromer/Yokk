import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout.jsx';
import LoginForm from './login';
import UserTable from './components/user/UserTable.jsx';
import UserPage from './components/user/UserPage.jsx';
import UserEdit from './components/user/UserEdit.jsx';
import Tracking from './components/tracking/index.jsx';
import ReportsPage from './components/reportsPage';
import UserActivityPage from './components/userActivityPage';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';

export default (
  <Route path="/" component={ Layout }>
    <Route path="login" component={ LoginForm }></Route>
    <Route component={EnsureLoggedInContainer}>
      <IndexRoute component={ Tracking }></IndexRoute>
      <Route path="users" component={ UserTable } />
      <Route path="user/:login" component={ UserPage } />
      <Route path="user/edit/:login" component={ UserEdit } />
      <Route path="user/activityPage/:login" component={ UserActivityPage } />
      <Route path="reports" component={ ReportsPage } />
    </Route>
  </Route>
)