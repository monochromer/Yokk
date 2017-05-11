import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {

	render() {
		const { page, pagesCount, setPage } = this.props;
		
		const prevPageClass = page === 1 ? 'disabled' : '';
		const nextPageClass = page === pagesCount ? 'disabled' : '';

		return (
			<div className="pagination">
        <span className={prevPageClass}>
          <a
            href="#"
            onClick={setPage}
            value={page - 1}
          >
            &lt;
          </a>
        </span>
        {" "}Page {page} of {pagesCount}{" "}
        <span className={nextPageClass}>
          <a
            href="#"
            onClick={setPage}
            value={page + 1}
          >
            &gt;
          </a>
        </span>
			</div>
		);
	}

}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	pagesCount: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired
}

export default Pagination;