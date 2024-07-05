// AppVersionScreen.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAndroid,
  faAppleAlt,
  faDownload,
  faMobileAndroidAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Col, Container, Accordion, Card } from "react-bootstrap";
import AndriodImage from "../../images/andriod.jpg";
import IosImage from "../../images/ios.jpg";

function AppVersionScreen() {
  const handleAndriodDownload = () => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.jondebosco.sellangle";
  };

  // const handleIosDownload = () => {
  //   window.location.href =
  //     "https://play.apple.com/store/apps/details?id=com.jondebosco.sellangle";
  // };

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center py-3">
          <FontAwesomeIcon icon={faMobileAndroidAlt} /> Mobile App Versions (Beta)
        </h2>

        {/* {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>} */}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Andriod</Accordion.Header>
              <Accordion.Body>
                <h3 className="py-2">
                  Download Latest Version (at Google Play Store){" "}
                </h3>

                <Row className="d-flex justify-content-between py-2">
                  <Col>
                    <FontAwesomeIcon icon={faMobileAndroidAlt} /> Sellangle
                    (Latest)
                  </Col>

                  <Col
                    onClick={handleAndriodDownload}
                    style={{ cursor: "pointer" }}
                    className="d-flex justify-content-center align-items-center text-center"
                  >
                    <Card className="my-3 p-3 rounded">
                      <Card.Img
                        src={AndriodImage}
                        style={{ width: 180, height: 40 }}
                      />
                      <span>
                        <FontAwesomeIcon icon={faDownload} /> Download at
                        Playstore
                      </span>
                    </Card>
                  </Col>
                </Row>

                <h3 className="text-center py-2">Download Versions (APK)</h3>

                <div className="d-flex justify-content-between py-2">
                  <p>
                    <FontAwesomeIcon icon={faMobileAndroid} /> Sellangle (v2.0.8
                    Latest)
                  </p>

                  <Button className="rounded" variant="success">
                    <FontAwesomeIcon icon={faDownload} /> Download APK{" "}
                  </Button>
                </div>

                <div className="d-flex justify-content-between py-2">
                  <p>
                    <FontAwesomeIcon icon={faMobileAndroid} /> Sellangle
                    (v2.0.7)
                  </p>

                  <Button className="rounded" variant="success">
                    <FontAwesomeIcon icon={faDownload} /> Download APK
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>iOS</Accordion.Header>
              <Accordion.Body>
                <h3 className="py-2">
                  Download Latest Version (at Apple App Store)
                </h3>

                <Row className="d-flex justify-content-between py-2">
                  <Col>
                    <FontAwesomeIcon icon={faAppleAlt} /> Sellangle (v2.0.8
                    Latest)
                  </Col>

                  <Col
                    // onClick={handleIosDownload}
                    style={{ cursor: "pointer" }}
                    className="d-flex justify-content-center align-items-center text-center"
                  >
                    <Card className="my-3 p-3 rounded">
                      <Card.Img
                        src={IosImage}
                        style={{ width: 180, height: 40 }}
                      />
                      <span>
                        <FontAwesomeIcon icon={faDownload} /> Download at
                        Appstore
                      </span>
                    </Card>
                  </Col>
                </Row>

                <h3 className="text-center py-2">Download Versions (APK)</h3>

                <div className="d-flex justify-content-between py-2">
                  <p>
                    <FontAwesomeIcon icon={faAppleAlt} /> Sellangle (v2.0.8
                    Latest)
                  </p>

                  <Button className="rounded" variant="success">
                    <FontAwesomeIcon icon={faDownload} /> Download APK{" "}
                  </Button>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <p>
                    <FontAwesomeIcon icon={faAppleAlt} /> Sellangle (v2.0.7)
                  </p>

                  <Button className="rounded" variant="success">
                    <FontAwesomeIcon icon={faDownload} /> Download APK{" "}
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default AppVersionScreen;
