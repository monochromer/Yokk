import React, { Component } from 'react'
import InputElement from 'react-input-mask'
import store from '../../store.js'
import moment from 'moment'
import { createTimeEntry, fetchRedmineTimeEntries, fetchUpworkTimeEntries } from '../../actions/timeEntries.js'
import { connect } from 'react-redux'
import { findUserByLogin } from '../../helpers'
import { validateDuration } from '../../utils/validators'
import { Input } from '../UI.jsx'

class NewTimeEntryForm extends Component {
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
        this.syncUpwork = this.syncUpwork.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    syncRedmine() {
        const user = findUserByLogin(this.props.users, this.props.currentUser);
        if (user.redmineApiKey) {
            store.dispatch(fetchRedmineTimeEntries());
        } else {
            alert("Check Redmine integration at your profile!");
        }
    }

  syncUpwork() {
    const user = findUserByLogin(this.props.users, this.props.currentUser);
    // if (user.upworkApiKey) {
        store.dispatch(fetchUpworkTimeEntries());
    // } else {
    //     alert("Check Upwork integration at your profile!");
    // }
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
                        <div className="flex vertical-center text-center tracking-form_heading">
                            <div>
                                <h2 className="heading heading__white"> Track your time </h2>
                            </div>
                            <div>
                                <span className="tracking-form_or">or</span>
                            </div>
                            <button className="btn btn__md btn__trans-white" onClick={ this.syncRedmine }>Sync Redmine
                            </button>
                            <button className="btn btn__md btn__trans-white" onClick={ this.syncUpwork }>Sync Upwork
                            </button>
                        </div>
                    </div>
                </div>
                <form onSubmit={ this.handleSubmit }>
                    <div className="container container__fixed">
                        <div className="row tracking-form_row">
                            <div className="col-md-8 tracking-form_description">
                                <Input className="input-group input-group__light-blue"
                                       handleChange={ this.handleChange }
                                       name="description"
                                       label="What you are working on?"/>
                            </div>
                            <div className="col-md-2 tracking-form_date">
                                <Input className="input-group input-group__light-blue"
                                       handleChange={ this.handleChange }
                                       defaultValue={ moment().format("DD.MM.YYYY") }
                                       name="date"
                                       label="Date"
                                       mask="99.99.9999"/>
                            </div>

                            <div className="col-md-1 tracking-form_duration">
                                <Input className="input-group input-group__light-blue"
                                       handleChange={ this.handleChange }
                                       name="duration"
                                       defaultValue="0:00"
                                       label="Duration"
                                        mask="9:99"/>
                            </div>
                            <div className="col-md-1 tracking-form_add">
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
