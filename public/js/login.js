import React from 'react';
import ReactDOM from 'react-dom';
import getParameter from 'get-parameter';
import { Input, Checkbox } from './components/UI.jsx'

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            auth: getParameter('teamName') ? false : true,
            teamName: getParameter('teamName'),
            teamId: getParameter('teamId'),
            email: getParameter('email')
        };
    }

    render() {
        const auth = (
            <div className="container container__fixed">
                <div className="row center-md">
                    <div className="col-md-5">
                        <form className="form-signin" method="POST" action="/login">
                            <h2 className="heading">Sign In</h2>
                            <Input className="input-group input-group__grey"
                                   label="Username"
                                   required="true"
                                   name="username"/>

                            <Input type="password"
                                   className="input-group input-group__grey"
                                   label="Password"
                                   required="true"
                                   name="password"/>

                            <Checkbox label="Remember me?" name="rememberme"/>

                            <button className="btn btn__lg btn__blue" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        );

        const reg = (
            <div className="container container__fixed">
                <div className="row center-md">
                    <div className="col-md-5">
                        <form className="form-signup" method="POST" action="/register">
                            <h2 className="form-signin-heading">Signing Up to { this.state.teamName } </h2>
                            <input type="hidden" name="email" defaultValue={ this.state.email }/>
                            <input type="hidden" name="teamId" defaultValue={ this.state.teamId }/>

                            <Input className="input-group input-group__grey"
                                   label="Login"
                                   required="true"
                                   name="login"/>
                            <Input className="input-group input-group__grey"
                                   type="password"
                                   label="Password"
                                   required="true"
                                   name="password"/>

                            <Input className="input-group input-group__grey"
                                   type="password"
                                   label="Repeat Password"
                                   required="true"
                                   name="password"/>

                            <button className="btn btn__lg btn__blue signup_btn" type="submit">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        );

        return (
            <div>{ this.state.auth ? auth : reg }</div>
        )
    }
}


ReactDOM.render(<LoginForm />, document.getElementById("content"));
