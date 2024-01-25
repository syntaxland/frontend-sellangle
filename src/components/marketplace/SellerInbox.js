// SellerInbox.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import GetBuyerFreeAdMessages from "./GetBuyerFreeAdMessages";
import GetBuyerPaidAdMessages from "./GetBuyerPaidAdMessages";

function SellerInbox() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  return (
    <div>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <h1 className="text-center py-3">
            <i className="fas fa-message"></i> Seller Inbox
          </h1>

          <div className="py-3">
            <GetBuyerPaidAdMessages />
          </div>

          <div className="py-3">
            <GetBuyerFreeAdMessages />
          </div>

          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default SellerInbox;
