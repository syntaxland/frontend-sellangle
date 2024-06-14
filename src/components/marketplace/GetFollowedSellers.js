// GetFollowedSellers.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getFollowedSellers } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import SellerCard from "./SellerCard";

function GetFollowedSellers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowedSellers());
  }, [dispatch]);

  const getFollowedSellersState = useSelector(
    (state) => state.getFollowedSellersState
  );
  const {
    loading,
    error,
    followedSellers,
    // sellerAvatarUrl,
  } = getFollowedSellersState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = followedSellers?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log("followedSellers:", followedSellers);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-2">Followed Sellers</h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  No followed sellers found.
                </div>
              ) : (
                <Row>
                  {currentItems.map((followedSeller) => (
                    <Col
                      key={followedSeller.id}
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={3}
                    >
                      <SellerCard
                        followedSeller={followedSeller}
                        // sellerAvatarUrl={sellerAvatarUrl}
                      />
                    </Col>
                  ))}
                </Row>
              )}

              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={followedSellers?.length}
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

export default GetFollowedSellers;
