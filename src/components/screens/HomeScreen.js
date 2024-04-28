// HomeScreen.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import { listProducts } from "../../actions/productAction";
// import { listPromoProducts } from "../../actions/promoActions";
import Loader from "../Loader";
import Message from "../Message";
// import PromoProductScroll from "../PromoProductScroll";
import RecommendedProducts from "../profiles/RecommendedProducts";
// import AllPaidAdScreen from "../marketplace/AllPaidAdScreen";
function HomeScreen({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const promoProductList = useSelector((state) => state.promoProductList);
  // const { promoProducts } = promoProductList;
  // console.log("promoProducts:", promoProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(listProducts());
    // dispatch(listPromoProducts());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Row className="d-flex justify-content-center py-2">
        <Col>

          {/* <div>
            <AllPaidAdScreen />
            <span className="d-flex justify-content-center text-center">
              Check out more deals and/or post your ads at marketplace angle.{"  "}
              <Button
                variant="primary"
                className="rounded"
                size="sm"
                onClick={() => history.push("/marketplace")}
              >
                Go to MarketPlace <i className="fa fa-shopping-cart"></i>
              </Button>
            </span>
          </div> */}

          {/* <div>
            <hr />
            <h1 className="text-center py-3">Sell Angle Current Offers</h1>
            <hr />
            <PromoProductScroll />
            
          </div> */}

          <div>
            <hr />
            <h1 className="text-center py-3">Latest Products</h1>
            <hr />
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {currentItems?.length === 0 ? (
                  <div className="text-center">
                    Latest products appear here.
                  </div>
                ) : (
                  <Row>
                    {currentItems?.map((product) => (
                      <Col
                        key={product._id}
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={4}
                      >
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                )}
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
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

          <hr />

          <div className="py-3">
            {userInfo ? <RecommendedProducts /> : null}
          </div>
          {/* <hr /> */}
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen; 
