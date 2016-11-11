import React from 'react';
import store from '../../../store.js';

import { Checkbox } from '../../UI.jsx';

class UserRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event);
        let action = {
            user: event.target.value
        };

        if (event.target.checked) {
            action.type = "SAVE_USER_FOR_REPORT_TO_STORE";
        } else {
            action.type = "DELETE_USER_FOR_REPORT_FROM_STORE";
        }

        store.dispatch(action);
    }

    render() {
        const fullNameOrLogin = this.props.user.fullname ? this.props.user.fullname : `(login:) ${this.props.user.login}`;

        return (
            <div className="row filter_row">
                <div className="col-md-12">
                    <Checkbox label={ fullNameOrLogin } value={ this.props.user.login }onChange={ this.handleChange } name=""/>
                </div>
            </div>
        );
    }
}

export default UserRow;
