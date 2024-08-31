// ShopFrontLink.js
import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSellerShopfrontLink } from "../../actions/marketplaceSellerActions";
import Loader from "../Loader";
import Message from "../Message";
import QRCode from "qrcode.react";

function ShopFrontLink() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopfrontRef = useRef(null);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const getSellerShopfrontLinkState = useSelector(
    (state) => state.getSellerShopfrontLinkState
  );
  const { loading, error, shopfrontLink } = getSellerShopfrontLinkState;
  console.log("shopfrontLink:", shopfrontLink);

  const [isShopfrontLinkCopied, setIsShopfrontLinkCopied] = useState(false);

  useEffect(() => {
    dispatch(getSellerShopfrontLink());
  }, [dispatch]);

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (textToCopy === shopfrontLink) {
        setIsShopfrontLinkCopied(true);
        setTimeout(() => setIsShopfrontLinkCopied(false), 2000);
      }
    });
  };

  const shareShopfrontLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shopfront Link",
          text: "Check out my Shopfront link!",
          url: shopfrontLink,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      console.log("Web Share API not supported");
      alert("Please manually share the Shopfront link: " + shopfrontLink);
    }
  };

  const downloadQRCode = () => {
    const canvas = shopfrontRef.current.querySelector("canvas");
    const qrUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "shopfront-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareQRCode = () => {
    const canvas = shopfrontRef.current.querySelector("canvas");
    canvas.toBlob((blob) => {
      const file = new File([blob], "shopfront-qr-code.png", {
        type: "image/png",
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            files: [file],
            title: "QR Code",
            text: "Scan this QR code to visit my Shopfront link!",
          })
          .catch((error) => console.error("Share failed:", error));
      } else {
        downloadQRCode();
      }
    });
  };

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col>
          <hr />
          <h1 className="text-center py-3">Seller Shopfront Link</h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              <h5 className="pt-3">Your Shopfront Link:</h5>
              <div>
                <span style={{ color: "blue" }}>{shopfrontLink}</span>{" "}
                <Button
                  variant="outline-transparent"
                  className="rounded"
                  size="sm"
                  onClick={() => copyToClipboard(shopfrontLink)}
                >
                  {isShopfrontLinkCopied ? (
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
                  variant="outline-transparent"
                  className="rounded"
                  onClick={shareShopfrontLink}
                >
                  Share <i className="fas fa-share-alt"></i>
                </Button>
              </div>
              <hr />
              <h5 className="pt-3">Your Shopfront QR Code:</h5>
              <div
                ref={shopfrontRef}
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
                  value={shopfrontLink}
                  size={150}
                  bgColor="#fff"
                  fgColor="blue"
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

export default ShopFrontLink;

// import React, { useEffect, useState } from "react";
// import { Row, Col, Button } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { getSellerShopfrontLink } from "../../actions/marketplaceSellerActions";
// import Loader from "../Loader";
// import Message from "../Message";

// function ShopFrontLink() {
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (!userInfo) {
//       window.location.href = "/login";
//     }
//   }, [userInfo]);

//   const getSellerShopfrontLinkState = useSelector(
//     (state) => state.getSellerShopfrontLinkState
//   );
//   const { loading, error, shopfrontLink } = getSellerShopfrontLinkState;
//   console.log("shopfrontLink:", shopfrontLink);

//   const [isShopfrontLinkCopied, setIsShopfrontLinkCopied] = useState(false);

//   useEffect(() => {
//     dispatch(getSellerShopfrontLink());
//   }, [dispatch]);

//   const copyToClipboard = (textToCopy) => {
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       if (textToCopy === shopfrontLink) {
//         setIsShopfrontLinkCopied(true);
//         setTimeout(() => setIsShopfrontLinkCopied(false), 2000);
//       }
//     });
//   };

//   const shareShopfrontLink = () => {
//     if (navigator.share) {
//       navigator
//         .share({
//           title: "Shopfront Link",
//           text: "Check out my Shopfront link!",
//           url: shopfrontLink,
//         })
//         .then(() => console.log("Shared successfully"))
//         .catch((error) => console.error("Share failed:", error));
//     } else {
//       console.log("Web Share API not supported");
//       alert("Please manually share the referral link: " + shopfrontLink);
//     }
//   };

//   return (
//     <div>
//       <Row className="d-flex justify-content-center">
//         <Col>
//           <hr />
//           <h1 className="text-center py-3">Seller Shopfront Link</h1>
//           <hr />
//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <Message variant="danger">{error}</Message>
//           ) : (
//             <div>
//               <h5 className="pt-3">Your Shopfront Link:</h5>
//               <div>
//                 <span style={{ color: "blue" }}>
//                   <span

//                   >
//                     {shopfrontLink}
//                   </span>
//                 </span>{" "}
//                 <span>
//                   <Button
//                     variant="outline-transparent"
//                     className="rounded"
//                     size="sm"
//                     onClick={() => copyToClipboard(shopfrontLink)}
//                   >
//                     {isShopfrontLinkCopied ? (
//                       <span>
//                         <i className="fa fa-check"></i> Copied
//                       </span>
//                     ) : (
//                       <span>
//                         <i className="fa fa-copy"></i> Copy
//                       </span>
//                     )}
//                   </Button>
//                 </span>
//                 <span>
//                   <Button
//                     variant="outline-transparent"
//                     className="rounded"
//                     onClick={shareShopfrontLink}
//                   >
//                     Share <i className="fas fa-share-alt"></i>
//                   </Button>
//                 </span>
//               </div>
//               <hr />
//             </div>
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default ShopFrontLink;
