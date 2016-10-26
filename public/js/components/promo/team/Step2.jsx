import React from 'react'
import { connect } from 'react-redux'

class Step2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row center-xs step2__heading">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <h1 className="heading">What is your name?</h1>
                    </div>
                </div>
                <div className="row center-xs step2__code">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <input className="input input_black" type="text" placeholder="User name"/>
                    </div>
                </div>
                <div className="row center-xs">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <button className="btn btn_blue btn_lg team-create__create" disabled="disabled">Continue to Password</button>
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

export default connect(getProps)(Step2)