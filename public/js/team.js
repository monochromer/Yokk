import React from 'react'
import ReactDOM from 'react-dom'
import PromoPage from './components/promo/PromoPage.jsx'
import Layout from './components/promo/team/Layout.jsx'
import Step1 from './components/promo/team/Step1.jsx'
import store from './store.js'


import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

const router = (
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/promo" component={ PromoPage } />
            <Route path="/promo/team/" component={ Layout }>
                <IndexRoute component={ Step1 } />
            </Route>
        </Router>
    </Provider>
);


var render = () => { ReactDOM.render(router, document.getElementById("content")); };

render();

store.subscribe(render);
