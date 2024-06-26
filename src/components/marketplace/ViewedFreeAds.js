// ViewedFreeAds.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getUserFreeAdsViews } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

import AllFreeAdCard from "./AllFreeAdCard";

function ViewedFreeAds() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFreeAdsViews());
  }, [dispatch]);

  const getUserViewedFreeAdsState = useSelector((state) => state.getUserViewedFreeAdsState);
  const { loading, error, viewedAds } = getUserViewedFreeAdsState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = viewedAds?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-2">Running Ads</h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
            {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  Viewed running ads appear here.
                </div>
              ) : (
              <Row>
                {currentItems.map((product) => (
                  <Col key={product._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                    <AllFreeAdCard product={product} />
                  </Col> 
                ))}
              </Row>
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={viewedAds?.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ViewedFreeAds;
