// ProductPrice.js
import React from "react";

const ProductPrice = ({ price, promoPrice }) => {
  // Check if price and promoPrice are defined
  if (typeof price === "undefined" || typeof promoPrice === "undefined") {
    return null; 
  }

  // Calculate the discount percentage
  const discountPercentage = promoPrice
    ? ((price - promoPrice) / price) * 100
    : 0;

  // Format the prices with 2 decimal places
  const formattedPrice = price;
  // .toLocaleString(undefined, {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });
  const formattedPromoPrice = promoPrice;
    // ? promoPrice
    // .toLocaleString(undefined, {
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    //   })
    // : null;
    // console.log('formattedPrice', formattedPrice, 'formattedPromoPrice:', formattedPromoPrice)


  return (
    <div>
      <div>
        {promoPrice ? (
          <>
            <span style={{ textDecoration: "line-through" }}>
              NGN {formattedPrice}
            </span>
            {"  "}
            <span style={{ color: "red" }}>
              NGN {formattedPromoPrice}
            </span>
          </>
        ) : (
          `NGN ${formattedPrice}`
        )}
      </div>
      {promoPrice && (
        <div>
          <span style={{ color: "green" }}>
            {discountPercentage.toFixed(2)}% Off
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;

