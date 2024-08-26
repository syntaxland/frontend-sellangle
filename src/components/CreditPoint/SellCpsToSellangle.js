// SellCpsToSellangle.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { getPaymentApiKeys } from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import MessageFixed from "../MessageFixed";
// import { formatAmount } from "../FormatAmount";
import SelectCurrency from "./SelectCurrency";
import VerifyPaysofterSellerId from "./VerifyPaysofterSellerId";
import { PAYSOFTER_API_URL } from "../../config/apiConfig";
import axios from "axios";

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

function SellCpsToSellangle() {
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

  const [username, setUsername] = useState("sellangle");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [paysofterSellerId, setPaysofterSellerId] = useState("");
  const [paysofterAccountId, setPaysofterAccountId] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showVerifyPaysofterSellerId, setShowVerifyPaysofterSellerId] =
    useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const sellerData = {
      seller_id: paysofterSellerId,
    };

    try {
      const { data } = await axios.post(
        `${PAYSOFTER_API_URL}/api/get-paysofter-account-id/`,
        sellerData
      );
      console.log("data:", data);
      setPaysofterAccountId(data?.formatted_account_id);
      setSuccess(true);
    } catch (error) {
      setError(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const lowerCaseUsername = username.toLowerCase().trim();
  const upperCasePaysofterSellerId = paysofterSellerId.toUpperCase().trim();

  useEffect(() => {
    setAmount("");
    setShowVerifyPaysofterSellerId(false);
  }, [currency]);

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  const [showPaysofterSellerIdModal, setShowPaysofterSellerIdModal] =
    useState(false);
  const handlePaysofterSellerIdModalShow = () => {
    setShowPaysofterSellerIdModal(true);
  };
  const handlePaysofterSellerIdModalClose = () => {
    setShowPaysofterSellerIdModal(false);
  };

  const [showCheckoutLinkModal, setShowCheckoutLinkModal] = useState(false);
  const handleCheckoutLinkModalShow = () => {
    setShowCheckoutLinkModal(true);
  };
  const handleCheckoutLinkModalClose = () => {
    setShowCheckoutLinkModal(false);
  };

  const handlePaysofter = () => {
    // window.location.href = "https://paysofter.com/register";
    window.open("https://paysofter.com/", "_blank");
  };

  const handleCheckoutLink = () => {
    // window.open("https://paysofter.com/", "_blank");
    history.push("/ad/paid");
  };

  console.log(
    "cps, amt, key, seller_id, acc_id:",
    amount,
    currency,
    upperCasePaysofterSellerId,
    paysofterAccountId
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowVerifyPaysofterSellerId(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Container>
      <>
        {showVerifyPaysofterSellerId ? (
          <VerifyPaysofterSellerId
            paysofterSellerId={upperCasePaysofterSellerId}
            paysofterAccountId={paysofterAccountId}
            username={lowerCaseUsername}
            amount={amount}
            currency={currency}
            link={link}
          />
        ) : (
          <Row className="justify-content-center py-2">
            <Col md={10}>
              <div>
                <div className="d-flex justify-content-center">
                  <SelectCurrency
                    selectedCurrency={currency}
                    onCurrencyChange={handleCurrencyChange}
                  />
                </div>
                {loading && <Loader />}
                {success && (
                  <Message variant="success">
                    Request sent successfully.
                  </Message>
                )}
                {error && <Message variant="danger">{error}</Message>}

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

                  {currency === "NGN" && (
                    <div>
                      <Form.Group className="py-1">
                        <Form.Label>Amount (CPS)</Form.Label>
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
                      <Form.Group className="py-1">
                        <Form.Label>Amount (CPS)</Form.Label>
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

                  <Form.Group>
                    <Row className="py-1">
                      <Col md={10}>
                        <Form.Label>CPS Checkout Link</Form.Label>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline"
                          onClick={handleCheckoutLinkModalShow}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="CPS Checkout Link format: 'https://sellangle.com/promoted-ad-detail/xxxx'."
                        >
                          <i className="fa fa-info-circle"> </i>
                        </Button>

                        <Modal
                          show={showCheckoutLinkModal}
                          onHide={handleCheckoutLinkModalClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              CPS Checkout Link Info
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p className="text-center">
                              This is the seller's promoted ad checkout link for
                              the cps being sold to Sellangle. This will be used
                              by Sellangle to process the payment of the chosen
                              CPS amount via Paysofter Promise. The checkout
                              link will look like:{" "}
                              <b>
                                "https://sellangle.com/promoted-ad-detail/xxxx"
                              </b>
                              . For instance, to sell 1,000 USD worth of CPS to
                              Sellangle, you will need to post it as a promoted
                              ad at Sellangle with the price of the CPS as 1,000
                              USD.
                              <span className="text-center py-2">
                                <Button
                                  className="rounded"
                                  type="button"
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={handleCheckoutLink}
                                >
                                  Create CPS promoted ad link?
                                </Button>
                              </span>
                              Alternatively, you can use Paysofter Link usually
                              in this format:{" "}
                              <b>
                                "https://paysofter.com/link?ref=user&pk=xxxx"
                              </b>
                              . Learn more? See{" "}
                              <a
                                href="https://paysofter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {" "}
                                <span>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="text-center py-2"
                                  >
                                    Paysofter Link
                                  </Button>
                                </span>
                              </a>
                            </p>
                          </Modal.Body>
                        </Modal>
                      </Col>
                    </Row>
                    <Form.Control
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Enter Checkout Link"
                      className="rounded"
                      required
                      maxLength={225}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Row className="py-1">
                      <Col md={10}>
                        <Form.Label>Paysofter Seller ID</Form.Label>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline"
                          onClick={handlePaysofterSellerIdModalShow}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Paysofter Seller ID is a 10-digit alphanumeric with format SIDxxxxxxx"
                        >
                          <i className="fa fa-info-circle"> </i>
                        </Button>

                        <Modal
                          show={showPaysofterSellerIdModal}
                          onHide={handlePaysofterSellerIdModalClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              Paysofter Seller ID Info
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p className="text-center">
                              Paysofter Seller ID is a 10-digit alphanumeric
                              with format SIDxxxxxxx issued to verified
                              Paysofter sellers. Don't have Paysofter account?
                              <span className="text-center py-2">
                                <Button
                                  className="rounded"
                                  type="button"
                                  size="sm"
                                  variant="primary"
                                  onClick={handlePaysofter}
                                >
                                  Sign up
                                </Button>
                              </span>
                            </p>
                          </Modal.Body>
                        </Modal>
                      </Col>
                    </Row>
                    <Form.Control
                      type="text"
                      value={paysofterSellerId}
                      onChange={(e) => setPaysofterSellerId(e.target.value)}
                      placeholder="Enter Paysofter Seller ID"
                      className="rounded"
                      required
                      maxLength={10}
                    />
                  </Form.Group>

                  <div className="py-4 mt-2">
                    <Button
                      variant="success"
                      onClick={submitHandler}
                      className="rounded text-center w-100"
                      disabled={
                        paysofterSellerId === "" ||
                        username === "" ||
                        link === "" ||
                        currency === "" ||
                        amount === ""
                      }
                    >
                      Sell CPS
                    </Button>
                  </div>
                  <div className="py-2 d-flex justify-content-center text-center">
                    {error && (
                      <MessageFixed variant="danger">{error}</MessageFixed>
                    )}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        )}
      </>
    </Container>
  );
}

export default SellCpsToSellangle;
