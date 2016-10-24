import React from 'react';
import DRPicker from '../../DateRangePicker';
import UsersFilter from './UsersFilter.jsx';

class Filters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.period);
        return (
            <form>
              <h2>Users</h2>
              <UsersFilter users={this.props.users} usersForReport={this.props.usersForReport}/>
              <DRPicker period={this.props.period}  parentComponent="Filters" width = "100px" />
            </form>
        );
    }
}

export default Filters;
