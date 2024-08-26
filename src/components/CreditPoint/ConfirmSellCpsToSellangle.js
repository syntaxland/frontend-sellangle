// ConfirmSellCpsToSellangle.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { sellCpsToSellangle } from "../../actions/creditPointActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import MessageFixed from "../MessageFixed";
import Loader from "../Loader";
import { formatAmount } from "../FormatAmount";

function ConfirmSellCpsToSellangle({
  paysofterSellerId,
  paysofterAccountId,
  username,
  amount,
  currency,
  link,
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

  const sellCpsToSellangleState = useSelector(
    (state) => state.sellCpsToSellangleState
  );
  const { success, error, loading } = sellCpsToSellangleState;

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
    password: password,
    paysofter_seller_id: paysofterSellerId,
    paysofter_account_id: paysofterAccountId,
    username: username,
    amount: amount,
    currency: currency,
  };
  console.log("SellerId,amt,currency:", paysofterSellerId, amount, currency);

  const handleConfirmSellCpsToSellangle = () => {
    dispatch(sellCpsToSellangle(sellerData));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col md={10}>
          {/* <h2 className="mb-4">Verify Seller</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">
              CPS amount{" "}
              <strong>
                {formatAmount(amount)} {currency}
              </strong>{" "}
              sold to Sellangle successfully.
            </Message>
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
                Warning! This action will transfer the CPS amount of{" "}
                <strong>
                  {formatAmount(amount)} {currency}
                </strong>{" "}
                to Sellangle and <strong>"{link}"</strong> will be used to
                process the checkout. Are you sure you want to continue? Please
                enter the password for your account email{" "}
                <strong>({userInfo.email}</strong>):{" "}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <Form>
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
            <div className="mt-2 py-2">
              <Button
                variant="primary"
                onClick={handleConfirmSellCpsToSellangle}
                className="rounded mt-2 text-center w-100"
                disabled={password === "" || loading || success}
              >
                Submit
              </Button>
            </div>
          </Form>
          {error && <MessageFixed variant="danger">{error}</MessageFixed>}
        </Col>
      </Row>
    </Container>
  );
}

export default ConfirmSellCpsToSellangle;
