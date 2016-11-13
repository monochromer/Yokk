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
            <div className="row filter_row vertical-center">
                <div className="col-md-12">
                    <Checkbox onChange={ this.handleChange }
                              label={ fullNameOrLogin }
                              value={ this.props.user.login }
                              name={ this.props.user._id }/>
                </div>
            </div>
        );
    }
}

export default UserRow;
