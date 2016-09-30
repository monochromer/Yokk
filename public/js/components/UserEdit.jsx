import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import store from '../store.js'
import DropPicture from './DropPicture.jsx'
import { findUserByLogin } from '../helpers.js'
import { updateUser } from '../actions/users.js'

var UserEdit = React.createClass({

    getInitialState: function() {
        return {
            user: findUserByLogin( this.props.users, this.props.routeParams.login )
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            user: findUserByLogin( nextProps.users, this.props.routeParams.login )
        })
    },

    handleSubmit: function(event) {
        event.preventDefault();
        var fields = {};

        for (var field in this.refs) {
            fields[field] = this.refs[field].value;
        }

        fields.login = this.state.user.login;
        store.dispatch(updateUser(fields));
    },

    render: function() {
        if (this.state.user == undefined) {
            return (
                <p>
                    Wait a moment please...</p>
            );
        } else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 text-center center-block profile__photo">
                            <DropPicture login={this.state.user.login} photo={this.state.user.profileImg}/>
                        </div>
                        <div className="col-md-9 profile">
                            <form onSubmit={this.handleSubmit}>
                                <h2>{this.state.user.login}
                                </h2>
                                <div className="row">
                                    <div className="col-md-10">
                                        <h3>General</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="fullname">Full Name</label>
                                            <input type="text" className="form-control" ref="fullname" id="fullname" placeholder="Jack Shephard" defaultValue={this.state.user.fullname}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="position">Position</label>
                                            <input type="text" className="form-control" ref="position" id="position" placeholder="Developer" defaultValue={this.state.user.position}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="phone-number">Phone Number</label>
                                            <input type="text" className="form-control" ref="phone" id="phone-number" placeholder="+4 815 16 23 42" defaultValue={this.state.user.phone}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="skype">Skype</label>
                                            <input type="text" className="form-control" ref="skype" id="skype" placeholder="jackshephard" defaultValue={this.state.user.skype}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="workhours">Work Hours</label>
                                            <input type="text" className="form-control" ref="workhours" id="workhours" placeholder="07:00 - 17:00" defaultValue={this.state.user.workhours}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" ref="email" id="email" placeholder="dr.shepard@gmail.com" defaultValue={this.state.user.email}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>Personal</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="birthday">Birthday</label>
                                            <input type="text" className="form-control" ref="birthday" id="birthday" placeholder="01.11.1990" defaultValue={this.state.user.birthday}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vk">VK</label>
                                            <input type="text" className="form-control" ref="vk" id="vk" placeholder="vk.com/jackshephard" defaultValue={this.state.user.vk}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="twitter">Twitter</label>
                                            <input type="text" className="form-control" ref="twitter" id="twitter" placeholder="@jackshephard" defaultValue={this.state.user.twitter}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>About me</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="aboutme">Some text about you</label>
                                            <textarea className="form-control" ref="aboutme" id="aboutme" rows="5" defaultValue={this.state.user.aboutme}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="cv">Link to your CV (hh.ru or other)</label>
                                            <input type="text" className="form-control" ref="cv" defaultValue={this.state.user.cv}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-lg btn-success" style={{
                                            "margin": "20px 0",
                                            "float": "right"
                                        }}>Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
})

var fetchUserStateToProps = function f( state ) {
    return { users: state.users }
}

export default connect( fetchUserStateToProps )( UserEdit );
