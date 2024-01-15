// CurrentAds.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import FreeAdScreen from "./FreeAdScreen";
import PaidAdScreen from "./PaidAdScreen";
 
function CurrentAds({ history }) {
  return (
    <div>
      <Row>
        <Col>
          <div>
            <FreeAdScreen />
          </div>

          <div>
            <PaidAdScreen />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CurrentAds;
