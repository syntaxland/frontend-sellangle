// SearchPaidAdCard.js
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Col  } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RatingSeller from "../RatingSeller";
import {
  saveProduct,
  removeProduct,
  updateProductSaveCount,
  trackProductView,
} from "../../actions/productAction";
import { getSellerAccount } from "../../actions/marketplaceSellerActions"; 

import { getPaidAdDetail } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
// import ProductPrice from "../ProductPrice";
import PromoTimer from "../PromoTimer";

import ReportPaidAd from "./ReportPaidAd";
function SearchPaidAdCard({ paidSearchAd }) { 
  console.log("paidSearchAd Card", paidSearchAd);
  const dispatch = useDispatch(); 

  const [paidSearchAdSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(paidSearchAd?.ad_save_count);

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const { sellerAccount } = getSellerAccountState;

  const [paidSearchAdMessages, setProductMessages] = useState({
    paidSearchAdSaveSuccess: false,
    paidSearchAdRemoveSuccess: false,
    paidSearchAdSaveError: null,
    paidSearchAdRemoveError: null,
  });

  const [paidSearchAdLoading, setProductLoading] = useState({
    paidSearchAdSaveLoading: false,
    paidSearchAdRemoveLoading: false,
  });

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { sellerAvatarUrl } = getPaidAdDetailState;
  // console.log("sellerAvatarUrl:", sellerAvatarUrl);

  const [reportAdModal, setReportAdModal] = useState(false);
  
  const handleReportAdOpen = () => {
    if (!userInfo) {
      history.push("/login");
    }  else {
      setReportAdModal(true);
    }
  };

  const handleReportAdClose = () => {
    setReportAdModal(false);
  };
  useEffect(() => {
    if (
      userInfo &&
      userInfo.favorite_paidSearchAds &&
      userInfo.favorite_paidSearchAds.includes(paidSearchAd.id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, paidSearchAd.id]);

  useEffect(() => {
    const pk = paidSearchAd.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getPaidAdDetail(pk));
    }
  }, [dispatch, userInfo, paidSearchAd.id]);

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (paidSearchAdSaved) {
        setProductLoading({ paidSearchAdRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, paidSearchAd.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              paidSearchAdRemoveSuccess: true,
              paidSearchAdSaveSuccess: false,
              paidSearchAdRemoveError: null,
              paidSearchAdSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            const updatedSaveCount = paidSearchAd?.ad_save_count - 1;
            dispatch(updateProductSaveCount(paidSearchAd.id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              paidSearchAdRemoveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              paidSearchAdRemoveSuccess: false,
              paidSearchAdSaveSuccess: false,
              paidSearchAdSaveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ paidSearchAdRemoveLoading: false });
          });
      } else {
        setProductLoading({ paidSearchAdSaveLoading: true });
        dispatch(saveProduct(userInfo.id, paidSearchAd.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              paidSearchAdSaveSuccess: true,
              paidSearchAdRemoveSuccess: false,
              paidSearchAdSaveError: null,
              paidSearchAdRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1);
            const updatedSaveCount = paidSearchAd?.ad_save_count + 1;
            dispatch(updateProductSaveCount(paidSearchAd.id, updatedSaveCount));
          })
          .catch((error) => {
            setProductMessages((prevState) => ({
              ...prevState,
              paidSearchAdSaveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              paidSearchAdSaveSuccess: false,
              paidSearchAdRemoveSuccess: false,
              paidSearchAdRemoveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ paidSearchAdSaveLoading: false });
          });
      }
    }
    setTimeout(() => {
      setProductMessages((prevState) => ({
        ...prevState,
        paidSearchAdSaveSuccess: false,
        paidSearchAdRemoveSuccess: false,
      }));
    }, 3000);
  };

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
      // dispatch(trackProductView(userInfo.id, paidSearchAd.id));
    }
    dispatch(trackProductView(userInfo.id, paidSearchAd.id));

    history.push(`/paid-ad-detail/${paidSearchAd.id}`);
  };

  function formatCount(viewCount) {
    if (viewCount >= 1000000) {
      // Format as million
      return (viewCount / 1000000).toFixed(1) + "m";
    } else if (viewCount >= 1000) {
      // Format as thousand
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount?.toString();
    }
  }

  const handleClickMessageSeller = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      const queryParams = {
        id: paidSearchAd.id,
        image1: paidSearchAd.image1,
        ad_name: paidSearchAd.ad_name,
        price: paidSearchAd.price,
      currency: paidSearchAd?.currency,
      sellerAvatarUrl,
        seller_username: paidSearchAd.seller_username,
        expiration_date: paidSearchAd.expiration_date,
        ad_rating: paidSearchAd.ad_rating,
      };

      history.push({
        pathname: `/paid/ad/message/${paidSearchAd.id}`,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    }
  };

  function formatNumber(number, decimalPlaces = 2) {
    const formattedNumber = parseFloat(number).toFixed(decimalPlaces);
    const parts = formattedNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <Row>
      <Col>
    <Card className="my-3 p-3 rounded">
      {paidSearchAdMessages.paidSearchAdSaveSuccess && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {paidSearchAdMessages.paidSearchAdRemoveSuccess && (
        <Message variant="danger">Item removed from favorites.</Message>
      )}
      {paidSearchAdMessages.paidSearchAdSaveError && (
        <Message variant="danger">{paidSearchAdMessages.paidSearchAdSaveError}</Message>
      )}
      {paidSearchAdMessages.paidSearchAdRemoveError && (
        <Message variant="danger">{paidSearchAdMessages.paidSearchAdRemoveError}</Message>
      )}

      {paidSearchAdLoading.paidSearchAdSaveLoading && <Loader />}
      {paidSearchAdLoading.paidSearchAdRemoveLoading && <Loader />}

      <Link onClick={viewProductHandler}>
        <Card.Img src={paidSearchAd.image1} />
      </Link>

      <Card.Body>
        <Link onClick={viewProductHandler} className="py-2">
          <Card.Title as="div">
            <strong>{paidSearchAd.ad_name}</strong>
          </Card.Title>
        </Link>

        <div className="d-flex justify-content-between py-2">
          <span>
            <Button
              variant="outline-success"
              size="sm"
              className="rounded"
              disabled
            >
              <i>Promoted</i>
            </Button>
          </span>

          <div>
            <span>
              {sellerAccount?.is_seller_verified ? (
                <>
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="rounded"
                    disabled
                  >
                    <i className="fas fa-user-check"></i> <i>Verified ID</i>{" "}
                    <i
                      className="fas fa-check-circle"
                      style={{ fontSize: "18px", color: "blue" }}
                    ></i>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded"
                    disabled
                  >
                    <i className="fas fa-user"></i> <i>ID Not Verified</i>{" "}
                    <i
                      // className="fas fa-check-circle"
                      style={{ fontSize: "18px", color: "red" }}
                    ></i>
                  </Button>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div as="div">
            <div className="py-2">
              <RatingSeller
                value={paidSearchAd.rating}
                text={`${formatCount(paidSearchAd?.num_reviews)} reviews `}
                color={"green"}
              />

              {userInfo ? (
                <Link to={`/review-list/${paidSearchAd.id}`}>(Seller Reviews)</Link>
              ) : (
                <Link onClick={() => history.push("/login")}>
                  (Seller Reviews)
                </Link>
              )}
            </div>
          </div>

          <Card.Text as="div" className="py-2">
            <span className="text-right" onClick={viewProductHandler}>
              <i className="fas fa-eye"></i>{" "}
              {formatCount(paidSearchAd?.ad_view_count)} views
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between">
          <Card.Text as="h5" className="py-2">
            <span>
               {formatNumber(paidSearchAd?.price)} {paidSearchAd?.currency}{" "}
             {paidSearchAd?.usd_price ? <span> / {paidSearchAd?.usd_price} USD </span> : <></>}{" "}
              {paidSearchAd?.is_price_negotiable ? <i>(Negotiable)</i> : <></>}
            </span>
          </Card.Text>
        </div>

        <div className="d-flex justify-content-end">
          <span className="py-2">
            {paidSearchAd?.promo_code ? (
              <Button
                variant="outline-primary"
                size="sm"
                className="py-2 rounded"
                disabled
              >
                <i>
                  Promo Code: {paidSearchAd?.promo_code}{" "}
                  {paidSearchAd?.discount_percentage}% Off
                </i> 
              </Button> 
            ) : (
              <></>
            )}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="py-2">
            <Button
              variant="outline-danger"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-clock"></i> Expires in:{" "}
              <PromoTimer expirationDate={paidSearchAd?.expiration_date} />
            </Button>
          </span>
        </div>

        <div className="d-flex justify-content-between py-2">
          <span className="py-2">
            <Button
              variant="primary"
              size="sm"
              className="py-2 rounded"
              onClick={handleClickMessageSeller}
            >
              <i className="fa fa-message"></i> Message Seller
            </Button>
          </span>

          <span className="py-2">
            <Button
              onClick={toggleFavoriteHandler}
              className="py-2 rounded"
              type="button"
              variant={paidSearchAdSaved ? "danger" : "outline-danger"}
            >
              <div className="mt-auto">
                <i
                  className={paidSearchAdSaved ? "fas fa-heart" : "far fa-heart"}
                ></i>{" "}
                {paidSearchAdSaved ? "Saved" : "Save"}{" "}
                <span className="text-muted">({formatCount(totalSaves)})</span>
              </div>
            </Button>
          </span>
        </div>
        <div className="d-flex justify-content-between py-2">
          <span>
            <Button
              variant="outline-transparent"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-map-marker-alt"></i> {paidSearchAd?.city} {paidSearchAd?.state_province}, {paidSearchAd?.country}.
            </Button>
          </span>

          <span>
            <Button
              variant="danger"
              size="sm"
              className="rounded py-2"
              onClick={handleReportAdOpen}
              // disabled
            >
              <i className="fa fa-flag"></i> Report Ad 
            </Button>
          </span>
        </div>
      </Card.Body>
    </Card>
    <div className="d-flex justify-content-center py-2">
          <Modal show={reportAdModal} onHide={handleReportAdClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100 py-2">
                Report Ad
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {reportAdModal && <ReportPaidAd adId={paidSearchAd?.id} />}
            </Modal.Body>
          </Modal>
        </div>
    </Col>
    </Row>
  );
}

export default SearchPaidAdCard;
