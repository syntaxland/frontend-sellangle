// NotificationAlert.js
import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

const NotificationAlert = ({ variant, message, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Alert className="rounded" variant={variant} show={show} onClose={handleClose} dismissible>
      <Alert.Heading>{variant === "danger" ? "Error" : "Notification"}</Alert.Heading>
      <span>{message}</span>
      <span className="d-flex justify-content-end">
        <Button onClick={handleClose} variant={`outline-${variant}`}>
          OK
        </Button>
      </span>
    </Alert>
  );
};

export default NotificationAlert;
