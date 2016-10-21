import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import ReportTable from './ReportTable.jsx';
import Filters from './Filters.jsx';
import {fetchReportData} from '../../actions/statistics';

class UserActivityPage extends React.Component {
    getTheReport() {
        const users = store.getState().reportRequest.users;
        const startDateFilter = store.getState().reportRequest.startDateFilter;
        const endDateFilter = store.getState().reportRequest.endDateFilter;
        store.dispatch(fetchReportData(users, startDateFilter, endDateFilter));
    }

    render() {
        return (
            <div>
                <div className="col-md-3">
                    <Filters users={this.props.users}/>
                </div>
                <div className="col-md-9">
                    <ReportTable responseData={this.props.responseData}/>
                </div>
            </div>
        );
    }
}

const fetchProps = function(state) {
    return {users: state.users, responseData: state.reportRequest.responseData};
};

export default connect(fetchProps)(UserActivityPage);
