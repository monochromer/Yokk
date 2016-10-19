import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import ReportTable from './ReportTable.jsx';
import {FilterUsers, FilterPeriod} from './Filters.jsx';
import {fetchReportData} from '../../actions/statistics';

class UserActivityPage extends React.Component {
    render() {
        return (
            <div>
                <div className="col-md-3">
                    <FilterUsers users={this.props.users}/>
                    <FilterPeriod/>
                </div>
                <div className="col-md-9">
                    <ReportTable responseData={this.props.responseData} />
                </div>
            </div>
        );
    }
}

let fetchProps = function(state) {
    return {
      users: state.users,
      responseData: state.reportRequest.responseData
    };
};

export default connect(fetchProps)(UserActivityPage);
