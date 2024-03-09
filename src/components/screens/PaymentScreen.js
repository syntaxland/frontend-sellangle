// PaymentScreen.js
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Paystack from "../payment/Paystack";
import Paysofter from "../payment/Paysofter";
import PaysofterPromise from "../payment/PaysofterPromise"; 

const API_URL = process.env.REACT_APP_API_URL;

function PaymentScreen() {
  const userLogin = useSelector((state) => state.userLogin); 
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  // const history = useHistory();

  // const [publicKey, setPublicKey] = useState("");
  const [paysofterPublicKey, setPaysofterPublicKey] = useState("");
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [reference, setReference] = useState("");
  const userEmail = userInfo.email;
 
  const location = useLocation();
  const { pathname } = location;
  const order_id = pathname.split("/payment/")[1];

  // const paymentCreate = useSelector((state) => state.paymentCreate);
  // const { success } = paymentCreate;

  const applyPomoCodeState = useSelector((state) => state.applyPomoCodeState);
  const { promoDiscount, discountPercentage } = applyPomoCodeState;
  console.log(
    "Paystack promoDiscount:",
    promoDiscount,
    "discountPercentage:",
    discountPercentage
  );
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);

  // const shipmentSave = useSelector((state) => state.shipmentSave);
  // console.log("shipmentSave:", shipmentSave);

  const shipmentSave = JSON.parse(localStorage.getItem("shipmentData")) || [];
  console.log("shipmentSave:", shipmentSave);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  // useEffect(() => {
  //   if (success) {
  //     // history.push("/");
  //   }
  // }, [success, history]);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = cartItems.length > 0 ? 1000 : 0;
  const taxPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price * 0.1,
    0
  );

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const promoTotalPrice = totalPrice - promoDiscount;
  console.log(
    "totalPrice:",
    totalPrice,
    "promoDiscount:",
    promoDiscount,
    "promoTotalPrice:",
    promoTotalPrice
  );

  const finalItemsPrice = itemsPrice - promoDiscount;
  console.log("finalItemsPrice:", finalItemsPrice);

  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/get-payment-details/`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        );
        setPaysofterPublicKey(response.data.paysofterPublicKey);
        setPaystackPublicKey(response.data.paystackPublicKey);
        setReference(response.data.reference);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      await getPaymentDetails();
    };
    fetchData();
  }, [userInfo.access]);

  const handlePaymentGatewaySelection = (paymentGateway) => {
    setSelectedPaymentGateway(paymentGateway);
  };

  const paymentData = {
    reference,
    order_id,
    totalPrice,
    taxPrice,
    userEmail,
    shippingPrice,
    itemsPrice,
    finalItemsPrice,
    promoDiscount,
    discountPercentage,
    promoTotalPrice,
    // publicKey,
    paystackPublicKey,
    paysofterPublicKey,
    shipmentSave,
  };
  console.log("paymentData:", paymentData);

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col md={6}>
            <h1 className="text-center py-2">Payment Page</h1>

            <div className="text-center py-2">
              <Row className="text-center py-2">
                <Col md={11}>
                  <Button
                    variant="dark"
                    onClick={() => handlePaymentGatewaySelection("paystack")}
                    className="mr-2 rounded w-100"
                  >
                    Pay with Paystack
                  </Button>
                </Col>
                <Col md={1}>
                  <Button variant="outline">
                    {/* <i className="fa fa-info-circle"></i> */}
                  </Button>
                </Col>
              </Row>

              <Row className="text-center py-2">
                <Col md={11}>
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentGatewaySelection("paysofter")}
                    className="mr-2 rounded w-100"
                    // disabled
                  > 
                    Pay with Paysofter
                  </Button>
                </Col>
                <Col md={1}>
                  <Button
                    variant="outline"
                    onClick={handleInfoModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Don't have a Paysofter account? Click here."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Paysofter Account
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Don't have a Paysofter account? You're just about 3
                        minutes away! Sign up for a much softer payment
                        experience.{" "}
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
                              Create A Free Account
                            </Button>
                          </span>
                        </a>
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>

              {/* <Row className="text-center py-2">
                <Col md={11}>
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentGatewaySelection("paysofter-promise")}
                    className="mr-2 rounded w-100"
                  >
                    Pay with Paysofter Promise
                  </Button>
                </Col>
                <Col md={1}>
                  <Button
                    variant="outline"
                    onClick={handleInfoModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Don't have a Paysofter account? Click here."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Paysofter Account
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Don't have a Paysofter account? You're just about 3
                        minutes away! Sign up for a much softer payment
                        experience.{" "}
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
                              Create A Free Account
                            </Button>
                          </span>
                        </a>
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row> */}

            </div>

            {selectedPaymentGateway === "paystack" && (
              <Paystack paymentData={paymentData} />
            )}

            {selectedPaymentGateway === "paysofter" && (
              <Paysofter
                // paymentData={paymentData}
                reference={reference}
                order_id={order_id}
                totalPrice={totalPrice}
                taxPrice={taxPrice}
                userEmail={userEmail}
                shippingPrice={shippingPrice}
                itemsPrice={itemsPrice}
                finalItemsPrice={finalItemsPrice}
                promoDiscount={promoDiscount}
                discountPercentage={discountPercentage}
                promoTotalPrice={promoTotalPrice}
                paysofterPublicKey={paysofterPublicKey}
                shipmentSave={shipmentSave}
              />
            )}

            {selectedPaymentGateway === "paysofter-promise" && (
              <PaysofterPromise paymentData={paymentData} />
            )}
            
          </Col>
        </div>
      </Row>
    </>
  );
}

export default PaymentScreen;
