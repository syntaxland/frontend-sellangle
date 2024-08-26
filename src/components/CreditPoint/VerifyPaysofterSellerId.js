// VerifyPaysofterSellerId.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { getPaymentApiKeys } from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import MessageFixed from "../MessageFixed";
// import { formatAmount } from "../FormatAmount";
// import SelectCurrency from "./SelectCurrency";
import ConfirmSellCpsToSellangle from "./ConfirmSellCpsToSellangle";
import { PAYSOFTER_API_URL } from "../../config/apiConfig";
import axios from "axios";

function VerifyPaysofterSellerId({
  paysofterSellerId,
  paysofterAccountId,
  username,
  amount,
  currency,
}) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      dispatch(getPaymentApiKeys());
    }
  }, [userInfo, dispatch]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmSellCpsToSellangle, setShowConfirmSellCpsToSellangle] =
    useState(false);

  const [securityCode, setSecurityCode] = useState("");
  const [showSecurityCodeModal, setShowSecurityCodeModal] = useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);
  const toggleSecurityCodeVisibility = () =>
    setSecurityCodeVisible(!securityCodeVisible);
  const handleSecurityCodeModalShow = () => setShowSecurityCodeModal(true);
  const handleSecurityCodeModalClose = () => setShowSecurityCodeModal(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const sellerData = {
      security_code: securityCode,
    };

    try {
      const { data } = await axios.post(
        `${PAYSOFTER_API_URL}/api/verify-paysofter-seller-id/`,
        sellerData
      );
      console.log("data:", data);
      // setPaysofterAccountId(data?.security_code);
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowConfirmSellCpsToSellangle(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  console.log(
    "cps, amt, key, seller_id, acc_id:",
    amount,
    currency,
    paysofterAccountId
  );

  return (
    <Container>
      <>
        {showConfirmSellCpsToSellangle ? (
          <ConfirmSellCpsToSellangle
            paysofterSellerId={paysofterSellerId}
            paysofterAccountId={paysofterAccountId}
            username={username}
            amount={amount}
            currency={currency}
          />
        ) : (
          <Row className="d-flex justify-content-center py-2">
            <Col md={10}>
              <div>
                {loading && <Loader />}
                {/* {success && (
                  <Message variant="success">
                    Request sent successfully.
                  </Message>
                )} */}
                {error && <Message variant="danger">{error}</Message>}

                <ListGroup className="text-center py-2">
                  <ListGroup.Item>
                    <p className="text-center">
                      Enter Paysofter Account Security Code for Paysofter
                      Account ID ending in:{" "}
                      <strong>"{paysofterAccountId}"</strong> to confirm your
                      Paysofter Seller ID:{" "}
                      <strong>"{paysofterSellerId}"</strong>
                    </p>
                  </ListGroup.Item>
                </ListGroup>
                
                <Form>
                  <Form.Group controlId="securityCode">
                    <Form.Label>Paysofter Security Code</Form.Label>
                    <Row className="text-center py-2">
                      <Col md={10}>
                        <Form.Control
                          type={securityCodeVisible ? "text" : "password"}
                          placeholder="Enter Account Security Code"
                          value={securityCode}
                          onChange={(e) => setSecurityCode(e.target.value)}
                          required
                          maxLength={4}
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline"
                          onClick={handleSecurityCodeModalShow}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="A 4-digit randomly generated Paysofter Account Security Code that expires at a given time (e.g. every minute, hour or day). Having issue applying the security code? Refresh your paysofter account page, logout and login or clear browsing data."
                        >
                          <i className="fa fa-info-circle"> </i>
                        </Button>

                        <Modal
                          show={showSecurityCodeModal}
                          onHide={handleSecurityCodeModalClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title className="text-center w-100 py-2">
                              Paysofter Account Security Code
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p className="text-center">
                              A 4-digit randomly generated Paysofter Account
                              Security Code that expires at a given time (e.g.
                              every hour). Having issue applying the security
                              code? Refresh your paysofter account page, logout
                              and login or clear browsing data.{" "}
                              <a
                                href="https://paysofter.com/"
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
                                    Learn More
                                  </Button>
                                </span>
                              </a>
                            </p>
                          </Modal.Body>
                        </Modal>
                      </Col>
                      <span className="d-flex justify-content-left">
                        <Button
                          variant="outline"
                          className="rounded"
                          size="sm"
                          onClick={toggleSecurityCodeVisibility}
                        >
                          {securityCodeVisible ? (
                            <span>
                              <i className="fa fa-eye-slash"></i> Hide
                            </span>
                          ) : (
                            <span>
                              <i className="fa fa-eye"></i> Show
                            </span>
                          )}
                        </Button>
                      </span>
                    </Row>
                  </Form.Group>

                  <div className="py-2 mt-2">
                    <Button
                      variant="success"
                      onClick={submitHandler}
                      className="rounded text-center w-100"
                      disabled={paysofterSellerId === ""}
                    >
                      Confirm
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

export default VerifyPaysofterSellerId;
