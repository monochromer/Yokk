import React from 'react'
import { createIssue } from '../../actions/issues.js'

var Tracking = React.createClass({
    handleSubmit: function(e) {

    },

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
                    <form>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="date">Task</label>
                                <input type="text" className="form-control" placeholder="What are you working on?"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input type="text" className="form-control" id="date" defaultValue="22.05.1014"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="time">Time</label>
                                <select className="form-control" id="time" defaultValue="22.05.1014">
                                    <option value="0:30" default>0:30</option>
                                    <option value="1:00">1:00</option>
                                    <option value="1:30">1:30</option>
                                    <option value="2:00">2:00</option>
                                    <option value="2:30">2:30</option>
                                    <option value="3:00">3:00</option>
                                    <option value="3:30">3:30</option>
                                    <option value="4:00">4:00</option>
                                    <option value="4:30">4:30</option>
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
