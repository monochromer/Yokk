import React from 'react'
import store from '../../../store'
import { step2 } from '../../../actions/teams'
import { connect } from 'react-redux'
import { Input } from '../../UI.jsx'

class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ""
        }
    }

    handleChange(event) {
        this.setState({
            login: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(step2(this.state.login));
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="container">
                    <div className="row center-xs step__heading">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <h1 className="heading">What is your name?</h1>
                        </div>
                    </div>
                    <div className="row center-xs step__message">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <p>You name will be used for auth. You won't be able to change it.</p>
                        </div>
                    </div>
                    <div className="row center-xs step__code">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <Input handleChange={ this.handleChange.bind(this) }
                                   className="input-group input-group__grey"
                                   name="username"
                                   label="User name"/>
                        </div>
                    </div>
                    <div className="row center-xs">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <button type="submit" className="btn  btn__lg btn__blue team-create__create"
                                    disabled={ !this.state.login ? "disabled" : "" }>Continue to
                                Password
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

function getParams(store) {
    return {
        login: localStorage.getItem("login")
    }
}

export default connect(getParams)(Step2)