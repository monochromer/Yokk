import React from 'react'
import InputElement from 'react-input-mask'
import store from '../../store.js'
import moment from 'moment'
import { createTimeEntry, fetchRedmineTimeEntries } from '../../actions/timeEntries.js'
import { connect } from 'react-redux'
import { findUserByLogin } from '../../helpers'
import { validateDuration } from '../../utils/validators'
import { Input } from '../UI.jsx'

class NewTimeEntryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: {
                value: "",
                valid: false,
                virgin: true,
            },
            duration: {
                value: "",
                valid: false,
                virgin: true,
            },
            dateCreated: {
                value: "",
                valid: true,
                virgin: false,
            }
        };

        this.syncRedmine = this.syncRedmine.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    syncRedmine() {
        const user = findUserByLogin(this.props.users, this.props.currentUser);
        if (user.redmineApiKey) {
            store.dispatch(fetchRedmineTimeEntries());
        } else {
            store.dispatch({
                type: "ALERT_SHOW",
                text: 'Error! Check your Redmine API key! <a href="http://recordit.co/j15qHVOC9n" target="_blank">Instruction</a>',
                class: "danger"
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const timeEntry = Object.assign({}, this.state, {
            entrySource: "eop",
            executor: this.props.currentUserID,
            dateCreated: Date.now()
        });

        store.dispatch(createTimeEntry(timeEntry));
    }

    render() {
        return (
            <div className="container-fluid tracking-form">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="flex flext__center vertical-center text-center ">
                            <div>
                                <h2 className="heading heading__white"> Track your time </h2>
                            </div>
                            <div>
                                <span className="tracking-form_or">or</span>
                            </div>
                            <button className="btn btn__md btn__trans-white" onClick={ this.syncRedmine }>Sync Redmine
                            </button>
                        </div>
                    </div>
                </div>
                <form onSubmit={ this.handleSubmit }>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Input className="input-group input-group__light-blue"
                                       handleChange={ this.handleChange }
                                       name="description"
                                       label="What you are working on?"/>
                            </div>
                            <div className="col-md-2">
                                <Input className="input-group input-group__light-blue"
                                       handleChange={ this.handleChange }
                                       defaultValue={ moment().format("DD.MM.YYYY") }
                                       name="date"
                                       label="Date"/>
                            </div>

                            <div className="col-md-2">
                                <Input className="input-group input-group__light-blue"
                                       handleChange={ this.handleChange }
                                       name="duration"
                                       defaultValue="0:00"
                                       label="Duration"/>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn__lg btn__white">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function getProps(store) {
    return {
        currentUser: store.currentUser.login,
        currentUserID: store.currentUser._id,
        users: store.users.list
    }
}

export default connect(getProps)(NewTimeEntryForm)
