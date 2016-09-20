var LoginForm = React.createClass({
  render: function() {
    return (
        <div className="row">
            <div className="medium-6 medium-centered large-4 large-centered columns">

                <form>
                    <div className="row column log-in-form">
                        <h4 className="text-center">Eye of Providence</h4>
                        <label>Login
                            <input type="text" placeholder="somebody@example.com" />
                        </label>
                        <label>Password
                            <input type="text" placeholder="Password" />
                        </label>
                        <input id="remember-me" type="checkbox" />
                        <label for="remember-me">Remember me</label>
                        <p><a type="submit" className="button expanded">Log In</a></p>
                        <p className="text-center"><a href="#">Forgot your password?</a></p>
                    </div>
                </form>

            </div>
        </div>
    );
  }
});

var UsersTable = React.createClass({
  render: function() {
    return (
        <table>
            <thead>
                <tr>
                    <th width="200">Name</th>
                    <th>Position</th>
                    <th width="150">Joined on</th>
                    <th width="150">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Олег Жермаль</td>
                    <td>Javascript Developer</td>
                    <td>Sep 20 2016</td>
                    <td>
                        <button>Remove</button>
                        <button>Edit</button>
                    </td>
                </tr>
                <tr>
                    <td>Максим Буранбаев</td>
                    <td>Javascript Developer</td>
                    <td>Sep 20 2016</td>
                    <td>
                        <button>Remove</button>
                        <button>Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
  }
});

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

var UserInfo = React.createClass({
  render: function() {
    return (
        <div className="container">
            <div className="large-3.columns">
                <div id="photo">Photo</div>
                <div id="efficiency">Efficiency</div>
            </div>
            <div className="large-9.columns">
                <div id="general">
                    <div id="full_name" className="general"></div>
                    <div id="phone_num" className="general"></div>
                    <div id="work_hours" className="general"></div>
                    <div id="email" className="general"></div>
                    <div id="skype" className="general"></div>
                </div>
                <div id="personal">
                    <div id="birthday" className="personal"></div>
                    <div id="twitter" className="personal"></div>
                    <div id="linkedin" className="personal"></div>
                    <div id="vk" className="personal"></div>
                    <div id="facebook" className="personal"></div>
                </div>
                <div id="about_container">
                    <div id="about" className="about"></div>
                    <div id="cv" className="about"></div>
                </div>
            </div>
        </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
        <LoginForm />
    );
  }
});

ReactDOM.render(<App />, content);
