import React from 'react';
import store from '../../store.js';
import {connect} from 'react-redux';
import ReportTable from './ReportTable.jsx';
import Filters from './Filters.jsx';
import {fetchReportData} from '../../actions/statistics';

class UserActivityPage extends React.Component {
    constructor(props) {
        super(props);
        this.getTheReport = this.getTheReport.bind(this);
    }

    getTheReport() {
        const users = this.props.usersForReport;
        const startDate = this.props.period.startDate;
        const endDate = this.props.period.endDate;
        store.dispatch(fetchReportData(users, startDate, endDate));
    }

    render() {
        return (
            <div className='row'>
                <div className="col-md-3">
                    <div className="row">
                        <Filters users={this.props.users} period={this.props.period}/>
                    </div>
                    <div className="row">
                        <button onClick={this.getTheReport}
                                className="btn btn-success"
                                style={{ "marginTop": "3vh" }}>
                            Calculate
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    <ReportTable responseData={this.props.responseData}/>
                </div>
            </div>
        );
    }
}

const fetchProps = function(state) {
    const period = {
        startDate: state.reportRequest.startDate,
        endDate: state.reportRequest.endDate
    }
    return {usersForReport: state.reportRequest.users, users: state.users, responseData: state.reportRequest.responseData, period: period};
};

export default connect(fetchProps)(UserActivityPage);
