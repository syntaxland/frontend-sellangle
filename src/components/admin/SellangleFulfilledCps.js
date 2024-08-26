// SellangleFulfilledCps.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { sellangleFulfilledCps } from "../../actions/creditPointActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
import { formatAmount } from "../FormatAmount";

function SellangleFulfilledCps({
  cpsId,
  amount,
  cps_amount,
  seller_username,
  currency,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const sellangleFulfilledCpsState = useSelector(
    (state) => state.sellangleFulfilledCpsState
  );
  const { success, error, loading } = sellangleFulfilledCpsState;

  const [promiseId, setPromiseId] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const sellerData = {
    seller_username: seller_username,
    cps_id: cpsId,
    paysofter_promise_id: promiseId,
    password: password,
  };
  console.log("cpsId:", cpsId);

  const handlesellangleFulfilledCps = () => {
    dispatch(sellangleFulfilledCps(sellerData));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col md={10}>
          {/* <h2 className="mb-4">Verify Seller</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">CPS Fulfilled successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          <ListGroup className="text-center py-2">
            <ListGroup.Item>
              <p className="rounded mt-2 py-1 text-center">
                <i
                  className="fa fa-warning text-warning"
                  style={{
                    fontSize: "18px",
                    // color: "orange"
                  }}
                ></i>{" "}
                Warning! This action will fulfil the{" "}
                <i>
                  {formatAmount(amount)} {currency}
                </i>{" "}
                for <i>{formatAmount(cps_amount)}</i> CPS of seller with
                username <i>{seller_username}</i>. Are you sure you want to
                continue? Please enter the password for your account email{" "}
                <strong>({userInfo.email}</strong>):{" "}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={promiseId}
                onChange={(e) => setPromiseId(e.target.value)}
                placeholder="Enter Paysofter Promise ID"
                className="rounded mt-2"
                required
                maxLength={20}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded mt-2"
                required
                maxLength={100}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handlesellangleFulfilledCps}
              className="rounded mt-2 text-center w-100"
              disabled={promiseId === "" || loading || success}
            >
              Fulfil CPS
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SellangleFulfilledCps;
