import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import ActivityTable from './ActivityTable.jsx';
import { FilterUsers, FilterPeriod } from './Filters.jsx';

class UserActivityPage extends React.Component {
    showModalUserAdd() {
        store.dispatch({type: "MODAL_ADD_USER_SHOW"});
    }

    render() {
        return (
            <div>
                <div className="col-md-3">
                    <FilterUsers users={this.props.users} />
                    <FilterPeriod />
                      <div className="col-md-1">
                          <button className="btn btn-success" style={{
                              "marginTop": "3vh"
                          }}>Calculate</button>
                      </div>
                </div>
                <div className="col-md-9">
                    <ActivityTable/>
                </div>
            </div>
        );
    }
}

let fetchUsersStateToProps = function(state) {
    return {users: state.users, currentUser: state.currentUser}
}

export default connect(fetchUsersStateToProps)(UserActivityPage);
