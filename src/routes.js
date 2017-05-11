import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import RegisterForm from './components/login/RegisterForm.jsx';
import ForgotPasswordForm from './components/login/ForgotPasswordForm.jsx';
import ResetPasswordForm from './components/login/ResetPasswordForm.jsx';
import UserTable from './components/user/UserTable.jsx';
import UserPage from './components/user/UserPage.jsx';
import UserEdit from './components/user/UserEdit.jsx';
import Tracking from './components/tracking/index.jsx';
import ReportsPage from './components/reportsPage';
import UserActivityPage from './components/userActivityPage';
import Teams from './components/Teams';
import Settings from './components/Settings';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import PromoPage from './components/registration/PromoPage.jsx'
import StepsLayout from './components/registration/StepsLayout.jsx'
import Step1 from './components/registration/Step1.jsx'
import Step2 from './components/registration/Step2.jsx'
import Step3 from './components/registration/Step3.jsx'
import Step4 from './components/registration/Step4.jsx'
import Step5 from './components/registration/Step5.jsx'

export default (
  <Route path="/" component={ Layout }>
    <Route path="login" component={ LoginForm } />
    <Route path="register" component={ RegisterForm } />
    <Route path="forgot_password" component={ ForgotPasswordForm } />
    <Route path="reset_password" component={ ResetPasswordForm } />
    <Route path="registration">
      <IndexRoute component={ PromoPage } />
      <Route component={ StepsLayout }>
        <Route path="step1" component={ Step1 } />
        <Route path="step2" component={ Step2 } />
        <Route path="step3" component={ Step3 } />
        <Route path="step4" component={ Step4 } />
        <Route path="step5" component={ Step5 } />
      </Route>
    </Route>
    <Route component={EnsureLoggedInContainer}>
      <IndexRoute component={ Tracking } />
			<Route path="teams" component={ Teams }></Route>
      <Route path="settings" component={ Settings }></Route>
      <Route path="users" component={ UserTable } />
      <Route path="user/:email" component={ UserPage } />
      <Route path="user/edit/:email" component={ UserEdit } />
      <Route path="user/activityPage/:email" component={ UserActivityPage } />
      <Route path="reports" component={ ReportsPage } />
    </Route>
  </Route>
)
