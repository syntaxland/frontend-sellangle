// UsdCardPayment.js
import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaysofterPayment,
  resetCreatePaysofterPaymentState,
} from "../../../actions/paymentActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { formatAmount } from "../../FormatAmount";
import Select from "react-select";
import { MONTH_CHOICES, YEAR_CHOICES } from "./payment-constants";

function UsdCardPayment({
  amount,
  currency,
  email,
  paysofterPublicKey,
  onSuccess,
  onClose,
}) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const { loading, success, error } = paysofterPayment;

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasHandledSuccess, setHasHandledSuccess] = useState(false);

  const [monthChoices, setMonthChoices] = useState([]);
  const [yearChoices, setYearChoices] = useState([]);

  useEffect(() => {
    setMonthChoices(MONTH_CHOICES);
    setYearChoices(YEAR_CHOICES);
  }, []);

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonthYear: null,
    expirationMonth: null,
    expirationYear: null,
    cvv: "",
  });

  // const handlePaymentDetailsChange = (name, value) => {
  //   // Detect card type based on the card number prefix
  //   if (name === "cardNumber") {
  //     let detectedCardType = "";
  //     if (/^4/.test(value)) {
  //       detectedCardType = "Visa";
  //     } else if (/^5[1-5]/.test(value)) {
  //       detectedCardType = "Mastercard";
  //     }
  //     setCardType(detectedCardType);
  //   }

  //   setPaymentDetails({ ...paymentDetails, [name]: value });
  // };

  const formatCard = (value) => {
    return value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handlePaymentDetailsChange = (name, value) => {
    if (name === "cardNumber") {
      value = formatCard(value);
      let detectedCardType = "";
      if (/^4/.test(value)) {
        detectedCardType = "Visa";
      } else if (/^5[1-5]/.test(value)) {
        detectedCardType = "Mastercard";
      }
      setCardType(detectedCardType);
    }

    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      paymentDetails.cardNumber &&
      paymentDetails.expirationMonth &&
      paymentDetails.expirationYear &&
      paymentDetails.cvv
    );
  };

  const createdAt = new Date().toISOString();

  const submitHandler = (e) => {
    e.preventDefault();

    const paysofterPaymentData = {
      email: email,
      currency: currency,
      amount: amount,
      public_api_key: paysofterPublicKey,
      created_at: createdAt,

      card_number: paymentDetails.cardNumber,
      expiration_month: paymentDetails.expirationMonth,
      expiration_year: paymentDetails.expirationYear,
      cvv: paymentDetails.cvv,
    };

    dispatch(createPaysofterPayment(paysofterPaymentData));
  };

  const handleOnSuccess = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (success && !hasHandledSuccess) {
      setShowSuccessMessage(true);
      setHasHandledSuccess(true);
      handleOnSuccess();
      console.log("onSuccess dispatched2");
      setTimeout(() => {
        handleOnClose();
        setShowSuccessMessage(false);
        dispatch(resetCreatePaysofterPaymentState());
      }, 3000);
    }
  }, [dispatch, success, hasHandledSuccess, handleOnSuccess, handleOnClose]);

  return (
    <div>
      <h2 className="py-2 text-center">Debit Card</h2>
      {showSuccessMessage && (
        <Message variant="success">Payment made successfully.</Message>
      )}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              handlePaymentDetailsChange("cardNumber", e.target.value)
            }
            required
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
        </Form.Group>
        {cardType && (
          <p>
            Detected Card Type: {cardType}
            {cardType === "Visa " && <i className="fab fa-cc-visa"></i>}
            {cardType === "Mastercard " && (
              <i className="fab fa-cc-mastercard"></i>
            )}
          </p>
        )}
        <i className="fab fa-cc-mastercard"></i>{" "}
        <i className="fab fa-cc-visa"></i>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Expiration Month</Form.Label>
              <Select
                options={monthChoices?.map(([value, label]) => ({
                  value,
                  label,
                }))}
                onChange={(selectedOption) =>
                  handlePaymentDetailsChange(
                    "expirationMonth",
                    selectedOption.value
                  )
                }
                value={{
                  value: paymentDetails.expirationMonth,
                  label: paymentDetails.expirationMonth,
                }}
                placeholder="Select Month"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Expiration Year</Form.Label>
              <Select
                options={yearChoices?.map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={{
                  value: paymentDetails.expirationYear,
                  label: paymentDetails.expirationYear,
                }}
                onChange={(selectedOption) =>
                  handlePaymentDetailsChange(
                    "expirationYear",
                    selectedOption.value
                  )
                }
                placeholder="Select Year"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="password"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={(e) => handlePaymentDetailsChange("cvv", e.target.value)}
            required
            maxLength="3"
            placeholder="123"
          />
        </Form.Group>
        <div className="text-center w-100 py-2">
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid() || loading}
          >
            Pay{" "}
            <span>
              ({formatAmount(amount)} {currency})
            </span>
          </Button>
        </div>
        <div className="py-2 d-flex justify-content-center">
          <Form.Text className="text-danger">{error}</Form.Text>
        </div>
      </Form>
    </div>
  );
}

export default UsdCardPayment;
