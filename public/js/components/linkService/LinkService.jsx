import React from 'react'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'
import store from '../../store'

class LinkService extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="modal">
                <div className="container">
                    <div className="row center-md vertical-center modal_row">
                        <div className="col-md-6">
                            <div className="row text-center">
                                <div className="col-md-12 text-center">
                                    <img src="/img/upwork-logo.svg" className="linkService_logo" alt="upwork"/>
                                    <h2 className="heading heading__white">Connect Upwork</h2>
                                </div>
                            </div>
                            <form action="">
                                <div className="row linkService_row">
                                    <div className="col-md-12">
                                        <Input name="host" label="host"/>
                                    </div>
                                </div>
                                <div className="row linkService_row">
                                    <div className="col-md-12 text-center">
                                        <Input name="key" label="API key"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn__blue btn__lg linkService_btn">Connect</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function getParams(store) {
    return {
        status: store.users.linkService.status,
        service: store.users.linkService.service,
        userId: store.users.linkService.userId
    }
}

export default connect(getParams)(LinkService);