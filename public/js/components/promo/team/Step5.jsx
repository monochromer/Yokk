import React from 'react'
import { connect } from 'react-redux'

class Step5 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row center-xs step__heading">
                    <div className="col-md-12 col-sm-12 col-xs-10">
                        <h1 className="heading" >Send Invitations</h1>
                    </div>
                </div>
                <div className="row center-xs step__message">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <p>Your team is ready to go. Know a few friends or coworkers <br/>
                            who’d like to explore Eye of Providence with you.</p>
                    </div>
                </div>
                <div className="row center-xs step__code">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <input className="input input_black" type="email" placeholder="E-mail"/>
                    </div>
                </div>
                <div className="row center-xs step__code">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <input className="input input_black" type="email" placeholder="E-mail"/>
                    </div>
                </div>
                <div className="row center-xs">
                    <div className="col-md-6 col-sm-8 col-xs-10">
                        <button className="btn btn_blue btn_lg team-create__create" disabled="disabled">Send Invitations</button>
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

export default connect(getProps)(Step5)