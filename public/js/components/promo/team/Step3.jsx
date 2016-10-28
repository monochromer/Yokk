import React from 'react'
import store from '../../../store'
import {step3} from '../../../actions/teams'
import {addUser} from '../../../actions/users'
import {connect} from 'react-redux'

class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }

    handleChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var user = Object.assign({}, this.props.user, { password: this.state.password });
        store.dispatch(step3());
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="container">
                    <div className="row center-xs step__heading">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <h1 className="heading">Set your password</h1>
                        </div>
                    </div>
                    <div className="row center-xs step__message">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <p>Password must be at least 6 characters long,<br/>
                                and can’t be things like password, 123456 or abcdef</p>
                        </div>
                    </div>
                    <div className="row center-xs step__code">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <input className="input input_black" type="password"
                                   onChange={ this.handleChange.bind(this) } placeholder="Password"/>
                        </div>
                    </div>
                    <div className="row center-xs">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <button className="btn btn_blue btn_lg team-create__create"
                                    disabled={ this.state.password.length <= 6 ? "disabled" : "" }>Continue to Team
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

function getProps(state) {
    return {
        user: {
            login: state.teams.login,
            email: state.teams.email,
            team: state.teams._id
        }
    }
}

export default connect(getProps)(Step3)
