import React from "react";

function OrderSuccessPage(props) {
  const { match } = props;
  const paymentReference = match.params.reference;

  return (
    <div className="text-center">
      <h1>Order Success</h1>
      <p>Your payment was successful!</p>
      <p>Payment Reference: {paymentReference}</p>
    </div>
  );
}

export default OrderSuccessPage;
