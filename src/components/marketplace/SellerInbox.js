// SellerInbox.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import GetBuyerFreeAdMessages from "./GetBuyerFreeAdMessages";

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
          <hr />

          <div className="py-3">
            <GetBuyerFreeAdMessages />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SellerInbox;
