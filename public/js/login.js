import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

var LoginForm = React.createClass({
	getInitialState: function() {
    return {login: 'foo', password:'bar'};
	  },
    onChange: function (event){
		 event.preventDefault();
	// 	 console.log(e.target.id);
    //    this.setState({e.target.id: e.target.value}) ;
     },
     onSubmit: function(event){
       event.preventDefault();
     },
     render: fuction() {
       return <div>
          <form>
            <div className="form-group">
              <label>Login</label>
              <input type="text" id="login" value={this.state.login} onChange={this.onChange} className="form-control" placeholder="Login" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" id="password" value={this.state.password} onChange={this.onChange}  className="form-control" placeholder="Password" />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" onChange={this.onChange}  /> Logout
              </label>
            </div>
            <button type="submit" onClick={this.onSubmit} className="btn btn-default">{options.submitButton.text}</button>
          </form>
        </div>
     }
});


ReactDOM.render(<LoginForm />, content);
