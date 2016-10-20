import React from 'react';
import store from '../../store.js';
import {getCheckboxStatus} from './reportPageHelpers.js';

class UserCheck extends React.Component {
    constructor(props) {
        super();
        const checkboxStatus = getCheckboxStatus(store.getState().reportRequest.checkbox, props.user.login);
        this.state = { checked: checkboxStatus };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ checked: !this.state.checked });

        let action = {
            payload: { login: event.target.value }
        };

        if (!this.state.checked) {
            action.type = "ADD_USER_TO_REPORT";
            action.payload.checked = true;
        } else {
            action.type = "DELETE_USER_FROM_REPORT";
            action.payload.checked = false;
        }

        store.dispatch(action);
    }

    render() {
        const fullNameOrLogin = this.props.user.fullname
            ? this.props.user.fullname
            : `(login:) ${this.props.user.login}`;
        const text = this.state.checked
            ? <b>{fullNameOrLogin}</b>
            : fullNameOrLogin;
        return (
            <div className="row">
                <div className="col-md-12">
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleClick} value={this.props.user.login}/>&nbsp;{text}
                </div>
            </div>
        );
    }
}

export default UserCheck;
