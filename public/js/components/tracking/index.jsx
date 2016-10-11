import React from 'react'
import NewTimeEntryForm from './NewTimeEntryForm.jsx'
import TimeEntiesList from './TimeEntiesList.jsx'


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
