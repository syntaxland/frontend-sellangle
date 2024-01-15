// CheckoutScreen.js
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { createOrder } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../Message";
import Loader from "../Loader";

const API_URL = process.env.REACT_APP_API_URL;

function CheckoutScreen() {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error } = orderCreate;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [order_id, setOrderId] = useState("");
  const [paymentMethod] = useState("Paystack");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    const getOrderId = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/get-order-id/`, {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        });
        setOrderId(response.data.order_id);
      } catch (error) {
        console.log(error);
      }
    };

    getOrderId();
  }, [userInfo.access]);

  const shippingPrice = cartItems.length > 0 ? 1000 : 0;
  const taxPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price * 0.03,
    0
  );

  const totalPrice =
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) +
    shippingPrice +
    taxPrice;

  const createdAt = new Date().toISOString();
  // const createdAt = new Date().toLocaleString()

  const createOrderHandler = async () => {
    const orderItems = cartItems.map((item) => ({
      product: item.product,
      name: item.name,
      qty: item.qty,
      price: item.price,
      image: item.image,
    }));

    await dispatch(
      createOrder({
        orderItems,
        paymentMethod,
        itemsPrice: cartItems.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        ),
        shippingPrice,
        taxPrice,
        totalPrice,
        order_id,
        createdAt,
      })
    ).catch((error) => {
      console.log("Error creating order:", error);
      throw error;
    });

    history.push(`/shipment/${order_id}`);
  };

  return (
    <Row>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}{" "}
      {success && (
        <Message variant="success">Order created successfully!</Message>
      )}
      <div className="d-flex justify-content-center">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <h1 className="text-center py-2">Order Summary</h1>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={4}>
                    <Image
                      src={item.image}
                      className="img-fluid"
                      alt={item.name}
                    />
                  </Col>
                  <Col md={8}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p>
                      {item.qty} x NGN {item.price} = NGN{" "}
                      {item.qty * item.price}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>Order ID: {order_id}</ListGroup.Item>
            <ListGroup.Item>Payment Method: {paymentMethod}</ListGroup.Item>
            <ListGroup.Item>
              Shipping Cost: NGN{" "}
              {shippingPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: NGN{" "}
              {taxPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </ListGroup.Item>
            <ListGroup.Item>
              Total Amount: NGN{" "}
              {totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </ListGroup.Item>

            <ListGroup.Item>Timestamp: {createdAt}</ListGroup.Item>

            <div className="text-center py-2">
              <Button
                type="button"
                variant="success"
                className="w-100 rounded"
                onClick={createOrderHandler}
              >
                Continue to Shipment
              </Button>
            </div>
          </ListGroup>
        </Col>
      </div>
    </Row>
  );
}

export default CheckoutScreen;
