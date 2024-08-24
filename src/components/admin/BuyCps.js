// BuyCps.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { sellCreditPoint } from "../../actions/creditPointActions";
import { getPaymentApiKeys } from "../../actions/paymentActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";
import SelectCurrency from "./SelectCurrency";
// import { Paysofter } from "../react-paysofter/src/index";
import { Paysofter } from "react-paysofter";

const NGN_CPS_CHOICES = [
  ["1000000", "2m CPS for 1m NGN"],
  ["2500000", "5m CPS for 2m NGN"],
  ["5000000", "10m CPS for 5m NGN"],
  ["7500000", "15m CPS for 7m NGN"],
  ["10000000", "20m CPS for 10m NGN"],
];

const USD_CPS_CHOICES = [
  ["1000", "2m CPS for 1,000 USD"],
  ["2500", "5m CPS for 2,500 USD"],
  ["5000", "10m CPS for 5,000 USD"],
  ["7500", "15m CPS for 7,500 USD"],
  ["10000", "20m CPS for 10,000 USD"],
];

function BuyCps() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      dispatch(getPaymentApiKeys());
    }
  }, [userInfo, dispatch]);

  const sellCreditPointState = useSelector(
    (state) => state.sellCreditPointState
  );
  const { success, error, loading } = sellCreditPointState;

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const { loading: publicKeyLoading, paysofterPublicKey } =
    getPaymentApiKeysState;

  const [username, setUsername] = useState("sellangle");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [password, setPassword] = useState("");
  // const [messsage, setMesssage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const email = userInfo.email;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const lowerCaseUsername = username.toLowerCase().trim();
  const creditPointData = {
    username: lowerCaseUsername,
    amount: amount,
    // cps_amount: cps_amount,
    password: password,
  };
  console.log("creditPointData:", creditPointData);

  const handleSellCreditPoint = () => {
    setShowPayment(true);
  };

  useEffect(() => {
    setAmount("");
    setShowPayment(false);
  }, [currency]);

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  const handleOnSuccess = () => {
    console.log("handling onSuccess...");
    const creditPointData = {
      amount: amount,
    };
    dispatch(sellCreditPoint(creditPointData));
  };

  const onSuccess = () => {
    handleOnSuccess();
  };

  const handleOnClose = () => {
    console.log("handling onClose...");
    setShowPayment(false);
  };

  const onClose = () => {
    handleOnClose();
  };

  useEffect(() => {
    if (success) {
      // setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        // setShowSuccessMessage(false);
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success]);

  console.log("cps, amt, key:", amount, currency, paysofterPublicKey);

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col md={10}>
          {!showPayment && (
            <div>
              <div className="d-flex justify-content-center">
                <SelectCurrency
                  selectedCurrency={currency}
                  onCurrencyChange={handleCurrencyChange}
                />
              </div>
              {publicKeyLoading && <Loader />}
              {loading && <Loader />}
              {success && (
                <Message variant="success">
                  You have transferred {amount} credit points to {username}{" "}
                  successfully.
                </Message>
              )}
              {error && <Message variant="danger">{error}</Message>}
              {/* {messsage && <Message variant="danger">{messsage}</Message>} */}

              <Form>
                

                <Form.Group className="py-1">
                  <Form.Label>Buyer</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    // placeholder="Enter cps receiver's username"
                    className="rounded"
                    required
                    maxLength={12}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="py-1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="rounded"
                    required
                    maxLength={100}
                  />
                </Form.Group>
                
                <div className="py-2">
                  <Button
                    variant="success"
                    onClick={handleSellCreditPoint}
                    className="rounded text-center w-100"
                    disabled={
                      password === "" || username === "" || amount === ""
                    }
                  >
                   Confirm Sell CPS
                  </Button>
                </div>
                <div className="py-2 d-flex justify-content-center text-center">
                  <Form.Text className="text-danger">{error}</Form.Text>
                </div>
              </Form>
            </div>
          )}

          <div>
            {showPayment && (
              <Paysofter
                amount={amount}
                currency={currency}
                email={email}
                paysofterPublicKey={paysofterPublicKey}
                onSuccess={onSuccess}
                onClose={onClose}
                paymentRef={`RID${Math.floor(Math.random() * 100000000000000)}`}
                showPromiseOption={true}
                showFundOption={false}
                showCardOption={false}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BuyCps;
