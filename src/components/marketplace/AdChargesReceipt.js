// AdChargesReceipt.js
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import Message from "../Message";

function AdChargesReceipt({ userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleCloseReceiptModal = () => setShowReceiptModal(false);
  const handleShowReceiptModal = () => setShowReceiptModal(true);

  const downloadAdChargesReceipt = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/ad-charges-receipt/${userId}/`, {
        responseType: "blob", // Important to handle binary data
      });

      // Create a Blob from the PDF file and create a download link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ad_charges_receipt.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
    } catch (error) {
      setError("Error downloading ad charges receipt.");
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowReceiptModal}>
        View Ad Charges Receipt
      </Button>

      <Modal show={showReceiptModal} onHide={handleCloseReceiptModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ad Charges Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <p>Download your ad charges receipt:</p>
              <Button onClick={downloadAdChargesReceipt}>Download Receipt</Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReceiptModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdChargesReceipt;
