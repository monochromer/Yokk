import React from 'react';
import UserCheck from './UserCheck.jsx';
import {OptionalPeriod, CustomPeriod} from './PeriodChoices.jsx';

export class FilterUsers extends React.Component {
    render() {
        return (
            <div>
                <h2>Users</h2>
                {this.props.users.map((user) => {
                    return <UserCheck user={user} key={user._id}/>
                })
}
            </div>
        );
    }
}

export class FilterPeriod extends React.Component {
    render() {
        return (
            <div>
                <h2>Periods</h2>
                {/*<OptionalPeriod/>*/}
                <CustomPeriod/>
            </div>
        );
    }
}
