import React from 'react'
import NewIssueForm from './newIssueForm.jsx'
import IssuesList from './IssuesList.jsx'
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
                <NewIssueForm />
                <IssuesList />
            </div>
        )
    }
});

export default Tracking
