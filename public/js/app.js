import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './components/LoginForm.jsx'

var App = React.createClass({
  render: function() {
    return (
        <LoginForm />
    );
  }
});

ReactDOM.render(<App />, content);
