import React from 'react';
import ReportTableRow from './ReportTableRow.jsx'
import connect from 'react-redux'


class ReportTable extends React.Component {
    render() {
        let propsToPass;
        if (typeof this.props.responseData !== 'undefined') {
            propsToPass = this.props.responseData.data
        }

        let tableToRender;
        if (typeof propsToPass !== 'undefined') {
            tableToRender = Object.keys(propsToPass).map(function(user) {
                return <ReportTableRow user={ user } responseData={ propsToPass[user] } key={ user }/>;
            });
        }

        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="heading reports_heading">Reports</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 reports-table__heading">User</div>
                    <div className="col-md-2 reports-table__heading">Redmine</div>
                    <div className="col-md-2 reports-table__heading">Direct</div>
                    <div className="col-md-2 reports-table__heading">Total</div>
                </div>
                { tableToRender }
            </div>
        );
    }
}



export default ReportTable;
