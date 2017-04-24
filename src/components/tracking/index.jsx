import React from 'react'
import NewTimeEntryForm from './NewTimeEntryForm.jsx'
import TimeEntriesList from './TimeEntriesList.jsx'

class Tracking extends React.Component {

    render() {

        return (
            <div style={{"flex": "1 0 auto"}}>
                <NewTimeEntryForm />
                <TimeEntriesList/>
            </div>
        );
    }
}

export default Tracking
