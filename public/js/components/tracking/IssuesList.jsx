import React from 'react'

var IssuesList = React.createClass({
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row day">
                            <div className="col-md-4 day__date">
                                <h3>Fri, 20 Sep
                                    <span className="day__total-duration"> 5 h 20 min</span>
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td></td>
                                            <td>Task</td>
                                            <td>Duration</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>Implemeting super features</td>
                                            <td>0:30</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default IssuesList
