import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './components/LoginForm.jsx'
import AddMember from './components/AddMember.jsx'

var App = React.createClass({
  render: function() {
    return (
        <div>
        <AddMember />
        <LoginForm />
        </div>
    );
  }
});

ReactDOM.render(<App />, content);
