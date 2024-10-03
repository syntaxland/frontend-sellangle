// BuyCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getPaymentApiKeys } from "../../actions/paymentActions";
// import {
//   buyCreditPoint,
//   resetbuyCreditPointState,
// } from "../../actions/creditPointActions";
// import Message from "../Message";
import Loader from "../Loader";
import PaymentScreen from "./PaymentScreen";
import SelectCurrency from "./SelectCurrency";
 
function BuyCreditPoint() {
  const dispatch = useDispatch();

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const {
    loading: publicKeyLoading,
    paystackPublicKey,
    paysofterPublicKey,
  } = getPaymentApiKeysState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userEmail = userInfo.email;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      dispatch(getPaymentApiKeys());
    }
  }, [userInfo, dispatch]);

  // const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  // const {
  //   loading: buyCreditPointLoading,
  //   success: buyCreditPointSuccess,
  //   error: buyCreditPointError,
  // } = buyCreditPointState;

  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  // const [cpsAmount, setCpsAmount] = useState("");
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const NGN_CPS_CHOICES = [
    ["1000", "1,000 cps for 1,000 NGN"],
    ["5000", "5,200 cps for 5,000 NGN"],
    ["10000", "10,800 cps for 10,000 NGN"],
    ["15000", "16,500 cps for 15,000 NGN"],
    ["20000", "24,000 cps for 20,000 NGN"],
    ["50000", "60,000 cps for 50,000 NGN"],
    ["100000", "125,000 cps for 100,000 NGN"],
    ["200000", "255,000 cps for 200,000 NGN"],
    ["500000", "700,000 cps for 500,000 NGN"],
    ["1000000", "1,500,000 cps for 1,000,000 NGN"],
  ];

  const USD_CPS_CHOICES = [
    ["1", "1,000 cps for 1 USD"],
    ["5", "5,200 cps for 5 USD"],
    ["10", "10,800 cps for 10 USD"],
    ["15", "16,500 cps for 15 USD"],
    ["20", "24,000 cps for 20 USD"],
    ["50", "60,000 cps for 50 USD"],
    ["100", "125,000 cps for 100 USD"],
    ["200", "255,000 cps for 200 USD"],
    ["500", "700,000 cps for 500 USD"],
    ["1000", "1,500,000 cps for 1,000 USD"],
  ];

  // const handleOnSuccess = () => {
  //   const creditPointData = {
  //     amount: amount,
  //     currency: currency,
  //   };

  //   dispatch(buyCreditPoint(creditPointData));
  // };

  // const [successTriggered, setSuccessTriggered] = useState(false);
  // const onSuccess = () => {
  //   if (!successTriggered) {
  //     handleOnSuccess();
  //     setSuccessTriggered(true);
  //   }
  // };

  // const handleOnClose = () => {
  //   console.log("handling onClose...");
  //   window.location.reload();
  //   // window.location.href = "/";
  // };

  // const onClose = () => {
  //   handleOnClose();
  // };

  // useEffect(() => {
  //   if (buyCreditPointSuccess) {
  //     setShowSuccessMessage(true);
  //     const timer = setTimeout(() => {
  //       setShowSuccessMessage(false);
  //       dispatch(resetbuyCreditPointState());
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [dispatch, buyCreditPointSuccess]);

  useEffect(() => {
    setAmount("");
    setShowPaymentScreen(false);
  }, [currency]);

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  console.log("cps, amt:", amount, currency);

  return (
    <Container>
      {/* {showSuccessMessage && (
        <Message variant="success" fixed>
          Your account has been credited with the
        
          CPS purchased for {amount} {currency}.
        </Message>
      )} 
      {buyCreditPointLoading && <Loader />}
      {buyCreditPointError && (
        <Message variant="danger" fixed>
          {buyCreditPointError}
        </Message>
      )} */}

      {publicKeyLoading && <Loader />}

      {showPaymentScreen ? (
        <PaymentScreen
          currency={currency}
          amount={amount}
          paysofterPublicKey={paysofterPublicKey}
          paystackPublicKey={paystackPublicKey}
          email={userEmail}
          // onSuccess={onSuccess}
          // onClose={onClose}
        />
      ) : (
        <Row className="d-flex justify-content-center py-2">
          <Col md={8}>
            <div className="d-flex justify-content-center">
              <SelectCurrency
                selectedCurrency={currency}
                onCurrencyChange={handleCurrencyChange}
              />
            </div>
            <Form>
              {currency === "NGN" && (
                <div>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="rounded py-2 mb-2"
                      required
                    >
                      <option value="">Select CPS Amount</option>
                      {NGN_CPS_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              )}

              {currency === "USD" && (
                <div>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="rounded py-2 mb-2"
                      required
                    >
                      <option value="">Select CPS Amount</option>
                      {USD_CPS_CHOICES.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              )}
            </Form>

            <div className="py-2">
              <Button
                variant="primary"
                onClick={() => setShowPaymentScreen(true)}
                className="rounded mt-2 text-center w-100"
                disabled={amount === ""}
              >
                Buy CPS ({amount} {currency})
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BuyCreditPoint;
