// // ShipmentScreen.js
// import React, { useState, useEffect, useMemo } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// // import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { saveShipment } from "../../actions/orderActions";
// import Message from "../Message";
// import Loader from "../Loader";

// const ShipmentScreen = ({ history, match }) => {
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (!userInfo) {
//       window.location.href = "/login";
//     }
//   }, [userInfo]);

//   const { loading, success, error } = useSelector(
//     (state) => state.shipmentSave
//   );

//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [country, setCountry] = useState("");

//   const order_id = match.params.id;

//   //   const location = useLocation();
//   //   const { pathname } = location;
//   //   const order_id = pathname.split("/shipment/")[1];

//   // let shipmentData = {
//   //   address,
//   //   city,
//   //   postalCode,
//   //   country,
//   //   order_id,
//   // };

//   const shipmentData = useMemo(() => {
//     return {
//       address,
//       city,
//       postalCode,
//       country,
//       order_id,
//     };
//   }, [address, city, postalCode, country, order_id]);

//   console.log("shipmentData:", shipmentData);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     try {
//       dispatch(saveShipment(shipmentData));
//     } catch (error) {
//       console.log("Error saving shipment:", error);
//     }
//   };

//   useEffect(() => {
//     if (success) {
//       localStorage.setItem("shipmentData", JSON.stringify(shipmentData));
//       const timer = setTimeout(() => {
//         history.push(`/payment/${order_id}`);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [dispatch, success, history, order_id, shipmentData]);

//   return (
//     <Row>
//       <div className="d-flex justify-content-center">
//         <Col md={6}>
//           <h1 className="text-center py-2">Shipping Address</h1>
//           {error && <Message variant="danger">{error}</Message>}
//           {loading && <Loader />}
//           {success && (
//             <Message variant="success">Shipment created successfully!</Message>
//           )}
//           <Form onSubmit={submitHandler}>
//             <Form.Group controlId="address">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="city">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="postalCode">
//               <Form.Label>Postal Code</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter postal code"
//                 value={postalCode}
//                 onChange={(e) => setPostalCode(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="country">
//               <Form.Label>Country</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter country"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <div className="text-center py-2">
//               <Button
//                 type="submit"
//                 className="w-100 rounded"
//                 variant="success"
//                 disabled={
//                   address === "" ||
//                   city === "" ||
//                   postalCode === "" ||
//                   country === "" ||
//                   loading ||
//                   success
//                 }
//               >
//                 Proceed to Payment
//               </Button>
//             </div>
//           </Form>
//         </Col>
//       </div>
//     </Row>
//   );
// };

// export default ShipmentScreen;
