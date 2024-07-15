// PaysofterPromise.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import PaysofterAccountFundPromise from "./PaysofterAccountFundPromise";
import PaysofterUsdAccountFundPromise from "./PaysofterUsdAccountFundPromise";
import Select from "react-select";

const PaysofterPromise = ({
  history,
  email,
  currency,
  amount,
  paysofterPublicKey,
  onSuccess,
  onClose,
}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const debitPaysofterAccountState = useSelector(
    (state) => state.debitPaysofterAccountState
  );
  const { loading, success, error } = debitPaysofterAccountState;

  const [duration, setDuration] = useState("Within 1 day");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [
    showPaysofterAccountFundPromise,
    setShowPaysofterAccountFundPromise,
  ] = useState(false);

  const handleShowPaysofterAccountFundPromise = () => {
    setShowPaysofterAccountFundPromise(true);
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (success) {
      // dispatch(createPaysofterPayment(paysofterPaymentData));
      // dispatch(createPayment(paymentData));
      // dispatch(clearCart());
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        // window.location.href = "/dashboard";
        // window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
    // console.log("// eslint-disable-next-line");
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  return (
    <Container>
      {showPaysofterAccountFundPromise ? (
        <>
          {currency === "USD" ? (
            <>
              <PaysofterUsdAccountFundPromise
                currency={currency}
                amount={amount}
                email={email}
                duration={duration}
                paysofterPublicKey={paysofterPublicKey}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </>
          ) : (
            <>
              <PaysofterAccountFundPromise
                currency={currency}
                amount={amount}
                email={email}
                duration={duration}
                paysofterPublicKey={paysofterPublicKey}
                onSuccess={onSuccess}
                onClose={onClose}
              />
            </>
          )}

          {/* {currency === "USD" && (
            <PaysofterUsdAccountFundPromise
              currency={currency}
              amount={amount}
              email={email}
              paysofterPublicKey={paysofterPublicKey}
              paymentData={paymentData}
              reference={reference}
              duration={duration}
            />
          )} */}

          {/* {currency === "NGN" && (
            <PaysofterAccountFundPromise 
              currency={currency}
              amount={amount}
              email={email}
              paysofterPublicKey={paysofterPublicKey}
              paymentData={paymentData}
              reference={reference}
              duration={duration}
            />
          )} */}

          {/* {currency !== "USD" && currency !== "NGN" && (
            <div className="text-center py-2 mt-2">
              <h3 className="py-2">
                <i
                  className="fa fa-info-circle"
                  style={{ fontSize: "16px" }}
                ></i>{" "}
                Noticification
              </h3>
              <p>
                Paysofter currently supports transactions in USD and NGN. Kindly
                contact the seller to add the USD (or NGN) main price for
                Paysofter Promise checkout.
              </p>
              <p>Thank you.</p>
            </div>
          )} */}
        </>
      ) : (
        <Row className="justify-content-center">
          <Col>
            <Row className="text-center py-2">
              <Col md={10}>
                <h2 className="py-2 text-center">Paysofter Promise</h2>
              </Col>
              <Col md={2}>
                <Button
                  variant="outline"
                  onClick={handleInfoModalShow}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Paysofter Promise option escrows or places in custody the received payment until a specified condition has been fulfilled before payment is transferred to the seller."
                >
                  <i className="fa fa-info-circle"> </i>
                </Button>

                <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100 py-2">
                      Paysofter Promise
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-center">
                      Paysofter Promise option escrows or places in custody the
                      payment made to a seller (using the payer's funded
                      Paysofter Account Fund) until a specified condition has
                      been fulfilled.{" "}
                      <a
                        href="https://paysofter.com/promise/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <span>
                          <Button
                            variant="primary"
                            size="sm"
                            className="text-center py-2"
                          >
                            Learn more
                          </Button>
                        </span>
                      </a>
                    </p>
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            {success && (
              <Message variant="success">Payment made successfully.</Message>
            )}

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
              {/* <Form.Group controlId="currency">
                  <Form.Label>Currency</Form.Label>
                  <Form.Control as="select" value={currency} readOnly>
                    <option>{currency}</option>
                  </Form.Control>
                </Form.Group> */}

              <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Select
                  value={{ value: currency, label: currency }}
                  isDisabled
                />
              </Form.Group>

              <Form.Group controlId="duration">
                <Form.Label>Expected Settlement Duration</Form.Label>
                <Form.Control
                  as="select"
                  readOnly
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="Within 1 day">Within 1 day</option>
                  <option value="2 days">Less than 2 days</option>
                  <option value="3 days">Less than 3 days</option>
                  <option value="5 days">Less than 5 days</option>
                  <option value="1 week">Less than 1 week</option>
                  <option value="2 weeks">Less than 2 weeks</option>
                  <option value="1 month">Less than 1 month</option>
                </Form.Control>
              </Form.Group>

              <div className="py-3 text-center">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                  onClick={handleShowPaysofterAccountFundPromise}
                >
                  Submit{" "}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PaysofterPromise;
