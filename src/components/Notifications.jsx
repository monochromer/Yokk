import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Pagination from './Pagination';
import LinesPerPage from './LinesPerPage';

class Notifications extends React.Component {

  state = {
    linesPerPage: 20,
    page: 1
  }

  pagesCount(){
    return Math.ceil(this.props.notifications.length / this.state.linesPerPage);
  }
	
	setPage = (e) => {
		e.preventDefault();
    const page = parseInt(e.target.getAttribute("value"), 10);
		if(page > 0 && page <= this.pagesCount()){
			this.setState({page});
		}
	}
	
	setLinesPerPage = (e) => {
		e.preventDefault();
		this.setState({
			linesPerPage: parseInt(e.target.value, 10),
			page: 1
		});
	}
    
  render(){
    const { notifications } = this.props;
		const { linesPerPage, page } = this.state;
    const pagesCount = this.pagesCount();
		const firstLine = (page - 1) * linesPerPage;
		const lastLine = firstLine + linesPerPage;

    let mappedNotifications = [];
    for(let i = firstLine; i < lastLine && i < notifications.length; i++){
      const el = notifications[notifications.length - 1 - i];
      mappedNotifications.push(
        <Link key={el._id} to={el.link}>
          <div className={"row notifications-item " + (el.new ? 'new' : '')}>
            <div className="col-md-1"></div>
            <div className="col-md-9">{el.text}</div>
            <div className="col-md-2">{moment(el.date).format('L')}</div>
          </div>
        </Link>
      );
    }

    return (
      <div className="container container-fluid">
        <h2>Notifications</h2>
        <div className="notifications-table">
          {mappedNotifications}
        </div>
        <div className="text-right">
          <LinesPerPage
            setLinesPerPage={this.setLinesPerPage}
            linesPerPage={linesPerPage}
          />
          <Pagination
            page={page}
            pagesCount={pagesCount}
            setPage={this.setPage}
          />
        </div>
      </div>
    )
  }
}

Notifications.propTypes = {
	notifications: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		notifications: state.notifications
	};
}

export default connect(mapStateToProps)(Notifications);
