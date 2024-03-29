// UsdCardPayment.js
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyUsdCreditPoint } from "../../../actions/creditPointActions";
import {
  // createPayment,
  createPaysofterPayment,
} from "../../../actions/paymentActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { formatAmount } from "../../FormatAmount";

function UsdCardPayment({
  amount,
  currency,
  paymentData,
  reference,
  userEmail,
  paysofterPublicKey,
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

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const { loading, success, error } = paysofterPayment;

  const buyUsdCreditPointState = useSelector((state) => state.buyUsdCreditPointState);
  const {
    success: buyUsdCreditPointSuccess,
    error: buyUsdCreditPointError,
  } = buyUsdCreditPointState;

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonthYear: null,
    expirationMonth: null,
    expirationYear: null,
    cvv: "",
  });

  const [
    isExpirationMonthYearSelected,
    setIsExpirationMonthYearSelected,
  ] = useState(false);

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;

    // Detect card type based on the card number prefix
    let detectedCardType = "";
    if (/^4/.test(value)) {
      detectedCardType = "Visa";
    } else if (/^5[1-5]/.test(value)) {
      detectedCardType = "Mastercard";
    }
    setCardType(detectedCardType);
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      isExpirationMonthYearSelected &&
      paymentDetails.cardNumber &&
      paymentDetails.cvv
    );
  };

  const createdAt = new Date().toISOString();

  const submitHandler = (e) => {
    e.preventDefault();

    const paysofterPaymentData = {
      payment_id: reference,
      email: userEmail,
      amount: amount,
      currency: currency,
      public_api_key: paysofterPublicKey,
      created_at: createdAt,

      card_number: paymentDetails.cardNumber,
      expiration_month_year: paymentDetails.expirationMonthYear,
      cvv: paymentDetails.cvv,
    };

    dispatch(createPaysofterPayment(paysofterPaymentData));
  };

  const creditPointData = {
    amount: amount,
  };

  useEffect(() => {
    if (success) {
      dispatch(buyUsdCreditPoint(creditPointData));
      const timer = setTimeout(() => {
        // window.location.reload();
        // window.location.href = "/dashboard/users";
      }, 5000);
      return () => clearTimeout(timer);
    }
    // console.log('// eslint-disable-next-line')
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  useEffect(() => {
    if (buyUsdCreditPointSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [buyUsdCreditPointSuccess, history]);

  return (
    <div>
      <h2 className="py-2 text-center">Debit Card</h2>
      {success && (
        <Message variant="success">Payment made successfully.</Message>
      )}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      {buyUsdCreditPointSuccess && (
        <Message variant="success">
          Your account has been credited with the CPS purchased for USD {amount}
          .
        </Message>
      )}

      {buyUsdCreditPointError && (
        <Message variant="danger">{buyUsdCreditPointError}</Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handlePaymentDetailsChange}
            required
            placeholder="1234 5678 9012 3456"
            maxLength="16"
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
        <Form.Group>
          <Form.Label>Expiration Month/Year</Form.Label>
          {/*<Form.Control
            type="text" // You can change this to 'date' for separate month and year fields
            name="expirationMonthYear"
            value={paymentDetails.expirationMonthYear}
            onChange={handlePaymentDetailsChange}
            required
            placeholder="MM/YY"
          /> */}
          <DatePicker
            selected={paymentDetails.expirationMonthYear}
            onChange={(date) => {
              setPaymentDetails({
                ...paymentDetails,
                expirationMonthYear: date,
              });
              setIsExpirationMonthYearSelected(!!date);
            }}
            dateFormat="MM/yy"
            showMonthYearPicker
            isClearable
            placeholderText="Select month/year"
            className="rounded-select"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="password"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handlePaymentDetailsChange}
            required
            maxLength="3"
            placeholder="123"
          />
        </Form.Group>
        <div className="text-center w-100 py-2">
          <Button variant="primary" type="submit" disabled={!isFormValid()}>
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
