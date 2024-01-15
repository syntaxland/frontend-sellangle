// ReviewScreen.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table, Button, Image } from "react-bootstrap";
import { listReviews } from "../../actions/orderActions";
import Message from "../Message";
import Loader from "../Loader";
import Rating from "../Rating";

function ReviewScreen() {
  const dispatch = useDispatch();
 
  const { productId } = useParams();

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;
  // const { loading, error, reviews } = reviewList || { reviews: [] };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(listReviews(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <h1 className="text-center">Reviews</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>SN</th>
                <th>Product</th>
                <th>Name</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((review, index) => (
                <tr key={review._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={review.product.image}
                      alt={review.product.name}
                      fluid
                      rounded
                      style={{ width: "80px", height: "80px" }}
                    />
                  </td>
                  <td>{review.product.name}</td>
                  {/* <td>{review.order_id}</td> */}
                  {/* <td>{review.user}</td> */}
                  <td>
                    {review.user.first_name} {review.user.last_name}
                  </td>
                  {/* <td>{review.rating}</td> */}
                  <td>
                    <Rating value={review.rating} color={"#f8e825"} />
                  </td>
                  <td>{review.comment}</td>
                  <td>{new Date(review.createdAt).toLocaleString()}</td>
                  <td>
                    <Button className="rounded" variant="danger" size="sm">
                      <i className="fas fa-heart"></i> Like
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default ReviewScreen;
