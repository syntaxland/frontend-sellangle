// SuccessScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MessageFixed from "./MessageFixed";

const SuccessScreen = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <div className="py-2 text-center">
            <MessageFixed variant="success">
              Transaction successful!
            </MessageFixed>
            <h2 className="py-2 mb-2">Successful! </h2>
            <p>Payment created successfully!</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessScreen;
