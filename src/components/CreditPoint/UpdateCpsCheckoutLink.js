// UpdateCpsCheckoutLink.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { updateCpsCheckoutLink } from "../../actions/creditPointActions";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function UpdateCpsCheckoutLink({ cpsId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const updateCpsCheckoutLinkState = useSelector(
    (state) => state.updateCpsCheckoutLinkState
  );
  const { success, error, loading } = updateCpsCheckoutLinkState;

  const [link, setLink] = useState("");

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
    cps_checkout_link: link,
    cps_id: cpsId,
  };
  console.log("cpsId:", cpsId);

  const handleupdateCpsCheckoutLink = () => {
    dispatch(updateCpsCheckoutLink(sellerData));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col md={10}>
          {/* <h2 className="mb-4">Verify Seller</h2> */}
          {loading && <Loader />}
          {success && (
            <Message variant="success">Link updated successfully.</Message>
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
            Warning! This action will update your CPS checkout link. Are you
            sure you want to continue?
          </p>

          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter cps checkout link"
                className="rounded mt-2"
                required
                maxLength={225}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleupdateCpsCheckoutLink}
              className="rounded mt-2 text-center w-100"
              disabled={link === "" || loading || success}
            >
              Update Link
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateCpsCheckoutLink;
