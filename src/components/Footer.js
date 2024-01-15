import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
  const currentYear = new Date().getFullYear();

function Footer() {
  const softGlobalLink = () => {
    window.location.href = "http://softglobal.org";
  };

  return (
    <footer className="bg-dark text-light footer">
      <Container fluid>
        {/* <Row className="py-3">
          <Col className="text-center">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
          <Col className="text-center">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li>Building Materials</li>
              <li>Construction</li>
              <li>Logistics</li>
              <li>Shipping</li>
            </ul>
          </Col>
          <Col className="text-center">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>FAQs</li>
              <li>Shipping &amp; Returns</li>
              <li>Customer Service</li>
            </ul>
          </Col>
        </Row> */}
        <Row>
          <Col className="text-center py-3">
            {/* <p>&copy; Mcdof Shop Inc, {currentYear}.{" "} </p> */}
            <p>&copy; Sellangle Inc, {currentYear}.{" "} | Angle for quick sells... </p>
            Powered by
            <Button
              variant="outline-transparent"
              className="rounded"
              onClick={softGlobalLink}
            >
              SoftGlobal
            </Button>{" "}
            | +2349066167293
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
