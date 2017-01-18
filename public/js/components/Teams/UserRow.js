import React from 'react';
import { Link } from 'react-router';
import store from '../../store.js';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/users'

class UserRow extends React.Component {

    handleRemove = () => {
        store.dispatch( deleteUser(this.props.user._id) )
    }

    dispatchUserToShow = () => {
        store.dispatch({type: "SAVE_USER_TO_SHOW", user: this.props.user.login})
    }

    render() {
      const {handleRemove, dispatchUserToShow} = this
      const {user} = this.props
      const {login, name, email} = user

      const style = {
        unconfirmedUsers: {backgroundColor:'rgb(255,192,129)', color:'white'}
      }

      let buttons = "";

      const actionButtons = (
          <div className="btn-group" role="group">
              <Link to={ '/user/edit/' + login } className="">
                  <img src="/img/icon-user-edit.svg" alt="edit" width="20px" />
              </Link>
              <span className="users-list_edit" onClick={ handleRemove }>
                  <img src="/img/icon-user-delete.svg" alt="delete" width="20px" />
              </span>
          </div>
      )


    // if (this.props.currentUser.role == "admin" || this.props.currentUser.login == login)
        buttons = actionButtons

      if (!login) return (
        <div className="row users-list_row vertical-center" style={style.unconfirmedUsers}>
            <div className="col-md-3">User is not confirmed yet</div>
            <div className="col-md-3">{email}</div>
            <div className="col-md-2 users-list_position"></div>
            <div className="col-md-1"></div>
            <div className="col-md-2"></div>
            <div className="col-md-1">{buttons}</div>
        </div>
      )

        let { role, position, joinedon, profileImg, fullname, redmineApiKey } = this.props.user;

        const userActivityPageLink = `/user/activityPage/${name}`;
        // let photo = profileImg ? profileImg.small : "";
        let photo = "";
        // let name = fullname ? fullname : login;


        const redmine = redmineApiKey ? <img src="/img/redmine-active.svg" width="52px" height="52px" /> : "Nothing";
        position = position ? position : "No Information";

        return (
            <div className="row users-list_row vertical-center">

                <div className="col-md-3">
                    <div className="row">
                        <div className="col-md-3 users-list_photo">
                            <img src={ photo } width="40px" className="img-circle " />
                        </div>
                        <div className="col-md-9">
                            <Link to={ '/user/' + login } className="users-list_user-name">
                                { name }
                            </Link>
                            <span className="users-list_user-role">{ role }</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">{email}</div>
                <div className="col-md-2 users-list_position"> { position } </div>
                <div className="col-md-1">{ redmine }</div>
                <div className="col-md-2"> <a href={ userActivityPageLink }>Show Activity</a></div>
                <div className="col-md-1">{ buttons }</div>

            </div>
        )
    }
}

function getParams(store) {
    return {
        currentUser: store.currentUser
    }
}

export default connect(getParams)(UserRow)
