// // PaystackUsd.js
import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
// import { buyCreditPoint } from "../../../actions/creditPointActions";
// import Loader from "../../Loader";
// import Message from "../../Message";
import { formatAmount } from "../../FormatAmount";

function PaystackUsd({
  currency,
  amount,
  paystackPublicKey,
  email,
  onSuccess,
  onClose,
}) {
  // const history = useHistory();
  // const dispatch = useDispatch();

  // console.log("amount:", amount);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  // const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  // const { success, error, loading } = buyCreditPointState;

  // useEffect(() => {
  //   if (success) {
  //     const timer = setTimeout(() => {
  //       window.location.reload();
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [success, history]);

  // const creditPointData = {
  //   amount: amount,
  // };

  // const handlePayment = () => {
  //   dispatch(buyCreditPoint(creditPointData));
  // };

  // const onSuccess = () => {
  //   handlePayment();
  // };

  const paymentObject = {
    publicKey: paystackPublicKey,
    email: email,
    // reference: reference,
    amount: amount * 100,
    // currency: "NGN",
    currency: currency,
    onSuccess: onSuccess,
    onClose: onClose,
  };

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-3">Paystack Payment Option</h1>

            {/* {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}

            {success && (
              <Message variant="success">
                You have received {amount} credit points.
              </Message>
            )} */}

            <ListGroup variant="flush" className="text-center py-2">
              <ListGroup.Item>
                Amount:{" "}
                {formatAmount(amount)

                // ?.toLocaleString(undefined, {
                //   minimumFractionDigits: 2,
                //   maximumFractionDigits: 2,
                // })
                }{" "}
                {currency}
              </ListGroup.Item>
            </ListGroup>

            <div className="text-center py-2">
              <Button className="rounded" variant="dark" disabled>
                <PaystackButton {...paymentObject}>
                  Pay Now ({currency})
                </PaystackButton>
              </Button>
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default PaystackUsd;
