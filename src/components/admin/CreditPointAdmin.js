// CreditPointAdmin.js
import React, { useEffect } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import SoldCpsToSellangle from "./SoldCpsToSellangle";

const CreditPointAdmin = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  return (
    <Container>
      <Row>
        <div className="d-flex justify-content-center">
          <Col>
            <div>
              <SoldCpsToSellangle />
            </div>
            <hr />
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default CreditPointAdmin;
