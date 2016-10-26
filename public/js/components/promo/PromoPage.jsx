import React from 'react'
import store from '../../store'
import { step0 } from '../../actions/teams'


class PromoPage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: ""
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(step0(this.state.email));
    }

    handleChange(event) {
         this.state.email = event.target.value;
    }

    render() {
        return (
            <div className="container-fluid main-container">
                <div className="container-fluid top">
                    <div className="row top">
                        <div className="col-md-3 col-sm-6 col-xs-6">Eye of providence</div>
                        <div className="col-md-offset-6 col-md-3 col-sm-6 col-xs-6 text-right">Sign In</div>
                    </div>
                </div>
                <div className="container center">
                    <div className="heading">
                        <h1>Eye of Providence <br /> helps to manage your team</h1>
                    </div>
                    <div className="container team-create">
                        <form onSubmit={ this.handleSubmit.bind(this) }>
                            <div className="row middle-md">
                                <div
                                    className="col-md-offset-1 col-sm-offset-1 col-xs-offset-1 col-md-7 col-sm-6 col-xs-10">
                                    <input type="email" onChange={ this.handleChange.bind(this) } className="input input__white" placeholder="E-mail address" required />
                                </div>
                                <div className="col-md-3 col-sm-4 col-xs-12 hide-xs">
                                    <button className="btn btn_white btn_lg">Create New Team</button>
                                </div>
                            </div>
                            <div className="row hide-sm hide-lg hide-md">
                                <div className="col-xs-12 center-xs">
                                    <button className="btn btn_white btn_lg team-create__create">Create New Team
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container footer">
                    <div className="span2">
                        <a href="http://soshace.com" target="_blank">
                            <img src="/img/logo.png" alt="soshace" title="soshace" height="36px"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PromoPage