import React from 'react'
import store from '../../store'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Input } from '../UI.jsx'
import { step5 } from '../../actions/teams'
import { findUserByLogin } from '../../helpers'
import { fetchUsers } from '../../actions/users'


class ModalUserAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = { rows: 1, invitations: [] };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addInvitation = this.addInvitation.bind(this);
    }

    componentWillMount(){
      this.props.fetchUsers();
    }

    handleClose() {
        store.dispatch({type: "MODAL_ADD_USER_CLOSE"});
    }

    handleChange(event) {
        this.setState({
          invitations: {
            [event.target.name]: event.target.value
          }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let teamId = findUserByLogin(this.props.users, this.props.login).team;
        store.dispatch(step5(teamId, this.state.invitations));
        store.dispatch({type: "MODAL_ADD_USER_CLOSE"});
    }

    addInvitation() {
        this.setState({
            rows: this.state.rows + 1
        });
    }

    render() {

        const modalClasses = classNames({
            modal: true,
            hide: !this.props.status
        });

        var invitationRows = [];
        for (let i = 0; i < this.state.rows; i++) {
            invitationRows.push(
                <div className="row center-xs invintations_row" key={ "invite_" + i }>
                    <div className="col-md-8 col-sm-8 col-xs-10">
                        <Input handleChange={ this.handleChange.bind(this) }
                               defaultValue={ this.state.invitations[i] }
                               className="input-group input-group__grey-white" type="email"
                               name={ i }
                               label="E-mail"/>
                    </div>
                </div>
            );
        }

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
        login: store.currentUser.data.login
    }
}

export default connect(getProps, { fetchUsers })(ModalUserAdd)
