// AdChargesReceipt.js
import React, { useState, useEffect } from "react";
import { Button, Modal, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAdChargesReceipt } from "../../actions/marketplaceSellerActions";
import Loader from "../Loader";
import Message from "../Message";

function AdChargesReceipt({ adChargesReceiptMonth }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAdChargesReceiptState = useSelector(
    (state) => state.getAdChargesReceiptState
  );
  const { loading, success, error, paidAdReceipt } = getAdChargesReceiptState;
  console.log("paidAdReceipt:", paidAdReceipt);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleCloseReceiptModal = () => setShowReceiptModal(false);
  const handleShowReceiptModal = () => setShowReceiptModal(true);

  // const downloadAdChargesReceipt = async () => {
  //   try {
  //     const adData = {
  //       ad_charges_receipt_month: adChargesReceiptMonth,
  //     };
  //       console.log("adData:", adData);
  //       const { data } = await dispatch(getAdChargesReceipt(adData));

  //       console.log("data:", data);

  //       if (data) {

  //       // Decode the base64-encoded PDF data
  //       const byteCharacters = atob(data);
  //       const byteNumbers = new Array(byteCharacters.length);
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //       }
  //       const byteArray = new Uint8Array(byteNumbers);
  //       console.log("Uint8Array:", byteArray);

  //       const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
  //       console.log("pdfBlob:", pdfBlob);

  //       const link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(pdfBlob);
  //       link.setAttribute(
  //         "download",
  //         `${adChargesReceiptMonth}_ad_billing_receipt.pdf`
  //       );
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     } else {
  //       console.error("Error downloading ad charges receipt.");
  //     }
  //   } catch (error) {
  //     console.error("Error dispatching getAdChargesReceipt:", error);
  //   }
  // };

  const downloadAdChargesReceipt = async () => {
    try {
      // Dispatch the getAdChargesReceipt action when the user clicks "Download"
      const adData = {
        ad_charges_receipt_month: adChargesReceiptMonth,
      };
      console.log("adData", adData);

      await dispatch(getAdChargesReceipt(adData));

      if (paidAdReceipt) {

        // Convert the base64 PDF data to a Blob using atob function
        const byteCharacters = atob(paidAdReceipt);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        console.log("Uint8Array:", byteArray);

        const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
        console.log("pdfBlob:", pdfBlob);

        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(pdfBlob);
        link.setAttribute(
          "download",
          `${adChargesReceiptMonth}_ad_charges_receipt.pdf`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Error downloading ad charges receipt.");
      }
    } catch (error) {
      console.error("Error dispatching getAdChargesReceipt:", error);
    }
  };

  // const downloadAdChargesReceipt = async () => {
  //   try {
  //     // Dispatch the getAdChargesReceipt action when the user clicks "Download"
  //     const adData = {
  //       ad_charges_receipt_month: adChargesReceiptMonth,
  //     };
  //     console.log("adData", adData);

  //     await dispatch(getAdChargesReceipt(adData));

  //     if (success && paidAdReceipt) {
  //       // Convert the base64 PDF data to a Blob using atob function
  //       const byteCharacters = atob(paidAdReceipt);
  //       const byteNumbers = new Array(byteCharacters.length);
  //       for (let i = 0; i < byteCharacters.length; i++) {
  //         byteNumbers[i] = byteCharacters.charCodeAt(i);
  //       }
  //       const byteArray = new Uint8Array(byteNumbers);
  //       console.log("Uint8Array:", byteArray);

  //       const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
  //       console.log("pdfBlob:", pdfBlob);

  //       // Create a download link and trigger the download
  //       const link = document.createElement("a");
  //       link.href = window.URL.createObjectURL(pdfBlob);
  //       link.setAttribute(
  //         "download",
  //         `${adChargesReceiptMonth}_ad_charges_receipt.pdf`
  //       );
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     } else {
  //       console.error("Error downloading ad charges receipt.");
  //     }
  //   } catch (error) {
  //     console.error("Error dispatching getAdChargesReceipt:", error);
  //   }
  // };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        // window.location.reload();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <Container className="d-flex justify-content-center align-items-center text-center">
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={handleShowReceiptModal}
            disabled={loading}
          >
            <i className="fas fa-download"></i> Download
          </Button>

          <Modal show={showReceiptModal} onHide={handleCloseReceiptModal}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100 py-2">
                Ad Charges Receipt
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-2 d-flex justify-content-center align-items-center text-center">
              <div>
                {loading ? (
                  <>
                  <Loader />
                  <p>Downloading...</p>
                </>
                ) : success ? (
                  <Message variant="success">
                    Ad charges receipt for {adChargesReceiptMonth} downloaded
                    successfully.
                  </Message>
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <>
                    <p>
                      <p>
                        Download your ad charges receipt for:{" "}
                        {adChargesReceiptMonth}?
                      </p>
                      <Button
                        onClick={downloadAdChargesReceipt}
                        // disabled={loading}
                      >
                        {" "}
                        <i className="fas fa-file-download"></i> Download
                      </Button>
                    </p>
                  </>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseReceiptModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default AdChargesReceipt;
