import React from 'react'
import NewTimeEntryForm from './NewTimeEntryForm.jsx'
import TimeEntiesList from './TimeEntiesList.jsx'

// Do below needed??
// import store from '../../store.js'
// import moment from 'moment'
// import {createTimeEntry} from '../../actions/timeEntries.js'
// import {connect} from 'react-redux'
// import {refsToObject} from '../../helpers'

var Tracking = React.createClass({

    render: function() {
        return (
            <div>
                <NewTimeEntryForm/>
                <TimeEntiesList/>
            </div>
        )
    }
});

export default Tracking
