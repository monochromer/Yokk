import React from 'react'
import ReactDOM from 'react-dom'
import PromoPage from './components/promo/PromoPage.jsx'
import Layout from './components/promo/team/Layout.jsx'
import Step1 from './components/promo/team/Step1.jsx'
import Step2 from './components/promo/team/Step2.jsx'
import Step3 from './components/promo/team/Step3.jsx'
import Step4 from './components/promo/team/Step4.jsx'
import Step5 from './components/promo/team/Step5.jsx'
import store from './store.js'


import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

const router = (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/promo" component={ PromoPage } />
            <Route path="/team" component={ Layout }>
                <Route path="step1" component={ Step1 } />
                <Route path="step2" component={ Step2 } />
                <Route path="step3" component={ Step3 } />
                <Route path="step4" component={ Step4 } />
                <Route path="step5" component={ Step5 } />
            </Route>
        </Router>
    </Provider>
);


var render = () => { ReactDOM.render(router, document.getElementById("content")); };

render();

store.subscribe(render);
