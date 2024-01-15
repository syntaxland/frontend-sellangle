// ApplyPromoCode.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { applyPromoCode } from "../actions/promoActions";
import Message from "./Message";
import Loader from "./Loader";

const ApplyPromoCode = ({order_id}) => {
  const dispatch = useDispatch();

  const applyPomoCodeState = useSelector((state) => state.applyPomoCodeState);
  const { loading, success, discountPercentage, promoDiscount, error } = applyPomoCodeState;
  console.log(
    "ApplyPromoCode promoDiscount:",
    promoDiscount,
    "discountPercentage:",
    discountPercentage
  );

  const [promoCode, setPromoCode] = useState("");

  const applyCodeHandler = (e) => {
    e.preventDefault();
    dispatch(applyPromoCode(promoCode, order_id));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {}, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div>
      <Row>
        <Col>
          <div>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {success && (
              <Message variant="success">
                Promo code "{promoCode}" with {discountPercentage}% discount applied successfully.
              </Message>
            )}
          </div>

          <div>
            <Form onSubmit={applyCodeHandler}>
              <Row>
                <Col>
                  <Form.Group controlId="promoCode">
                    <Form.Control
                      type="text"
                      placeholder="Enter promo code if any"
                      className="rounded"
                      value={promoCode}
                      required
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button className="rounded" variant="danger" type="submit">
                    Apply Promo Code
                  </Button>
                </Col>
                  <p className="text-muted">Enter promo code and apply if any.</p>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ApplyPromoCode;
