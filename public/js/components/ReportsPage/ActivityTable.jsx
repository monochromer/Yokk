import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import ActivityTableRow from './ActivityTableRow.jsx'

class ActivityTable extends React.Component {
    showModalUserAdd() {
        store.dispatch({type: "MODAL_ADD_USER_SHOW"});
    }

    render() {
        let propsToPass;
        if (typeof this.props.responseData !== 'undefined') {
            propsToPass = this.props.responseData.data
        }

        let tableToRender;
        if (typeof propsToPass !== 'undefined') {
          tableToRender = <tbody>
            {Object.keys(propsToPass).map(function(user) {
              return <ActivityTableRow userName={user} responseData={propsToPass[user]} />
            })}
          </tbody>;
        } else {
          <tbody>
            <ActivityTableRow />;
          </tbody>;
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h2>Activity report from DATE</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Total</th>
                                    <th>Redmine</th>
                                    <th>Upwork</th>
                                    <th>Direct</th>
                                </tr>
                            </thead>
                            {tableToRender}
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

var fetchUsersStateToProps = function(state) {
    return {users: state.users, currentUser: state.currentUser}
}

export default connect(fetchUsersStateToProps)(ActivityTable);
