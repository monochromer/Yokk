import React from 'react';
import store from '../../store';
import InputElement from 'react-input-mask';
import moment from 'moment';

class FilterPeriod extends React.Component {
  constructor(props) {
    super(props);
  }

  changePeriod(e) {

  }

  render() {

    return (
      <form action="" className="form-inline">

        <div className="form-group">
          <label htmlFor="startDateFilter" className="filtering__label">from &nbsp;</label>
          <InputElement type="text" className="form-control" mask="99.99.9999" id="startDateFilter"/>
        </div>


        <div className="form-group">
          <label htmlFor="endDateFilter" className="filtering__label">&nbsp; to &nbsp;</label>
          <InputElement  type="text" className="form-control" mask="99.99.9999" id="endDateFilter"/>
        </div>

        &nbsp;<button className="btn btn-success"> Filter </button>

      </form>
    );
  }
}

export default FilterPeriod;
