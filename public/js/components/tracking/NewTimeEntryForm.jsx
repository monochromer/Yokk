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
    }


    syncRedmine() {
        const user = findUserByLogin(this.props.users, this.props.currentUser);
        if (!user.redmineApiKey) {
            store.dispatch({
                type: "ALERT_SHOW",
                text: 'Error! Check your Redmine API key! <a href="http://recordit.co/j15qHVOC9n" target="_blank">Instruction</a>',
                class: "danger"
            });
        } else {
            store.dispatch(fetchRedmineTimeEntries());
        }
    }

    blurDescription(event) {
        const { value } = event.target
        this.setState({
            description: {
                value: value,
                valid: value ? true : false,
                virgin: false,
            }
        });
    }

    blurDate(event) {
        const { value } = event.target
        this.setState({
            dateCreated: {
                value: value,
                valid: moment(value, "DD.MM.YYYY").isValid(),
                virgin: false,
            }
        });
    }

    blurDuration(event) {
        const { value } = event.target
        this.setState({
            duration: {
                value: value,
                valid: validateDuration(value),
                virgin: false,
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const timeEntry = {}
        for (let key in this.state) {
            if (this.state[key].valid) {
                timeEntry[key] = this.state[key].value;
            } else {
                this.setState({
                    [key]: {
                        virgin: false
                    }
                })
                return false;
            }
        }
        timeEntry.entrySource = "eop";
        timeEntry.executor = this.props.currentUserID;

        timeEntry.dateCreated = Date.now();
        store.dispatch(createTimeEntry(timeEntry));
    }

    render() {
        let { description, dateCreated, duration } = this.state;
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
                            <input type="hidden" ref="executor" value={ this.props.currentUser }/>
                            <input type="hidden" ref="taskSource" value="eop"/>
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
