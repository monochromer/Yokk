import React from 'react';
import UsersFilter from './UsersFilter.jsx';
import store from '../../../store'
import { Input } from '../../UI.jsx'

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        store.dispatch({
            type: "STORE_REPORT_PERIOD",
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form>
                <div className="filter_heading">Users</div>
                <UsersFilter users={ this.props.users } usersForReport={ this.props.usersForReport }/>
                <div className="filter_heading">Period</div>
                <Input handleChange={ this.handleChange }
                       className="input-group input-group__grey"
                       label="from" name="startDate" />

                <Input handleChange={ this.handleChange }
                       className="input-group input-group__grey"
                       label="to"
                       name="endDate" />
            </form>
        );
    }
}

export default Filters;
