// FreeAdMessage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Container } from "react-bootstrap";
import {
  createFreeAdMessage,
  listFreeAdMessages,
} from "../../actions/marketplaceSellerActions";
import Loader from "../Loader"; 
import Message from "../Message";
import RatingSeller from "../RatingSeller";
import PromoTimer from "../PromoTimer";
import LoaderButton from "../LoaderButton";

function FreeAdMessage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const image1 = queryParams.get("image1");
  const ad_name = queryParams.get("ad_name");
  const price = queryParams.get("price");
  const currency = queryParams.get("currency");
  const sellerAvatarUrl = queryParams.get("sellerAvatarUrl");
  const seller_username = queryParams.get("seller_username");
  const expiration_date = queryParams.get("expiration_date");
  const ad_rating = queryParams.get("ad_rating");

  const [message, setMessage] = useState("");

  const createFreeAdMessageState = useSelector(
    (state) => state.createFreeAdMessageState
  );
  const { loading, success, error } = createFreeAdMessageState;

  const listFreeAdMessageState = useSelector(
    (state) => state.listFreeAdMessageState
  );
  const {
    loading: listFreeAdMessageLoading,
    error: listFreeAdMessageError,
    adMessages,
  } = listFreeAdMessageState;
  console.log("adMessages:", adMessages);

  useEffect(() => {
    const pk = id;
    dispatch(listFreeAdMessages(pk));
  }, [dispatch, id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();

    const messageData = {
      pk: id,
      message: message,
    };

    dispatch(createFreeAdMessage(messageData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        window.location.reload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <Container>
      <div>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div className=" py-2 ">
              {loading && <Loader />}
              {error && (
                <Message variant="danger" fixed>
                  {error}
                </Message>
              )}

              {listFreeAdMessageLoading && <Loader />}
              {listFreeAdMessageError && (
                <Message variant="danger" fixed>
                  {listFreeAdMessageError}
                </Message>
              )}
            </div>

            <ListGroup className="py-2">
              <ListGroup.Item>
                <h3 className="rounded py-2 text-center">Ad Details</h3>
                <Row>
                  <Col>
                    <ListGroup.Item>
                      <Row>
                        <Col md={4}>
                          <img
                            src={image1}
                            alt={ad_name}
                            className="img-fluid"
                          />
                        </Col>
                        <Col md={8}>
                          <p>{ad_name}</p>
                        </Col>
                        <Col md={12} className="py-2">
                          <ListGroup.Item>
                            <p>{currency} {price}</p>
                          </ListGroup.Item>
                        </Col>
                        <Col md={12} className="py-2">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded"
                            disabled
                          >
                            <i className="fas fa-clock"></i> Expires in:{" "}
                            <PromoTimer expirationDate={expiration_date} />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </Col>
                  <Col>
                    <ListGroup.Item>
                      <Row>
                        <Col md={4}>
                          <img
                            src={sellerAvatarUrl}
                            alt={seller_username}
                            className="img-fluid"
                            style={{
                              // maxWidth: "80px",
                              // maxHeight: "80px",
                              borderRadius: "50%",
                            }}
                          />
                        </Col>
                        <Col md={8}>
                          <p>{seller_username}</p>
                        </Col>

                        <Col className="mt-2">
                          <ListGroup.Item>
                            <RatingSeller value={ad_rating} color={"green"} />
                          </ListGroup.Item>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ul>
              {adMessages?.map((message) => (
                <div className="py-2">
                  <li key={message.id} className="border rounded p-4 py-2">
                    <p>
                      User:{" "}
                      {message.username?.charAt(0).toUpperCase() +
                        message.username?.slice(1)}
                    </p>
                    <p>Message: {message.message}</p> 
                    <p>
                      Timestamp: {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </li>
                </div>
              ))}
            </ul>

            <Form onSubmit={handleSubmitReply}>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Type your message"
                  rows={4}
                  value={message}
                  maxLength={1000}
                  onChange={(e) => setMessage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="py-2">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="success"
                >
                  <div className="d-flex justify-content-center">
                    <span className="py-1">Submit</span>
                    {loading && <LoaderButton />}
                  </div>
                </Button>
              </div>
              {success && (
                <Message variant="success" fixed>
                  Message sent successfully.
                </Message>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default FreeAdMessage;
