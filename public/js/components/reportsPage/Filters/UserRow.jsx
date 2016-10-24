import React from 'react';
import store from '../../../store.js';

class UserRow extends React.Component {
    constructor(props) {
        super();
        this.state = {
            checked: false
        };
    }

    handleClick(event) {
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
        const text = this.state.checked ? <b>{fullNameOrLogin}</b> : fullNameOrLogin;

        return (
            <div className="row">
                <div className="col-md-12">
                    <input type="checkbox" onChange={this.handleClick} value={this.props.user.login} checked={this.props.checkStatus} />&nbsp;{text}
                </div>
            </div>
        );
    }
}

export default UserRow;
