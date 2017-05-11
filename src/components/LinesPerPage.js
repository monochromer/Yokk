import React from 'react';
import PropTypes from 'prop-types';

class LinesPerPage extends React.Component {

	render() {
		const { setLinesPerPage, linesPerPage } = this.props;
		
		const options = [10, 20, 30, 40, 50];
		
		const mappedOptions = options.map((el) => {
			return(
				<option
          key={el}
          value={el}
        >Show {el} entries</option>
			);
		});

		return (
			<div className="lines-per-page">
				<select
          onChange={setLinesPerPage} 
          defaultValue={linesPerPage}
        >
					{mappedOptions}
				</select>
			</div>
		);
	}

}

LinesPerPage.propTypes = {
	linesPerPage: PropTypes.number.isRequired,
	setLinesPerPage: PropTypes.func.isRequired
}

export default LinesPerPage;