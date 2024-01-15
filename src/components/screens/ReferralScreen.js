// ReferralScreen.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { referUser } from "../actions/referralActions";

function ReferralScreen() {
  const dispatch = useDispatch();
  const { referralCode, referralError } = useSelector((state) => state.referral);

  const [referralInput, setReferralInput] = useState("");

  const referUserHandler = () => {
    dispatch(referUser(referralInput));
  };

  return (
    <div>
      <h2>Refer a Friend</h2>
      {referralError && <p>Error: {referralError}</p>}
      {referralCode ? (
        <p>Referral code: {referralCode}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter friend's referral code"
            value={referralInput}
            onChange={(e) => setReferralInput(e.target.value)}
          />
          <button onClick={referUserHandler}>Refer</button>
        </>
      )}
    </div>
  );
}

export default ReferralScreen;
