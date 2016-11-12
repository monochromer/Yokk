import React from 'react'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'
import { linkService } from '../../actions/users'
import classNames from 'classnames'
import store from '../../store'
class LinkService extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(linkService(this.props.userId, this.state))
    }

    handleClose() {
        store.dispatch({ type: "LINK_SERVICE_CLOSE" });
    }

    render() {

        let modalClasses = classNames({
            modal: true,
            hide: this.props.status == "hidden"
        });

        return (
            <div className={ modalClasses }>
                <div className="modal_close" onClick={ this.handleClose }></div>
                <div className="container">
                    <div className="row center-md vertical-center modal_row">
                        <div className="col-md-6">
                            <div className="row text-center">
                                <div className="col-md-12 text-center">
                                    <img src="/img/upwork-logo.svg" className="linkService_logo" alt="upwork"/>
                                    <h2 className="heading heading__white">Connect Upwork</h2>
                                </div>
                            </div>
                            <form onSubmit={ this.handleSubmit }>
                                <div className="row linkService_row">
                                    <div className="col-md-12">
                                        <Input name="redmineHost" className="input-group input-group__grey-white" handleChange={ this.handleChange } label="Host"/>
                                    </div>
                                </div>
                                <div className="row linkService_row">
                                    <div className="col-md-12 text-center">
                                        <Input name="redmineApiKey" className="input-group input-group__grey-white" Change={ this.handleChange } label="API key"/>
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