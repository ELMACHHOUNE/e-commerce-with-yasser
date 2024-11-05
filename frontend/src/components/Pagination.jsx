import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, specificPage }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <nav className="mt-6">
      <ol className="flex justify-center items-center gap-3 text-xs font-medium">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : currentPage)}
            className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 px-2 py-1"
            disabled={currentPage === 1}
          >
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {/* Pagination Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <li key={index + 1}>
            <button
              onClick={() => handlePageClick(index + 1)}
              className={`block rounded border border-gray-100 px-3 py-1 text-center transition-colors duration-200 ${
                currentPage === index + 1
                  ? 'border-[#18476f] bg-[#18476f] text-white'
                  : index + 1 === specificPage
                  ? 'bg-[#18476f] text-white'
                  : 'bg-white text-[#18476f] hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : currentPage)}
            className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 px-2 py-1"
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ol>
    </nav>
  );
};

export default Pagination;
