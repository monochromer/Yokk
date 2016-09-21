import React from 'react'

var AddMember = React.createClass({
    addUser: function(){
        console.log('adding new user');
    },
    render: function() {
        return (
            <div className = 'row'>
                <div className="small-3 small-centered columns">
                    <form>
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
                            <button type="submit" name="adduser" onClick={this.addUser}>Add user</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

export default AddMember;
