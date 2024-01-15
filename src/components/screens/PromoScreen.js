// PromoScreen.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyPromoCode, setTimer } from "../actions/promoActions";

function PromoScreen() {
  const dispatch = useDispatch();
  const { promoCode, promoError, timer } = useSelector((state) => state.promo);

  const applyPromoCodeHandler = (code) => {
    dispatch(applyPromoCode(code));
  };

  useEffect(() => {
    // Start the countdown timer
    const interval = setInterval(() => {
      if (timer > 0) {
        dispatch(setTimer(timer - 1));
      }
    }, 1000);

    // Clean up
    return () => {
      clearInterval(interval);
    };
  }, [timer, dispatch]);

  return (
    <div>
      <h2>Promo Code</h2>
      {promoError && <p>Error: {promoError}</p>}
      {promoCode ? (
        <>
          <p>Promo code applied successfully</p>
          {timer > 0 ? (
            <p>Time left: {timer} seconds</p>
          ) : (
            <p>Promo code expired</p>
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter promo code"
            onChange={(e) => applyPromoCodeHandler(e.target.value)}
          />
        </>
      )}
    </div>
  );
}

export default PromoScreen;
