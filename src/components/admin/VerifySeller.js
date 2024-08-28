// VerifySeller.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { verifySeller } from "../../actions/marketplaceSellerActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function VerifySeller({ seller_username }) { 
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const verifySellerState = useSelector((state) => state.verifySellerState);
  const { success, error, loading } = verifySellerState;

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const sellerData = {
    password: password,
    seller_username: seller_username,
  };
  console.log("seller_username:", seller_username);

  const handleVerifySeller = () => {
    dispatch(verifySeller(sellerData));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col md={6}>
          {/* <h2 className="mb-4">Verify Seller</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">Seller verified successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning text-warning"
              style={{
                fontSize: "18px",
                // color: "orange"
              }}
            ></i>{" "}
            Warning! This action will verify seller with username{" "}
            <i>{seller_username}</i>. Are you sure you want to continue?
          </p>

          <Form>
            <Form.Group>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded mt-2"
                required
                maxLength={100}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleVerifySeller}
              className="rounded mt-2 text-center w-100"
              disabled={password === "" || loading || success}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifySeller;
