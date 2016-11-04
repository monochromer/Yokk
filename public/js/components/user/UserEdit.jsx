import React from 'react'
import store from '../../store.js'
import DropPicture from './DropPicture.jsx'
import ModalChangePassword from './ModalChangePassword.jsx'
import { findUserByLogin } from '../../helpers'
import { updateUser } from '../../actions/users'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class UserEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: findUserByLogin(this.props.users, this.props.routeParams.login)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: findUserByLogin(nextProps.users, this.props.routeParams.login)
        })
    }

    handleSubmit(event) {
        let fields = {};
        event.preventDefault();

        for (let field in this.refs) {
            fields[field] = this.refs[field].value;
        }

        fields.login = this.state.user.login;
        store.dispatch(updateUser(fields));
        browserHistory.push('/user/' + fields.login);
    }

    openModalChangePassword() {
        store.dispatch({ type: "MODAL_CHANGE_PASSWORD_SHOW", login: this.state.user.login });
    }

    render() {

        if (this.state.user) {
            const { profileImg, login, fullname, position, phone, skype, workhours, email, birthday, vk, aboutme, cv } = this.state.user;
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="input input__grey"
                                               placeholder="FullName" defaultValue={ fullname }/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="input input__grey"
                                               placeholder="Developer" defaultValue={ position }/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">

                                        <input type="text" className="input input__grey"
                                               placeholder="+4 815 16 23 42" defaultValue={ phone }/>

                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="input input__grey"
                                               placeholder="jackshephard" defaultValue={ skype }/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="input input__grey" placeholder="07:00 - 17:00" defaultValue={ workhours }/>
                                    </div>
                                    <div className="col-md-6">
                                            <input type="email" className="input input__grey"
                                                   placeholder="dr.shepard@gmail.com"
                                                   defaultValue={ this.state.user.email }/>
                                    </div>
                                </div>
                                <div className="row profile_section">
                                    <div className="col-md-12">
                                        <h3 className="profile_heading">Personal</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="input input__grey"
                                               placeholder="01.11.1990" defaultValue={ this.state.user.birthday }/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="input input__grey"
                                               placeholder="vk.com/jackshephard" defaultValue={ this.state.user.vk }/>
                                    </div>
                                </div>
                                <div className="row profile_section">
                                    <div className="col-md-12">
                                        <h3 className="profile_heading">About me</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <textarea className="input input__grey" name="aboutme" rows="5"
                                                  defaultValue={ this.state.user.aboutme }></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="text" className="input input__grey"
                                               defaultValue={this.state.user.cv}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="text" className="input input__grey"
                                               defaultValue={this.state.user.redmineApiKey}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn">Save</button>
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

function fetchUserStateToProps(state) {
    return { users: state.users }
}

export default connect(fetchUserStateToProps)(UserEdit);
