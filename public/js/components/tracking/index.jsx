import React from 'react'
import NewTimeEntryForm from './NewTimeEntryForm.jsx'
import TimeEntriesList from './TimeEntriesList.jsx'

var Tracking = React.createClass({

    render: function() {

        return (
            <div>
                <NewTimeEntryForm />
                <TimeEntriesList/>
            </div>
        );
    }
});

export default Tracking
