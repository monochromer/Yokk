import React from 'react';
import { createUser } from '../actions/crudUser'
import store from '../store.js';

import axios from 'axios';

var AddUser = React.createClass({
    addUser: function(e) {
        e.preventDefault();
        var userToAdd = {
            login: 'some_login',
            password: 'some_password'
        };
        createUser(userToAdd);

    },
    render: function() {
        return (
            <div className = 'row'>
                <div className="small-3 small-centered columns">
                    <form onSubmit={this.addUser}>
                        <div className='row column add-user-form'>
                        <div>
                            <h4 className="text-center">Add a member</h4>
                            <label>Login
                                <input type="text" placeholder="Some login" />
                            </label>
                            <label>Password
                                <input type="text" placeholder="Some password" />
                            </label>
                            <label>Repeat password
                                <input type="text" placeholder="Password typed" />
                            </label>
                            <button type="submit" name="adduser" >Add user</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

export default AddUser;
