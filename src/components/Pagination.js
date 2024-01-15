import React from 'react';
import { Button } from "react-bootstrap";

function Pagination({ itemsPerPage, totalItems, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxVisiblePages = 5; 

  let startPage = 1;
  let endPage = pageNumbers.length;

  if (pageNumbers.length > maxVisiblePages) {
    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      endPage = maxVisiblePages - 1;
    } else if (currentPage > pageNumbers.length - Math.ceil(maxVisiblePages / 2)) {
      startPage = pageNumbers.length - maxVisiblePages + 2;
    } else {
      startPage = currentPage - Math.floor(maxVisiblePages / 2);
      endPage = currentPage + Math.floor(maxVisiblePages / 2);
    }
  }

  const pagesToShow = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage - 1)}>
            Previous
          </button>
        </li>
        {startPage > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(1)}>
                1
              </button>
            </li>
            {startPage > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}
        {pagesToShow.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        {endPage < pageNumbers.length && (
          <>
            {endPage < pageNumbers.length - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button className="page-link" onClick={() => paginate(pageNumbers.length)}>
                {pageNumbers.length}
              </button>
            </li>
          </>
        )}
        <li
          className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
        >
          <Button className="page-link" onClick={() => paginate(currentPage + 1)}>
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;


// import React from 'react';

// function Pagination({ itemsPerPage, totalItems, currentPage, paginate }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination justify-content-center">
//         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//           <button className="page-link" onClick={() => paginate(currentPage - 1)}>
//             Previous
//           </button>
//         </li>
//         {pageNumbers.map((number) => (
//           <li
//             key={number}
//             className={`page-item ${currentPage === number ? 'active' : ''}`}
//           >
//             <button className="page-link" onClick={() => paginate(number)}>
//               {number}
//             </button>
//           </li>
//         ))}
//         <li
//           className={`page-item ${
//             currentPage === pageNumbers.length ? 'disabled' : ''
//           }`}
//         >
//           <button className="page-link" onClick={() => paginate(currentPage + 1)}>
//             Next
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Pagination;
