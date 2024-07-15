// Paysofter.js
import React, { useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaysofterButton from "./PaysofterButton";
import "./Paysofter.css";
import { formatAmount } from "../FormatAmount";

function Paysofter({
  amount,
  currency,
  email,
  paysofterPublicKey,
  onSuccess,
  onClose,
}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const createdAt = new Date().toISOString();

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col md={8}>
            <h1 className="text-center py-3">Paysofter Promise Option</h1>

            <ListGroup variant="flush">
              <ListGroup.Item>
                Total Amount: {formatAmount(amount)} {currency}
              </ListGroup.Item>

              <ListGroup.Item>Timestamp: {createdAt}</ListGroup.Item>
            </ListGroup>

            <div>
              <PaysofterButton
                amount={amount}
                email={email}
                currency={currency}
                paysofterPublicKey={paysofterPublicKey}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paysofter;
