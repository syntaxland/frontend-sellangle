// AddReviewScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addReview } from "../../actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";

function AddReviewScreen({ match, history }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderItemId = query.get("orderItemId"); 

  console.log("orderItemId:", orderItemId);
  const reviewAdd = useSelector((state) => state.orderAddReview);
  const { loading, success, error } = reviewAdd;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addReview(orderItemId, rating, comment));
    setRating("");
    setComment("");
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Add Review</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Review added successfully.</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1 - Poor</option>
                <option value="1.5">1.5</option>
                <option value="2">2 - Fair</option>
                <option value="2.5">2.5</option>
                <option value="3">3 - Good</option>
                <option value="3.5">3.5</option>
                <option value="4">4 - Very Good</option>
                <option value="4.5">4.5</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="w-100 rounded" type="submit" variant="success">
              Submit Review
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddReviewScreen;
