import React from 'react'
import store from '../../../store'
import { connect } from 'react-redux'
import { step1 } from '../../../actions/teams'

class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: []
        }
    }

    handleChange(event) {
        this.state.code[event.target.name] = event.target.value;

        this.setState({
            code: this.state.code
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(step1(_.join(this.state.code, ""), this.props.email));
    }

    render() {
        const inputClass = "input input_black step1__confirmation-input text-center";
        return (
            <div className="container">
                <form onSubmit={ this.handleSubmit.bind(this) }>
                    <div className="row center-xs step__heading">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <h1 className="heading">Check your E-mail</h1>
                        </div>
                    </div>

                    <div className="row center-xs step__message">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <p>
                                We’ve sent a six-digit confirmation code to <b>{ this.props.email }</b>.<br />
                                Enter it below to confirm your e-mail address.
                            </p>
                        </div>
                    </div>

                    <div className="row center-xs step__code">

                        <div className="col-md-1 col-sm-2 col-xs-2">
                            <input className={ inputClass  } onChange={ this.handleChange.bind(this) } name="0"
                                   type="text" maxLength="1"/>
                        </div>
                        <div className="col-md-1 col-sm-2 col-xs-2">
                            <input className={ inputClass } onChange={ this.handleChange.bind(this) } name="1"
                                   type="text" maxLength="1"/>
                        </div>
                        <div className="col-md-1 col-sm-2 col-xs-2">
                            <input className={ inputClass } onChange={ this.handleChange.bind(this) } name="2"
                                   type="text" maxLength="1"/>
                        </div>
                        <div className="col-md-1 col-sm-2 col-xs-2">
                            <input className={ inputClass } onChange={ this.handleChange.bind(this) } name="3"
                                   type="text" maxLength="1"/>
                        </div>
                        <div className="col-md-1 col-sm-2 col-xs-2">
                            <input className={ inputClass  } onChange={ this.handleChange.bind(this) } name="4"
                                   type="text" maxLength="1"/>
                        </div>
                        <div className="col-md-1 col-sm-2 col-xs-2">
                            <input className={ inputClass } onChange={ this.handleChange.bind(this) } name="5"
                                   type="text" maxLength="1"/>
                        </div>

                    </div>


                    <div className="row center-xs">
                        <div className="col-md-6 col-sm-8 col-xs-10">
                            <button type="submit"
                                    className="btn btn_blue btn_lg team-create__create" disabled={ this.state.code.length != 6 ? "disabled" : "" } >
                                Continue to
                                Name
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

function getProps(state) {
    return {
        email: state.teams.email
    }
}

export default connect(getProps)(Step1)