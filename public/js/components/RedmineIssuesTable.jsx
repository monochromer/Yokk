import React from 'react';
import store from '../store.js';
import { connect } from "react-redux"

import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import IssueRow from './IssueRow.jsx';

var IssuesTable = React.createClass({

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h2>Team</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Issue ID</th>
                                    <th>Estimated hours</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.issues.issues.map( (issue) => {
                                    return <IssueRow issue={ issue } key={ issue.id }/>
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
});

var fetchIssuesStateToProps = function(state) {
    return {
        issues: state.issues
    }
}


export default connect(fetchIssuesStateToProps)(IssuesTable);
