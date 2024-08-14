// SellerSearchCard.js
import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, ListGroup, Button, Container } from "react-bootstrap";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function SellerSearchCard({ serachResults, sellerAvatarUrl }) {
  const history = useHistory();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // useEffect(() => {
  //   if (!userInfo) {
  //     window.location.href = "/login";
  //   }
  // }, [userInfo]);

  function calculateDuration(joinedTimestamp) {
    const now = new Date();
    const joinedDate = new Date(joinedTimestamp);
    const duration = now - joinedDate;

    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""}`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }

  const handleSellerShopFront = () => {
    history.push(`/shopfront/${serachResults?.seller_username}/`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <ListGroup className="py-2">
              <ListGroup.Item>
                <ListGroup.Item>Seller</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={6}>
                      <span className="d-flex justify-content-between py-2">
                        {sellerAvatarUrl && (
                          <img
                            src={sellerAvatarUrl}
                            alt="Seller"
                            style={{
                              maxWidth: "80px",
                              maxHeight: "80px",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        {serachResults?.seller_username}
                      </span>
                    </Col>
                    <Col md={6}>
                      <div>
                        <span>
                          {serachResults?.is_seller_verified ? (
                            <>
                              <Button
                                variant="outline-success"
                                size="sm"
                                className="rounded"
                                disabled
                              >
                                <i className="fas fa-user"></i>{" "}
                                <i>Verified ID</i>{" "}
                                <i
                                  className="fas fa-check-circle"
                                  style={{
                                    fontSize: "18px",
                                    color: "blue",
                                  }}
                                ></i>
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="rounded"
                                disabled
                              >
                                <i className="fas fa-user"></i>{" "}
                                <i>ID Not Verified</i>{" "}
                                <i
                                  style={{ fontSize: "18px", color: "red" }}
                                ></i>
                              </Button>
                            </>
                          )}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  Business Name: {serachResults?.business_name}
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="d-flex justify-content-between py-2">
                    <ListGroup.Item>
                      Joined since{" "}
                      {calculateDuration(serachResults?.seller_joined_since)}
                    </ListGroup.Item>
                    <Button
                      variant="primary"
                      size="sm"
                      className="py-2 rounded"
                      onClick={handleSellerShopFront}
                    >
                      <i className="fa fa-shopping-cart"></i> Go to Seller
                      Shopfront
                    </Button>
                  </span>
                </ListGroup.Item>
              </ListGroup.Item>
            </ListGroup>
          </Row>
          {/* )} */}
        </Col>
      </Row>
    </Container>
  );
}

export default SellerSearchCard;
