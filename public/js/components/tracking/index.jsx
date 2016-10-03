import React from 'react'
import store from '../../store.js'
import moment from 'moment'
import { createIssue } from '../../actions/issues.js'
import { connect } from 'react-redux'
import { refsToObject } from '../../helpers'

var Tracking = React.createClass({


    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 text-center col-md-offset-4">
                        <h1>
                            Track your time
                        </h1>
                    </div>
                </div>
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
                                <input type="text" className="form-control" ref="dateAdded" id="date" defaultValue="22.05.1014"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="time">Time</label>
                                <select className="form-control" id="time" ref="minutesSpent" defaultValue="22.05.1014">
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

            </div>
        )
    }
});

export default Tracking
