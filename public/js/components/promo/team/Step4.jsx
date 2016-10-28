import React from 'react'
import store from '../../../store';
import {step4} from '../../../actions/teams'
import {connect} from 'react-redux'


class Step4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: ""
        }
    }

    handleChange(event) {
        this.setState({
            teamName: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(step4(this.state.teamName, this.props.email));
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit.bind(this) }>
                <div className="container">
                    <div className="row center-xs step__heading">
                        <div className="col-md-12 col-sm-12 col-xs-10">
                            <h1 className="heading">What’s your company called?</h1>
                        </div>
                    </div>
                    <div className="row center-xs step__message">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <p>We’ll use this to name your team,<br/>
                                which you can always change later.</p>
                        </div>
                    </div>
                    <div className="row center-xs step__code">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <input className="input input_black" type="text" onChange={ this.handleChange.bind(this) }
                                   placeholder="Company name"/>
                        </div>
                    </div>
                    <div className="row center-xs">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <button className="btn btn_blue btn_lg team-create__create"
                                    disabled={ !this.state.teamName ? "disabled" : "" }>Continue to Sending Invitation
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
        email: state.teams.email
    }
}

export default connect(getProps)(Step4)