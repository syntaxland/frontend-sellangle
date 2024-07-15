// Paysofter.js
import React, { useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaysofterButton from "./PaysofterButton";
import "./Paysofter.css";
import { formatAmount } from "../../FormatAmount";

function Paysofter({
  currency,
  amount,
  paysofterPublicKey,
  email,
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

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-3">Paysofter Payment Option</h1>

            <ListGroup variant="flush" className="text-center py-2">
              <ListGroup.Item>
                Amount: {formatAmount(amount)} {currency}
              </ListGroup.Item>
            </ListGroup>

            <div>
              <PaysofterButton
                email={email}
                currency={currency}
                amount={amount}
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
