import React from 'react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers: number[] = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumbersToShow = 10; // Adjust this number as needed

  let startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
  startPage = Math.max(startPage, 1);
  let endPage = startPage + maxPageNumbersToShow - 1;
  endPage = Math.min(endPage, totalPages);

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push(-1); // -1 indicates an ellipsis
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push(-1);
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className='mt-3 mb-3 p-3'>
      <ul className="pagination flex justify-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage - 1)} href="#" className="page-link">
            Previous
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'font-bold text-blue-500' : ''} mx-2`}>
            {number === -1 ? (
              <span className="page-link">...</span>
            ) : (
              <a onClick={() => paginate(number)} href="#" className="page-link">
                {number}
              </a>
            )}
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage + 1)} href="#" className="page-link">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
