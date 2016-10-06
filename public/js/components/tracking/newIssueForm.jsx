import React from 'react'
import InputElement from 'react-input-mask'
import store from '../../store.js'
import moment from 'moment'
import { createIssue, fetchRedmineIssues } from '../../actions/issues.js'
import { connect } from 'react-redux'
import { refsToObject } from '../../helpers'
import { validateDuration } from '../../utils/validators'


var NewIssueForm = React.createClass({
    getInitialState: function() {
        return {
            description: true,
            duration: true,
            date: true
        }
    },

    syncRedmine: function() {
        store.dispatch(fetchRedmineIssues());
    },

    validate: function(issue) {
        if(!issue.description) {
            this.setState({ description: false });
            return false;
        }

        if(!moment(issue.dateAdded).isValid()) {
            this.setState({ date: false });
            return false;
        }

        if(validateDuration(issue.duration)) {
            this.setState({ duration: false });
            return false;
        }
        return true;
    },

    handleSubmit: function(event) {
        event.preventDefault();
        var issue = refsToObject(this.refs);
        store.dispatch(createIssue(issue));
    },

    render: function() {
        let { description, date, duration } = this.state
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
                            <div className="form-group">
                                <label htmlFor="date">Task</label>
                                <input type="text" className={ description ? "form-control" : "form-control has-error" } ref="description" placeholder="What are you working on?"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <InputElement className={ date ? "form-control" : "form-control has-error" } ref="dateAdded" mask="99.99.9999" id="date" defaultValue={ moment().format("DD.MM.YYYY") } />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="duration">Time</label>
                                <InputElement className={ duration ? "form-control" : "form-control has-error" } ref="duration" mask="9:99" id="duration" placeholder="0:00"/>
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
        currentUser: store.currentUser.login
    }
}

export default connect(getProps)(NewIssueForm)
