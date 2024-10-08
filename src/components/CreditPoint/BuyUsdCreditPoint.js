// // BuyUsdCreditPoint.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { getPaymentApiKeys } from "../../actions/paymentActions";
// import {
//   buyUsdCreditPoint,
//   resetbuyUsdCreditPointState,
// } from "../../actions/creditPointActions";
// import Message from "../Message";
// import Loader from "../Loader";
// import PaymentScreen from "./PaymentScreen";

// function BuyUsdCreditPoint({ currency }) {
//   const dispatch = useDispatch();

//   const getPaymentApiKeysState = useSelector(
//     (state) => state.getPaymentApiKeysState
//   );
//   const { paystackPublicKey, paysofterPublicKey } = getPaymentApiKeysState;
//   console.log(
//     "paystackPublicKey",
//     paystackPublicKey,
//     "paysofterPublicKey",
//     paysofterPublicKey
//   );

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   const userEmail = userInfo.email;

//   useEffect(() => {
//     if (!userInfo) {
//       window.location.href = "/login";
//     } else {
//       dispatch(getPaymentApiKeys());
//     }
//   }, [userInfo, dispatch]);

//   const buyUsdCreditPointState = useSelector(
//     (state) => state.buyUsdCreditPointState
//   );
//   const {
//     loading: buyCreditPointLoading,
//     success: buyCreditPointSuccess,
//     error: buyCreditPointError,
//   } = buyUsdCreditPointState;

//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [showPaymentScreen, setShowPaymentScreen] = useState(false);

//   const handleShowPaymentScreen = () => {
//     setShowPaymentScreen(true);
//   };

//   // const USD_CPS_CHOICES = [
//   //   ["1000", "1,000 cps for 1 USD"],
//   //   ["5200", "5,200 cps for 5 USD"],
//   //   ["10800", "10,800 cps for 10 USD"],
//   //   ["16500", "16,500 cps for 15 USD"],
//   //   ["24000", "24,000 cps for 20 USD"],
//   //   ["60000", "60,000 cps for 50 USD"],
//   //   ["125000", "125,000 cps for 100 USD"],
//   //   ["2250000", "255,000 cps for 200 USD"],
//   //   ["700000", "700,000 cps for 500 USD"],
//   //   ["1500000", "1,500,000 cps for 1,000 USD"],
//   // ];

//   const USD_CPS_CHOICES = [
//     ["1", "1,000 cps for 1 USD"],
//     ["5", "5,200 cps for 5 USD"],
//     ["10", "10,800 cps for 10 USD"],
//     ["15", "16,500 cps for 15 USD"],
//     ["20", "24,000 cps for 20 USD"],
//     ["50", "60,000 cps for 50 USD"],
//     ["100", "125,000 cps for 100 USD"],
//     ["200", "255,000 cps for 200 USD"],
//     ["500", "700,000 cps for 500 USD"],
//     ["1000", "1,500,000 cps for 1,000 USD"],
//   ];

//   const handleOnSuccess = () => {
//     console.log("handling onSuccess...");
//     const creditPointData = {
//       amount: amount,
//     };
//     dispatch(buyUsdCreditPoint(creditPointData));
//   };

//   const onSuccess = () => {
//     handleOnSuccess();
//   };

//   const handleOnClose = () => {
//     console.log("handling onClose...");
//     window.location.reload();
//     window.location.href = "/";
//   };

//   const onClose = () => {
//     handleOnClose();
//   };

//   useEffect(() => {
//     if (buyCreditPointSuccess) {
//       setShowSuccessMessage(true);
//       const timer = setTimeout(() => {
//         setShowSuccessMessage(false);
//         dispatch(resetbuyUsdCreditPointState());
//         window.location.reload();
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [dispatch, buyCreditPointSuccess]);

//   console.log("amount:", currency, amount);

//   return (
//     <Container>
//       {showSuccessMessage && (
//         <Message variant="success" fixed>
//           Your account has been credited with the CPS purchased for {amount}{" "}
//           {currency}.
//         </Message>
//       )}
//       {buyCreditPointLoading && <Loader />}
//       {buyCreditPointError && (
//         <Message variant="danger" fixed>
//           {buyCreditPointError}
//         </Message>
//       )}
//       {showPaymentScreen ? (
//         <PaymentScreen
//           currency={currency}
//           amount={amount}
//           paysofterPublicKey={paysofterPublicKey}
//           paystackPublicKey={paystackPublicKey}
//           email={userEmail}
//           onSuccess={onSuccess}
//           onClose={onClose}
//         />
//       ) : (
//         <Row className="justify-content-center py-2">
//           <Col>
//             <Form>
//               <Form.Group>
//                 {/* <Form.Label>Amount</Form.Label> */}
//                 <Form.Control
//                   as="select"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className="rounded py-2 mb-2"
//                   required
//                 >
//                   <option value="">Select CPS Amount</option>
//                   {USD_CPS_CHOICES.map((type) => (
//                     <option key={type[0]} value={type[0]}>
//                       {type[1]}
//                     </option>
//                   ))}
//                 </Form.Control>

//                 {/* <Select
//                   value={amount}
//                   onChange={(selectedOption) => setAmount(selectedOption)}
//                   options={USD_CPS_CHOICES.map((type) => ({
//                     value: type[0],
//                     label: type[1],
//                   }))}
//                   placeholder="Select CPS Amount"
//                 /> */}
//               </Form.Group>
//             </Form>

//             <div className="py-2">
//               <Button
//                 variant="primary"
//                 onClick={handleShowPaymentScreen}
//                 className="rounded mt-2 text-center w-100"
//                 disabled={amount === ""}
//               >
//                 Buy Credit Point (USD)
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }

// export default BuyUsdCreditPoint;
