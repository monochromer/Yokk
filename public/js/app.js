import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import axios from 'axios';
import LoginForm from './components/LoginForm.jsx';
import AddUser from './components/AddUser.jsx';

var App = React.createClass({
  render: function() {
    return (
        <Provider store={store}>
            <AddUser />
        </Provider>
    );
  }
});

// Render
var render = function() {
  ReactDOM.render(<App />, document.getElementById("content"));
};
render();

store.subscribe(render);
