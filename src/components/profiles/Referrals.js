// Referrals.js
import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  generateReferralLink,
  getUserReferrals,
} from "../../actions/promoActions";
import Loader from "../Loader";
import Message from "../Message";
import QRCode from "qrcode.react";

function Referrals() {
  const dispatch = useDispatch();
  const qrCodeRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const referralState = useSelector((state) => state.referral);
  const { referralLink, referralCode, referralError, loading } = referralState;

  const referralButton = useSelector((state) => state.referralButton);
  const { referralErrorButton, loading: loadingButton } = referralButton;

  const userReferralState = useSelector((state) => state.userReferralState);
  const {
    loading: userReferralsLoading,
    userReferrals,
    error: userReferralsError,
  } = userReferralState;

  const [isReferralLinkCopied, setIsReferralLinkCopied] = useState(false);
  const [isReferralCodeCopied, setIsReferralCodeCopied] = useState(false);

  useEffect(() => {
    dispatch(generateReferralLink());
    dispatch(getUserReferrals());
  }, [dispatch]);

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (textToCopy === referralLink) {
        setIsReferralLinkCopied(true);
        setTimeout(() => setIsReferralLinkCopied(false), 2000);
      } else if (textToCopy === referralCode) {
        setIsReferralCodeCopied(true);
        setTimeout(() => setIsReferralCodeCopied(false), 2000);
      }
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Referral Link",
          text: `Check out ${userInfo.username}'s referral link!`,
          url: referralLink,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      console.log("Web Share API not supported");
      alert("Please manually share the referral link: " + referralLink);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const qrUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "referral-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareQRCode = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    canvas.toBlob((blob) => {
      const file = new File([blob], "referral-qr-code.png", {
        type: "image/png",
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            files: [file],
            title: "QR Code",
            text: `Scan ${userInfo.username}'s QR code to use the referral link!`,
          })
          .catch((error) => console.error("Share failed:", error));
      } else {
        downloadQRCode(); // Fallback to download if sharing is not supported
      }
    });
  };

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col>
          <div>
            <h1 className="text-center py-3">Referrals</h1>
            <hr />
            {userReferralsLoading ? (
              <Loader />
            ) : userReferralsError ? (
              <Message variant="danger">{userReferralsError}</Message>
            ) : (
              <>
                <h5 className="text-right py-2">
                  <i className="fas fa-users"></i> Referred Users:{" "}
                  {userReferrals.map((referrals) => (
                    <span key={referrals.id}>
                      (
                      {referrals.referred_users.length !== 0
                        ? referrals.referred_users.length
                        : 0}
                      )
                    </span>
                  ))}
                </h5>
              </>
            )}
          </div>
          <hr />
          <h1 className="text-center py-3">Referral Link</h1>
          {loading || loadingButton ? (
            <Loader />
          ) : referralError || referralErrorButton ? (
            <Message variant="danger">
              {referralError || referralErrorButton}
            </Message>
          ) : (
            <div>
              <h5 className="pt-3">Your Referral Code:</h5>
              <div>
                {referralCode}{" "}
                <Button
                  variant="success"
                  className="rounded"
                  size="sm"
                  onClick={() => copyToClipboard(referralCode)}
                >
                  {isReferralCodeCopied ? (
                    <span>
                      <i className="fa fa-check"></i> Copied
                    </span>
                  ) : (
                    <span>
                      <i className="fa fa-copy"></i> Copy
                    </span>
                  )}
                </Button>
              </div>

              <h5 className="pt-3">Your Referral Link:</h5>
              <div>
                <span style={{ color: "blue" }}>{referralLink}</span>{" "}
                <Button
                  variant="success"
                  className="rounded"
                  size="sm"
                  onClick={() => copyToClipboard(referralLink)}
                >
                  {isReferralLinkCopied ? (
                    <span>
                      <i className="fa fa-check"></i> Copied
                    </span>
                  ) : (
                    <span>
                      <i className="fa fa-copy"></i> Copy
                    </span>
                  )}
                </Button>
                <Button
                  variant="link"
                  className="rounded"
                  onClick={shareReferralLink}
                >
                  Share <i className="fas fa-share-alt"></i>
                </Button>
              </div>
              <hr />
              <h5 className="pt-3">Your Referral QR Code:</h5>
              {/* <div ref={qrCodeRef}>
                <QRCode value={referralLink} size={150} />
              </div> */}

              <div
                ref={qrCodeRef}
                style={{
                  padding: "20px",
                  backgroundColor: "#6c757d",
                  width: "190px",
                  height: "190px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <QRCode
                  value={referralLink}
                  size={150}
                  bgColor="#fff"
                  fgColor="green"
                  level="L"
                />
              </div>
              <Button
                variant="link"
                className="rounded mt-3"
                onClick={shareQRCode}
              >
                Share QR Code <i className="fas fa-share-alt"></i>
              </Button>
              <Button
                variant="success"
                className="rounded mt-3"
                onClick={downloadQRCode}
              >
                Download QR Code <i className="fas fa-download"></i>
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Referrals;
