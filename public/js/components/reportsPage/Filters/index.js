import React from 'react';
import UsersFilter from './UsersFilter.jsx';
import store from '../../../store'
import classNames from 'classnames'
import { RANGES } from '../../../constants'
import { Input } from '../../UI.jsx'

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setCustomPeriod = this.setCustomPeriod.bind(this);
        this.state = {
            activePeriod: ""
        }
    }

    handleChange(event) {
        store.dispatch({
            type: "STORE_REPORT_PERIOD",
            [event.target.name]: event.target.value
        })
    }

    setCustomPeriod(range) {
        return () => {
            this.setState({
                activePeriod: range
            });
            store.dispatch({
                type: "STORE_REPORT_PERIOD",
                startDate: RANGES[range][0].format("DD.MM.YYYY"),
                endDate: RANGES[range][1].format("DD.MM.YYYY")
            })
        }
    }

    render() {
        const lasd7DaysClasses = classNames({
            'custom-periods_period': true,
            'custom-periods_period__active': this.state.activePeriod == 'Last 7 Days'
        });

        const yesterdayClasses = classNames({
            'custom-periods_period': true,
            'custom-periods_period__active': this.state.activePeriod == 'Yesterday'
        });

        const thisMonthClasses = classNames({
            'custom-periods_period': true,
            'custom-periods_period__active': this.state.activePeriod == 'This Month'
        });

        const LastMonthClasses = classNames({
            'custom-periods_period': true,
            'custom-periods_period__active': this.state.activePeriod == 'Last Month'
        });
        const usersFilter = classNames({
            'filter_heading': true,
            'heading_highlight': this.props.usersHighlight
        });

        return (
            <form>
                <div className= { usersFilter }>Users</div>
                <UsersFilter users={ this.props.users } usersForReport={ this.props.usersForReport } />
                <div className="filter_heading">Period</div>
                <div className="custom-periods">
                    <div className="row">
                        <div className="col-md-6">
                            <span className={ lasd7DaysClasses } onClick={ this.setCustomPeriod('Last 7 Days') }>Last 7 Days</span>
                        </div>
                        <div className="col-md-6">
                            <span className={ yesterdayClasses } onClick={ this.setCustomPeriod('Yesterday') }>Yesterday</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <span className={ thisMonthClasses } onClick={ this.setCustomPeriod('This Month') }>This Month</span>
                        </div>
                        <div className="col-md-6">
                            <span className={ LastMonthClasses } onClick={ this.setCustomPeriod('Last Month') }>Last Month</span>
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
