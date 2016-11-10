import React from 'react'
import store from '../../store'
import validator from 'validator'
import classNames from 'classnames'
import { step0 } from '../../actions/teams'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'


class PromoPage extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            rightPanelOpened: false
        };

        this.handleClickCreate = this.handleClickCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (validator.isEmail(this.state.email)) {
            store.dispatch(step0(this.state.email));
        } else {
            store.dispatch({type: "CREATE_ERROR", step: "step0", text: "It is not valid email!"})
        }
    }

    handleClickCreate() {
        this.setState({
            rightPanelOpened: true
        })
    }

    handleChange(event) {
        this.state.email = event.target.value;
        store.dispatch({type: "REMOVE_ERRORS"});
    }

    render() {

        const signInClasses = classNames({
            'signin': true,
            hide: this.state.rightPanelOpened
        });

        const centerClasses = classNames({
            'row promo-heading_wrapper': true,
            'text-center': !this.state.rightPanelOpened
        });

        const rightPanelClasses = classNames({
            'right-panel': true,
            'right-panel___hidden': !this.state.rightPanelOpened
        });

        const createTeamButtonClasses = classNames({
            'btn btn__lg btn__blue': true,
            'hide': this.state.rightPanelOpened
        });

        const soshaceLinkClasses = classNames({
            'hide': this.state.rightPanelOpened
        });

        const inputClassNames = classNames({
           'input-group input-group__light-blue': true,
            'input-group__error': this.props.error
        });

        return (

            <div className="container-fluid main-container">

                <div className="container top">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-6 logo">Eye of providence</div>
                        <div className="col-md-offset-6 col-md-3 col-sm-6 col-xs-6 text-right">
                            <a href="/login" className={ signInClasses }>Sign In</a>
                        </div>
                    </div>
                </div>

                <div className="container center">
                    <div className={ centerClasses }>
                        <div className="col-md-12">
                            <h1 className="heading promo__heading">Eye of Providence <br /> helps to manage your team</h1>
                            <button className={ createTeamButtonClasses } onClick={ this.handleClickCreate }>Create New Team</button>
                        </div>
                    </div>
                </div>

                <div className="container footer">
                    <div className="span2">
                        <a href="http://soshace.com" target="_blank" className={ soshaceLinkClasses }>
                            <img src="/img/logo.png" alt="soshace" title="soshace" height="36px"/>
                        </a>
                    </div>
                </div>

                <div className={ rightPanelClasses }>

                    <header>
                        <div className="row">
                            <div className="col-md-10 text-right">
                                <a href="/login" className="signin right-panel_signin">Sign In</a>
                            </div>
                        </div>
                    </header>

                    <section>
                        <form onSubmit={ this.handleSubmit }>
                            <div className="row center-md">
                                <div className="col-md-8">
                                    <Input handleChange={ this.handleChange }
                                           className={ inputClassNames }
                                           name="email"
                                           label="E-mail address"
                                           error={ this.props.error }
                                    />
                                    <button type="submit" className="btn btn__lg btn__white right-panel_btn">Create New Team</button>
                                </div>
                            </div>
                            <div className="row center-md right-panel_login">
                                <div className="col-md-8">
                                    <p>
                                        Already have a team? &nbsp;
                                        <a href="/login">Sign In</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </section>

                    <footer>
                        <div className="row center-md">
                            <a href="http://soshace.com" target="_blank">
                                <img src="/img/logo.png" alt="soshace" title="soshace" height="36px"/>
                            </a>
                        </div>
                    </footer>

                </div>

            </div>
        )
    }
}

function getProps(store) {
    return {
        error: store.teams.errors.step0
    }
}

export default connect(getProps)(PromoPage)