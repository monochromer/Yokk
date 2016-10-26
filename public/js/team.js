import React from 'react'
import ReactDOM from 'react-dom'
import PromoPage from './components/promo/PromoPage.jsx'
import Layout from './components/promo/team/Layout.jsx'
import Step1 from './components/promo/team/Step1.jsx'
import Step2 from './components/promo/team/Step2.jsx'
import store from './store.js'


import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

const router = (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/promo" component={ PromoPage }></Route>
            <Route path="/team" component={ Layout }>
                <Route path="step1" component={ Step1 } ></Route>
                <Route path="step2" component={ Step2 } ></Route>
            </Route>
        </Router>
    </Provider>
);


var render = () => { ReactDOM.render(router, document.getElementById("content")); };

render();

store.subscribe(render);
