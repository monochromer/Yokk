import React from 'react'
import DropPicture from './DropPicture.jsx'
import store from '../../store.js'
import { Input } from '../UI.jsx'
import { findUserByLogin } from '../../helpers'
import { updateUser } from '../../actions/users'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class UserEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: findUserByLogin(this.props.users, this.props.routeParams.login),
            fields: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: findUserByLogin(nextProps.users, this.props.routeParams.login)
        })
    }

    handleChange(event) {
        let fields = Object.assign({}, this.state.fields, { [event.target.name]: event.target.value });

        this.setState({
            fields: fields
        });

        store.dispatch({ type: "SET_READY_STATE" });
    }



    handleSubmit(event) {
        event.preventDefault();
        store.dispatch(updateUser(this.state.user._id, this.state.fields));
    }

    openModalChangePassword() {
        store.dispatch({ type: "MODAL_CHANGE_PASSWORD_SHOW", login: this.state.user.login });
    }



    render() {

        let statusIcons = "";
        switch (this.props.status) {

            case "ready":
                statusIcons = "";
                break;

            case "loading":
                statusIcons = ( <div className="saving-start">Saving...</div> );
                break;

            case "success":
                statusIcons = ( <div className="icon-saving-success">Saved</div> );
                break;

            default:
                statusIcons = "";
        }


        if (this.state.user) {
            const { profileImg, login, redmineApiKey, fullname, position, phone, skype, workhours, email, birthday, vk, aboutme, cv } = this.state.user;
            const photo = profileImg ? profileImg.medium : "";
            return (
                <div className="container profile">
                    <div className="row">

                        <div className="col-md-3 profile_photo">
                            <DropPicture login={ login } photo={ photo }/>
                        </div>

                        <div className="col-md-9">
                            <form onSubmit={ this.handleSubmit }>
                                <h2>{ login }</h2>
                                <div className="row profile_section">
                                    <div className="col-md-12">
                                        <h3 className="profile_heading">General</h3>
                                    </div>
                                </div>
                                <div className="row profile_inputs-row">
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="fullname" label="Full Name" defaultValue={ fullname } />
                                    </div>
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="position" label="Position" defaultValue={ position } />
                                    </div>
                                </div>
                                <div className="row profile_inputs-row">
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="phone" label="Phone" defaultValue={ phone } />
                                    </div>
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="skype" label="Skype" defaultValue={ skype } />
                                    </div>
                                </div>
                                <div className="row profile_inputs-row">
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="workhours" label="Work Hours" defaultValue={ workhours } />
                                    </div>
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="email" label="E-mail" defaultValue={ email } />
                                    </div>
                                </div>
                                <div className="row profile_section">
                                    <div className="col-md-12">
                                        <h3 className="profile_heading">Personal</h3>
                                    </div>
                                </div>
                                <div className="row profile_inputs-row">
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="birthday" label="Birthday" defaultValue={ birthday } />
                                    </div>
                                    <div className="col-md-6">
                                        <Input handleChange={ this.handleChange } name="vk" label="VK" defaultValue={ vk } />
                                    </div>
                                </div>
                                <div className="row profile_section">
                                    <div className="col-md-12">
                                        <h3 className="profile_heading">About me</h3>
                                    </div>
                                </div>
                                <div className="row profile_inputs-row">
                                    <div className="col-md-12">
                                        <Input handleChange={ this.handleChange } name="cv" label="CV" defaultValue={ cv } />
                                    </div>
                                </div>
                                <div className="row profile_inputs-row vertical-center">
                                    <div className="col-md-2">
                                        <button type="submit" className="btn btn_blue btn_lg">Save</button>
                                    </div>
                                    <div className="col-md-3">
                                        { statusIcons }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else {
            return ( <p> Wait a moment please... </p>);
        }
    }
}

function getProps(state) {
    return {
        users: state.users.list,
        status: state.users.status
    }
}

export default connect(getProps)(UserEdit);
