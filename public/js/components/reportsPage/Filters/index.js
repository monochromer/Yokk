import React from 'react';
import UsersFilter from './UsersFilter.jsx';
import store from '../../../store'
import { RANGES } from '../../../constants'
import { Input } from '../../UI.jsx'

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setCustomPeriod = this.setCustomPeriod.bind(this);
    }

    handleChange(event) {
        store.dispatch({
            type: "STORE_REPORT_PERIOD",
            [event.target.name]: event.target.value
        })
    }

    setCustomPeriod(range) {

        return () => {
            store.dispatch({
                type: "STORE_REPORT_PERIOD",
                startDate: RANGES[range][0].format("DD.MM.YYYY"),
                endDate: RANGES[range][1].format("DD.MM.YYYY")
            })
        }
    }

    render() {
        return (
            <form>
                <div className="filter_heading">Users</div>
                <UsersFilter users={ this.props.users } usersForReport={ this.props.usersForReport }/>
                <div className="filter_heading">Period</div>
                <div className="custom-periods">
                    <div className="row">
                        <div className="col-md-6">
                            <span className="custom-periods_period" onClick={ this.setCustomPeriod('Last 7 Days') }>Last 7 Days</span>
                        </div>
                        <div className="col-md-6">
                            <span className="custom-periods_period" onClick={ this.setCustomPeriod('Yesterday') }>Yesterday</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <span className="custom-periods_period" onClick={ this.setCustomPeriod('This Month') }>This Month</span>
                        </div>
                        <div className="col-md-6">
                            <span className="custom-periods_period" onClick={ this.setCustomPeriod('Last Month') }>Last Month</span>
                        </div>
                    </div>
                </div>
                <Input value={ this.props.period.startDate }
                       className="input-group input-group__grey"
                       label="from" name="startDate"
                       handleChange={ this.handleChange }/>

                <Input handleChange={ this.handleChange }
                       value={ this.props.period.endDate }
                       className="input-group input-group__grey"
                       label="to"
                       name="endDate"/>
            </form>
        );
    }
}


export default Filters;
