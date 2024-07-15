// PaysofterButton.js
import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import CardPayment from "./CardPayment";
import UsdCardPayment from "./UsdCardPayment";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import PaysofterAccountFund from "./PaysofterAccountFund";
import PaysofterUsdAccountFund from "./PaysofterUsdAccountFund";
import QrPayment from "./QrPayment";
import { formatAmount } from "../../FormatAmount";

import "./Paysofter.css";

function PaysofterButton({
  email,
  amount,
  currency,
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

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const handleOnClosePayment = () => {
    console.log("onClose called!");
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <div>
      <div className="text-center">
        <Button
          className="text-center rounded py-2"
          variant="outline-primary"
          onClick={() => setShowPaymentModal(true)}
        >
          <span>Pay Now</span>
        </Button>
      </div>

      <Modal
        show={showPaymentModal}
        // onHide={() => setShowPaymentModal(false)}

        onHide={handleOnClosePayment}
      >
        <Modal.Header closeButton>
          <div className="text-center w-100 py-2">
            <Modal.Title>Paysofter (Mock Payment)</Modal.Title>
            <div>{email}</div>
            <div>
              {formatAmount(amount)} {currency}
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {/* Left column with payment options */}
            <Col md={3}>
              <div className="text-center">
                <p>Options</p>

                {/* <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("card")}
                    className={selectedPaymentOption === "card" ? "active" : ""}
                  >
                    <i className="fas fa-credit-card"></i> Debit Card
                  </Button>{" "}
                </div> */}

                {currency === "USD" && (
                  <div className="py-1">
                    <Button
                      variant="outline-primary"
                      onClick={() => handlePaymentOptionChange("card")}
                      className={
                        selectedPaymentOption === "card" ? "active" : ""
                      }
                    >
                      <i className="fas fa-credit-card"></i> Debit Card (USD)
                    </Button>{" "}
                  </div>
                )}

                {currency === "NGN" && (
                  <div className="py-1">
                    <Button
                      variant="outline-primary"
                      onClick={() => handlePaymentOptionChange("card")}
                      className={
                        selectedPaymentOption === "card" ? "active" : ""
                      }
                    >
                      <i className="fas fa-credit-card"></i> Debit Card (NGN)
                    </Button>{" "}
                  </div>
                )}

                {currency === "NGN" && (
                  <div className="py-1">
                    <Button
                      variant="outline-primary"
                      onClick={() => handlePaymentOptionChange("account-fund")}
                      className={
                        selectedPaymentOption === "account-fund" ? "active" : ""
                      }
                    >
                      <i className="fas fa-money-bill-alt"></i> Paysofter
                      Account Fund (NGN)
                    </Button>
                  </div>
                )}

                {currency === "USD" && (
                  <div className="py-1">
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        handlePaymentOptionChange("usd-account-fund")
                      }
                      className={
                        selectedPaymentOption === "usd-account-fund"
                          ? "active"
                          : ""
                      }
                    >
                      <i className="fas fa-money-bill-alt"></i> Paysofter
                      Account Fund (USD)
                    </Button>
                  </div>
                )}

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("promise")}
                    className={
                      selectedPaymentOption === "promise" ? "active" : ""
                    }
                    disabled
                  >
                    <i className="fas fa-money-bill-wave"></i> Paysofter Promise
                  </Button>
                </div>

                <div className="text-center py-2">
                  <Button
                    variant="outline-primary"
                    onClick={handleMoreOptions}
                    className="rounded"
                    disabled
                  >
                    <i className="fas fa-bars"></i> More Options
                  </Button>
                </div>

                {/* <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("transfer")}
                    className={
                      selectedPaymentOption === "transfer" ? "active" : ""
                    }
                  >
                    <i className="fa fa-exchange"></i> Transfer
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("bank")}
                    className={selectedPaymentOption === "bank" ? "active" : ""}
                  >
                    <i className="fas fa-bank"></i> Bank
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("ussd")}
                    className={selectedPaymentOption === "ussd" ? "active" : ""}
                  >
                    <i className="fa fa-mobile"></i> USSD
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("qr")}
                    className={selectedPaymentOption === "qr" ? "active" : ""}
                  >
                    <i className="fa fa-qrcode"></i> Visa QR
                  </Button>{" "}
                </div> */}

                {showMoreOptions && (
                  <>
                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("transfer")}
                        className={
                          selectedPaymentOption === "transfer" ? "active" : ""
                        }
                      >
                        <i className="fa fa-exchange"></i> Transfer
                      </Button>
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("bank")}
                        className={
                          selectedPaymentOption === "bank" ? "active" : ""
                        }
                      >
                        <i className="fas fa-bank"></i> Bank
                      </Button>
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("ussd")}
                        className={
                          selectedPaymentOption === "ussd" ? "active" : ""
                        }
                      >
                        <i className="fa fa-mobile"></i> USSD
                      </Button>{" "}
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("qr")}
                        className={
                          selectedPaymentOption === "qr" ? "active" : ""
                        }
                      >
                        <i className="fa fa-qrcode"></i> Visa QR
                      </Button>{" "}
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col md={9}>
              {currency === "NGN" && (
                <div>
                  {selectedPaymentOption === "card" && (
                    <CardPayment
                      amount={amount}
                      currency={currency}
                      email={email}
                      paysofterPublicKey={paysofterPublicKey}
                      onSuccess={onSuccess}
                      onClose={handleOnClosePayment}
                    />
                  )}
                </div>
              )}

              {currency === "USD" && (
                <div>
                  {selectedPaymentOption === "card" && (
                    <UsdCardPayment
                      amount={amount}
                      currency={currency}
                      email={email}
                      paysofterPublicKey={paysofterPublicKey}
                      onSuccess={onSuccess}
                      onClose={handleOnClosePayment}
                    />
                  )}
                </div>
              )}

              {selectedPaymentOption === "account-fund" && (
                <PaysofterAccountFund
                  currency={currency}
                  amount={amount}
                  email={email}
                  paysofterPublicKey={paysofterPublicKey}
                  onSuccess={onSuccess}
                  onClose={handleOnClosePayment}
                />
              )}

              {selectedPaymentOption === "usd-account-fund" && (
                <PaysofterUsdAccountFund
                  currency={currency}
                  amount={amount}
                  email={email}
                  paysofterPublicKey={paysofterPublicKey}
                  onSuccess={onSuccess}
                  onClose={handleOnClosePayment}
                />
              )}

              {/* 
              {selectedPaymentOption === "promise" && (
                <PaysofterPromise
                  amount={amount}
                  email={email}
                  paysofterPublicKey={paysofterPublicKey}
                  
                  paymentData={paymentData}
                />
              )} */}

              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PaysofterButton;
