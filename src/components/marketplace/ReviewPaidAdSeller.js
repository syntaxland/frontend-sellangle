// ReviewPaidAdSeller.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { reviewPaidAdSeller } from "../../actions/marketplaceSellerActions";
import Loader from "../Loader";
// import Message from "../Message";
import Select from "react-select";
import GetPaidAdSellerReviews from "./GetPaidAdSellerReviews";

const SELLER_REVIEW_CHOICES = [
  ["1", "1 - Poor"],
  ["1.5", "1.5"],
  ["2", "2 - Fair"],
  ["2.5", "2.5"],
  ["3", "3 - Good"],
  ["3.5", "3.5"],
  ["4", "4 - Very Good"],
  ["4.5", "4.5"],
  ["5", "5 - Excellent"],
];

function ReviewPaidAdSeller({ adId }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const reviewPaidAdSellerState = useSelector(
    (state) => state.reviewPaidAdSellerState
  );
  const { loading, success,
    //  error
     } = reviewPaidAdSellerState;

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "rating":
        setRating(value);
        break;

      case "comment":
        setComment(value);
        break;

      default:
        break;
    }
  };

  const reviewData = {
    ad_id: adId,
    rating: rating,
    comment: comment,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(reviewPaidAdSeller(reviewData));
    // setRating("");
    // setComment("");
  }; 

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div>
      <Row className="py-3 d-flex justify-content-center">
        <Col>
          <div>
            <GetPaidAdSellerReviews adId={adId} />
          </div>

          <h2 className="text-center py-2">Rate Seller</h2>
          {loading && <Loader />}
          {/* {error && <Message variant="danger">{error}</Message>} */}
          {/* {success && (
            <Message variant="success">Review added successfully.</Message>
          )} */}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>

              <Select
                value={{ value: rating, label: rating }}
                onChange={(selectedOption) =>
                  handleFieldChange("rating", selectedOption.value)
                }
                options={SELLER_REVIEW_CHOICES?.map((type) => ({
                  value: type[0],
                  label: type[1],
                }))}
              />
            </Form.Group>

            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={2}
                value={comment}
                onChange={(e) => handleFieldChange("comment", e.target.value)}
                placeholder="Enter comment"
                maxLength={225}
              ></Form.Control>
            </Form.Group>
            <Button
              className="py-2 mt-2 w-100 rounded"
              type="submit"
              variant="success"
              disabled={comment === ""}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ReviewPaidAdSeller;