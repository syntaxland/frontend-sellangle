// Message.js
import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";

const Message = ({ variant, children, fixed }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const messageStyle = {
    position: fixed ? "fixed" : "relative",
    top: fixed ? 80 : null,
    // left: fixed ? null : null,
    transform: fixed ? null : null,
  };

  return showMessage ? (
    <div
      style={messageStyle}
      className="d-flex justify-content-center text-center py-2"
    >
      <Alert className="rounded  w-100" variant={variant}>
        <div className="d-flex justify-content-between align-items-center">
          {children}

          {fixed && (
            <Button
              onClick={() => setShowMessage(false)}
              variant="outline-light"
              size="sm"
              className="close-button py-2 rounded"
            >
              &times;
            </Button>
          )}
        </div>
      </Alert>
    </div>
  ) : null;
};

export default Message;

