// ProductPrice.js
import React from "react";
import { formatAmount } from "./FormatAmount";

const ProductPrice = ({
  price,
  currency,
  altPrice,
  altCurrency,
  discountPercentage,
}) => {
  const promoPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : 0;

  const altPromoPrice = discountPercentage
    ? altPrice - (altPrice * discountPercentage) / 100
    : 0;

  return (
    <div>
      <div>
        {promoPrice ? (
          <>
            <p style={{ textDecoration: "line-through" }}>
              <span>
                {formatAmount(price)} {currency}
              </span>{" "}
              {altPrice ? (
                <span>
                  {" "}
                  / {formatAmount(altPrice)} {altCurrency}{" "}
                </span>
              ) : (
                <></>
              )}{" "}
            </p>

            <p>
              <span style={{ color: "green" }}>
                {formatAmount(promoPrice)} {currency}
              </span>
              {altPrice ? (
                <span style={{ color: "green" }}>
                  {" "}
                  / {formatAmount(altPromoPrice)} {altCurrency}{" "}
                </span>
              ) : (
                <></>
              )}{" "}
            </p>
          </>
        ) : (
          ` ${formatAmount(price)} ${currency}`
        )}
      </div>
      {/* {promoPrice && (
        <div>
          <span style={{ color: "green" }}>
            {discountPercentage.toFixed(2)}% Off
          </span>
        </div>
      )} */}
    </div>
  );
};

export default ProductPrice;
