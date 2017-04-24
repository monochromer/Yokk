import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import UserTable from './components/user/UserTable.jsx';
import UserPage from './components/user/UserPage.jsx';
import UserEdit from './components/user/UserEdit.jsx';
import Tracking from './components/tracking/index.jsx';
import ReportsPage from './components/reportsPage';
import UserActivityPage from './components/userActivityPage';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import PromoPage from './components/promo/PromoPage.jsx'
import TeamLayout from './components/promo/team/TeamLayout.jsx'
import Step1 from './components/promo/team/Step1.jsx'
import Step2 from './components/promo/team/Step2.jsx'
import Step3 from './components/promo/team/Step3.jsx'
import Step4 from './components/promo/team/Step4.jsx'
import Step5 from './components/promo/team/Step5.jsx'

export default (
  <Route path="/" component={ Layout }>
    <Route path="login" component={ LoginForm } />
    <Route path="promo" component={ PromoPage } />
    <Route path="team" component={ TeamLayout }>
      <Route path="step1" component={ Step1 } />
      <Route path="step2" component={ Step2 } />
      <Route path="step3" component={ Step3 } />
      <Route path="step4" component={ Step4 } />
      <Route path="step5" component={ Step5 } />
    </Route>
    <Route component={EnsureLoggedInContainer}>
      <IndexRoute component={ Tracking } />
      <Route path="users" component={ UserTable } />
      <Route path="user/:login" component={ UserPage } />
      <Route path="user/edit/:login" component={ UserEdit } />
      <Route path="user/activityPage/:login" component={ UserActivityPage } />
      <Route path="reports" component={ ReportsPage } />
    </Route>
  </Route>
)