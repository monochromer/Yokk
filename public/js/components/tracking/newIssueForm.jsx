import React from 'react'
import { createIssue } from '../../actions/issues.js'
import { connect } from 'react-redux'
import { refsToObject } from '../../helpers'
import store from '../../store.js'
import moment from 'moment'

var NewIssueForm = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();
        var issue = refsToObject(this.refs);
        store.dispatch(createIssue(issue));
    },

    render: function() {
        return (
            <div className="row">
                <form onSubmit={ this.handleSubmit }>
                    <input type="hidden" ref="executor" value={ this.props.currentUser } />
                    <input type="hidden" ref="taskSource" value="eop" />
                    <div className="col-md-7">
                        <div className="form-group">
                            <label htmlFor="date">Task</label>
                            <input type="text" className="form-control" ref="description" placeholder="What are you working on?"/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="text" className="form-control" ref="dateAdded" id="date" defaultValue={ moment().format("DD.MM.YYYY") } />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <select className="form-control" id="time" ref="duration" >
                                <option value="00:30" default>0:30</option>
                                <option value="01:00">01:00</option>
                                <option value="01:30">01:30</option>
                                <option value="02:00">02:00</option>
                                <option value="02:30">02:30</option>
                                <option value="03:00">03:00</option>
                                <option value="03:30">03:30</option>
                                <option value="04:00">04:00</option>
                                <option value="04:30">04:30</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-success" style={{
                            "marginTop": "24px"
                        }}>Save</button>
                    </div>
                </form>
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
