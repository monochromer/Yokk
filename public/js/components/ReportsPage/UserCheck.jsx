import React from 'react';
import store from '../../store.js';

class UserCheck extends React.Component {
    constructor(props) {
        super();
        this.state = {
            checked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            checked: !this.state.checked
        });
        let action = {
            payload: {
                login: event.target.value
            }
        };
        if (!this.state.checked) {
            action.type = "ADD_USER_TO_REPORT";
        } else {
          action.type = "DELETE_USER_FROM_REPORT";
        }
        store.dispatch(action);

    }

    render() {
        let fullNameOrLogin = this.props.user.fullname
            ? this.props.user.fullname
            : `(login:) ${this.props.user.login}`;
        let text = this.state.checked
            ? <b>{fullNameOrLogin}</b>
            : fullNameOrLogin;
        return (
            <div className="row">
                <div className="col-md-12">
                    <input type="checkbox" onClick={this.handleClick} value={this.props.user.login}/>&nbsp;{text}
                    <hr/>
                </div>
            </div>
        );
    }
}

export default UserCheck
