import React from 'react'
import { connect } from 'react-redux'

class Step1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row center-xs step1__heading">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <h1 className="heading">Check your E-mail</h1>
                    </div>
                </div>
                <div className="row center-xs step1__message">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <p>
                            We’ve sent a six-digit confirmation code to <b>{ this.props.email }</b>.<br />
                            Enter it below to confirm your e-mail address.
                        </p>
                    </div>
                </div>
                <div className="row center-xs step1__code">
                    <div className="col-md-1 col-sm-2 col-xs-2">
                        <input className="input input_black step1__confirmation-input text-center" type="text" maxLength="1"/>
                    </div>
                    <div className="col-md-1 col-sm-2 col-xs-2">
                        <input className="input input_black step1__confirmation-input text-center" type="text" maxLength="1"/>
                    </div>
                    <div className="col-md-1 col-sm-2 col-xs-2">
                        <input className="input input_black step1__confirmation-input text-center" type="text" maxLength="1"/>
                    </div>
                    <div className="col-md-1 col-sm-2 col-xs-2">
                        <input className="input input_black step1__confirmation-input text-center" type="text" maxLength="1"/>
                    </div>
                    <div className="col-md-1 col-sm-2 col-xs-2">
                        <input className="input input_black step1__confirmation-input text-center" type="text" maxLength="1"/>
                    </div>
                    <div className="col-md-1 col-sm-2 col-xs-2">
                        <input className="input input_black step1__confirmation-input text-center" type="text" maxLength="1"/>
                    </div>
                </div>
                <div className="row center-xs">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <button className="btn btn_blue btn_lg team-create__create" disabled="disabled">Continue to Name</button>
                    </div>
                </div>
            </div>
        )
    }
}

function getProps(state) {
    return {
        email: "maxim@izst.ru"
    }
}

export default connect(getProps)(Step1)