// FollowedSellers.js
import React, { useEffect } from  "react";
import {
  useSelector,
} from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import GetFollowedSellers from "../marketplace/GetFollowedSellers";

function FollowedSellers() {
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  return (
    <div>
      <Row>
        <Col>
          <GetFollowedSellers />
        </Col>
      </Row>
    </div>
  );
}

export default FollowedSellers;
