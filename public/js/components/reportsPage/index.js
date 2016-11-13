import React from 'react';
import ReportTable from './ReportTable.jsx';
import Filters from './Filters';
import store from '../../store.js';
import { connect } from 'react-redux';
import { fetchReportData } from '../../actions/statistics';

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
            <div className="container container__fixed" style={{"flex": "1 0 auto"}}>
                <div className="row reports-page">
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12">
                                <Filters
                                    users={ this.props.users }
                                    period={ this.props.period }
                                    usersForReport={ this.props.usersForReport} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={ this.getTheReport } className="btn btn__lg btn__blue">
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <ReportTable responseData={ this.props.responseData }/>
                    </div>
                </div>
            </div>
        );
    }
}

function fetchProps(state) {
    return {
        usersForReport: state.reportRequest.users,
        users: state.users.list,
        responseData: state.reportRequest.responseData,
        period: {
            startDate: state.reportRequest.startDate,
            endDate: state.reportRequest.endDate
        }
    }
}

export default connect(fetchProps)(UserActivityPage);
