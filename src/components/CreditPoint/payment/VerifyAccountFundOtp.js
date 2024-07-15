// VerifyAccountFundOtp.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaysofterPayment,
  resetCreatePaysofterPaymentState,
  debitPaysofterAccountFund,
  resetDebitPaysofterNgnState,
  verifyOtp,
  resetVerifyOtpState,
} from "../../../actions/paymentActions";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../../Loader";
import Message from "../../Message";

const VerifyAccountFundOtp = ({
  amount,
  reference,
  email,
  currency,
  paysofterPublicKey,
  formattedPayerEmail,
  onSuccess,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const createdAt = new Date().toISOString();
  const [hasHandledSuccess, setHasHandledSuccess] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const otpVerifyState = useSelector((state) => state.otpVerifyState);
  const { loading, success, error } = otpVerifyState;

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const {
    success: paysofterPaymentSuccess,
    error: paysofterPaymentError,
    loading: paysofterPaymentLoading,
  } = paysofterPayment;

  console.log("formattedPayerEmail:", formattedPayerEmail);

  const sendOtpData =
    JSON.parse(localStorage.getItem("debitAccountData")) || [];
  console.log("sendOtpData:", sendOtpData, sendOtpData.account_id);

  const paysofterPaymentData = {
    payment_id: reference,
    email: email,
    amount: amount,
    public_api_key: paysofterPublicKey,
    created_at: createdAt,
  };

  const otpData = {
    otp: otp,
    account_id: sendOtpData.account_id,
    amount: amount,
    currency: currency,
  };

  const debitAccountData = {
    account_id: sendOtpData.account_id,
    security_code: sendOtpData.security_code,
    amount: amount,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyOtp(otpData));
  };

  const handleResendEmailOtp = () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      dispatch(debitPaysofterAccountFund(JSON.stringify(debitAccountData)));
      setResendMessage(`OTP resent to ${formattedPayerEmail} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  useEffect(() => {
    if (success) {
      dispatch(createPaysofterPayment(paysofterPaymentData));
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const handleOnSuccess = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (paysofterPaymentSuccess && !hasHandledSuccess) {
      setHasHandledSuccess(true);
      setShowSuccessMessage(true);
      handleOnSuccess();
      console.log("onSuccess dispatched2");
      localStorage.removeItem("debitAccountData");
      dispatch(resetCreatePaysofterPaymentState());
      dispatch(resetDebitPaysofterNgnState());
      dispatch(resetVerifyOtpState());
      setTimeout(() => {
        handleOnClose();
        setShowSuccessMessage(false);
      }, 3000);
    }
  }, [
    dispatch,
    paysofterPaymentSuccess,
    handleOnSuccess,
    hasHandledSuccess,
    handleOnClose,
  ]);

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        <Col>
          <div className="border rounded p-4 py-2">
            <h1 className="py-2">Verify OTP ({currency})</h1>
            {showSuccessMessage && (
              <Message variant="success">Payment made successfully!</Message>
            )}
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            {paysofterPaymentLoading && <Loader />}
            {paysofterPaymentError && (
              <Message variant="danger">{error}</Message>
            )}

            {resendMessage && (
              <Message variant={resendLoading ? "info" : "success"}>
                {resendMessage}
              </Message>
            )}

            {/* {buyCreditPointSuccess && (
              <Message variant="success">
                Your account has been credited with the credit points purchased
                for {amount} {currency}.
              </Message>
            )}

            {buyCreditPointError && (
              <Message variant="danger">{buyCreditPointError}</Message>
            )} */}

            <Form className="py-2">
              <Form.Group controlId="otp">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </Form.Group>
              <div className="py-3">
                <Button
                  onClick={handleVerifyEmailOtp}
                  disabled={otp === "" || loading || success}
                  variant="success"
                  type="submit"
                  className="rounded"
                >
                  Verify OTP
                </Button>
              </div>
            </Form>
            <p>
              OTP has been sent to email: {formattedPayerEmail} for Paysofter
              Account ID: {sendOtpData.account_id} and expires in 10 minutes. It
              might take a few seconds to deliver.
            </p>
            <Button
              variant="link"
              type="submit"
              disabled={resendDisabled || resendLoading}
              onClick={handleResendEmailOtp}
            >
              {resendLoading
                ? "Resending OTP..."
                : resendDisabled
                ? `Resend OTP (${countdown}sec)`
                : "Resend OTP"}
            </Button>
          </div>

          <div className="py-2 d-flex justify-content-center">
            <Form.Text className="text-danger">{error}</Form.Text>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyAccountFundOtp;
