import React from 'react'
import InputElement from 'react-input-mask'
import store from '../../store.js'
import moment from 'moment'
import { createIssue, fetchRedmineIssues } from '../../actions/issues.js'
import { connect } from 'react-redux'
import { refsToObject, findUserByLogin } from '../../helpers'
import { validateDuration } from '../../utils/validators'


var NewIssueForm = React.createClass({
    getInitialState: function() {
        return {
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
        }
    },

    syncRedmine: function() {
        const user = findUserByLogin(this.props.users, this.props.currentUser);
        console.log(user);
        if(!user.redmineApiKey) {
            store.dispatch({type: "ALERT_SHOW", text: "Error! Check your Redmine API key!", class: "danger" });
        } else {
            store.dispatch(fetchRedmineIssues());
        }
    },

    blurDescription: function(event) {
        const { value } = event.target
        this.setState({
            description: {
                value: value,
                valid: value ? true : false,
                virgin: false,
            }
        });
    },

    blurDate: function(event) {
        const { value } = event.target
        this.setState({
            dateCreated: {
                value: value,
                valid: moment(value, "DD.MM.YYYY").isValid(),
                virgin: false,
            }
        });
    },

    blurDuration: function(event) {
        const { value } = event.target
        this.setState({
            duration: {
                value: value,
                valid: validateDuration(value),
                virgin: false,
            }
        });
    },

    handleSubmit: function(event) {
        event.preventDefault();
        const issue = {}
        for(let key in this.state) {
            if(this.state[key].valid) {
                issue[key] = this.state[key].value;
            } else {
                this.setState({
                    [key]: {
                        virgin: false
                    }
                })
                return false;
            }
        }
        issue.taskSource = "eop";
        issue.executor = this.props.currentUser;
        store.dispatch(createIssue(issue));
    },

    render: function() {
        let { description, dateCreated, duration } = this.state
        return (
            <div className="jumbotron">
                <div className="row issues-heading">
                    <div className="col-md-12 text-center">
                        <h2>
                            Track your time or <button className="btn btn-default" onClick={ this.syncRedmine }>sync redmine</button>
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <form onSubmit={ this.handleSubmit }>
                        <input type="hidden" ref="executor" value={ this.props.currentUser } />
                        <input type="hidden" ref="taskSource" value="eop" />
                        <div className="col-md-7">
                            <div className={ (description.valid || description.virgin) ? "form-group" : "group has-error" }>
                                <label htmlFor="date">Task</label>
                                <input type="text" className="form-control" onBlur={ this.blurDescription } placeholder="What are you working on?"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={ dateCreated.valid ? "form-group" : "form-group has-error" }>
                                <label htmlFor="date">Date</label>
                                <InputElement className="form-control" onBlur={ this.blurDate } mask="99.99.9999" id="date" defaultValue={ moment().format("DD.MM.YYYY") } />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className={ (duration.valid || duration.virgin) ? "form-group" : "group has-error" }>
                                <label htmlFor="duration">Time</label>
                                <InputElement className="form-control" onBlur={ this.blurDuration } mask="9:99" id="duration" placeholder="0:00"/>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-success" style={{
                                "marginTop": "24px"
                            }}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})

var getProps = function(store) {
    return {
        currentUser: store.currentUser.login,
        users: store.users
    }
}

export default connect(getProps)(NewIssueForm)
