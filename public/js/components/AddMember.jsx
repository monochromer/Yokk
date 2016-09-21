import React from 'react'

var AddMember = React.createClass({
  render: function() {
    return (
        <div>
            <form>
                <div>
                    <h4 class="text-center">Add a member</h4>
                    <label>Login
                        <input type="text" placeholder="Some login" />
                    </label>
                    <label>Password
                        <input type="text" placeholder="Some password" />
                    </label>
                    <label>Repeat password
                        <input type="text" placeholder="Password typed" />
                    </label>
                    <p><a type="submit">Add user</a></p>
                </div>
            </form>
        </div>
    );
  }
});

export default AddMember;