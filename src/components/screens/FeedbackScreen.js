// FeedbackScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createFeedback } from "../../actions/feedbackActions";

import Loader from "../Loader";
import Message from "../Message";

function FeedbackScreen({ history }) {
  const dispatch = useDispatch(); 

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const feedbackCreate = useSelector((state) => state.feedbackCreate);
  const { loading, success, error } = feedbackCreate;

  const submitHandler = (e) => {
    e.preventDefault();

    const feedbackData = {
      subject: subject,
      category: category,
      message: message,
    };

    dispatch(createFeedback(feedbackData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Feedback</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Feedback sents successfully.</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="category"> 
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="support">Support</option>
                <option value="billing">Billing</option>
                <option value="abuse">Abuse</option>
                <option value="otp">OTP</option>
                <option value="payment">Payment</option>
                <option value="services">Services</option>
                <option value="credit_points">Credit Points</option>
                <option value="referrals">Referrals</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={80}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                value={message}
                maxLength={1000}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="py-2">
              <Button className="w-100 rounded" type="submit" variant="success">
                Submit Feedback
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default FeedbackScreen;
