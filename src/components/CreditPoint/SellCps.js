// SellCps.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  // Modal
} from "react-bootstrap";
import { useSelector } from "react-redux";
import SellCpsToUser from "./SellCpsToUser";
import SellCpsToSellangle from "./SellCpsToSellangle";

function SellCps() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [selectedOption, setSelectedOption] = useState("user");
  // const [showInfoModal, setShowInfoModal] = useState(false);

  // const handleInfoModalShow = () => {
  //   setShowInfoModal(true);
  // };

  // const handleInfoModalClose = () => {
  //   setShowInfoModal(false);
  // };

  const handleSellCpsSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center">
          <Col>
            <div className="d-flex justify-content-center text-center py-2">
              <Row className="text-center py-2">
                <Col md={10}>
                  <Button
                    variant={
                      selectedOption === "user" ? "primary" : "outline-primary"
                    }
                    onClick={() => handleSellCpsSelection("user")}
                    className="mr-2 rounded w-100"
                  >
                    Sell CPS To User
                  </Button>
                </Col>
                {/* <Col md={2}>
                  <Button variant="outline"></Button>
                </Col> */}
              </Row>

              <Row className="text-center py-2">
                <Col md={10}>
                  <Button
                    variant={
                      selectedOption === "sellangle"
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => handleSellCpsSelection("sellangle")}
                    className="mr-2 rounded w-100"
                  >
                    Sell CPS To Sellangle
                  </Button>
                </Col>
                {/* <Col md={2}>
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
                        Sell CPS To Sellangle Using Paysofter Promise
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
                </Col> */}
              </Row>
            </div>

            <div>{selectedOption === "user" && <SellCpsToUser />}</div>

            <div>
              {selectedOption === "sellangle" && <SellCpsToSellangle />}
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default SellCps;
