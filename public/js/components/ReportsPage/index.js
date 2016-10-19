import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import ReportTable from './ReportTable.jsx';
import {FilterUsers, FilterPeriod} from './Filters.jsx';
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
                    <FilterUsers users={this.props.users}/>
                    <FilterPeriod/>
                    <div className="col-md-1">
                        <button onClick={this.getTheReport} className="btn btn-success" style={{
                            "marginTop": "3vh"
                        }}>Calculate</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <ReportTable responseData={this.props.responseData}/>
                </div>
            </div>
        );
    }
}

let fetchProps = function(state) {
    return {users: state.users, responseData: state.reportRequest.responseData};
};

export default connect(fetchProps)(UserActivityPage);
