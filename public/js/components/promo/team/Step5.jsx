import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

class Step5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations: [],
            rows: 2
        }
    }

    addInvitation() {
        this.setState({
           rows: this.state.rows + 1
        });
    }

    render() {
        console.log("rendering...");
        const invitationInput = (
            <div className="col-md-6 col-sm-8 col-xs-10">
                <input className="input input_black" type="email" placeholder="E-mail"/>
            </div>
        );

        const invitationRows = [];

        for(var i = 1; i <= this.state.rows; i++) {
            invitationRows.push(<div className="row center-xs step__code" key={ _.uniqueId() }> { invitationInput } </div>);
        }

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

                {
                    invitationRows.map( (o) => o )
                }

                <div className="row center-xs">
                    <div className="col-md-3 col-sm-3 col-xs-6">
                        <div className="btn btn_link btn_white" onClick={ this.addInvitation.bind(this) }>+ Add another invitations</div>
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