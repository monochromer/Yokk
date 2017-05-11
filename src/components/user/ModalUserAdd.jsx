import React from 'react'
import store from '../../store'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'
import { step5 } from '../../actions/teams'
import { findUserByEmail } from '../../helpers'
import { fetchUsers } from '../../actions/users'


class ModalUserAdd extends React.Component {
  
  state = {
    invitations: [""]
  }

  componentWillMount(){
    this.props.fetchUsers();
  }

  handleClose = () => {
    store.dispatch({type: "MODAL_ADD_USER_CLOSE"});
  }

  handleChange = (e) => {
    const { invitations } = this.state;
    invitations[e.target.name] = e.target.value;
    this.setState({invitations});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let teamId = findUserByEmail(this.props.users, this.props.email).team;
    store.dispatch(step5(teamId, this.state.invitations));
    store.dispatch({type: "MODAL_ADD_USER_CLOSE"});
  }

  addInvitation = () => {
    this.setState({
      invitations: [
        ...this.state.invitations,
        ""
      ]
    });
  }

  render() {

    const modalClasses = classNames({
      modal: true,
      hide: !this.props.status
    });
    const { invitations } = this.state;

    const invitationRows = invitations.map((invitation, index) => {
      return(
        <div className="row center-xs invintations_row" key={ index }>
          <div className="col-md-8 col-sm-8 col-xs-10">
            <Input handleChange={ this.handleChange.bind(this) }
                 className="input-group input-group__grey-white" type="email"
                 name={ index }
                 label="E-mail"/>
          </div>
        </div>
      );
    });

    return (
      <div className={ modalClasses }>
        <div className="modal_close" onClick={ this.handleClose }></div>
        <div className="container">
          <div className="row center-md vertical-center modal_row">
            <div className="col-md-6">
              <div className="row text-center">
                <div className="col-md-12 text-center">
                  <h2 className="heading heading__white">Send Invitations</h2>
                </div>
              </div>
              <form onSubmit={ this.handleSubmit }>

                { invitationRows }

                <div className="row center-xs">
                  <div className="col-md-12">
                    <div className="btn link__white" onClick={ this.addInvitation.bind(this) }>+ Add
                      another invitations
                    </div>
                  </div>
                </div>

                <div className="row marginTop">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn__blue btn__lg linkService_btn">Send</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function getProps(store) {
  return {
    status: store.modals.userAdd.visible,
    users: store.users.list,
    email: store.currentUser.data.email
  }
}

export default connect(getProps, { fetchUsers })(ModalUserAdd)