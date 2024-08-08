// ConfirmPaysofterPromise.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const ConfirmPaysofterPromise = () => {

  const handleConfirmPromise = () => {
    // dispatch(clearCart());
    window.location.reload();
    window.location.href = "https://paysofter.com/promise/buyer";
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Row className="text-center py-2">
            <Col>
              {/* <h2 className="py-2 text-center">Confirm Paysofter Promise</h2> */}
            </Col>
          </Row>

          <div className="py-2 text-center">
            <h3 className="py-2 mb-2">Promise successfully created! </h3>
            <p>
              Is Promise fulfilled? Check your email or login to your Paysofter
              account to check out the Promise status to confirm.
            </p>{" "}
            <span>
              <Button
                className="w-100 rounded"
                type="button"
                variant="primary"
                onClick={handleConfirmPromise}
              >
                Confirm Promise (at Paysofter)
              </Button>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmPaysofterPromise;
