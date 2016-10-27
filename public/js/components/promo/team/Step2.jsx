import React from 'react'
import store from '../../../store'
import { step2 } from '../../../actions/teams'

class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(step2(this.state.username));
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
                            <input className="input input_black" type="text" onChange={ this.handleChange.bind(this) } placeholder="User name"/>
                        </div>
                    </div>
                    <div className="row center-xs">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <button type="submit" className="btn btn_blue btn_lg team-create__create" disabled={!this.state.username ? "disabled" : "" }>Continue to
                                Password
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}


export default Step2