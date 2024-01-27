// AllFreeAdCard.js
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RatingSeller from "../RatingSeller";
import {
  saveProduct,
  removeProduct,
  updateProductSaveCount, 
  // trackProductView,
} from "../../actions/productAction";
import { getSellerAccount, 
  getFreeAdDetail,
  // toggleFreeAdSave, 
  trackFreeAdView,
//   getUserFreeAdsViews,
// getUserSavedFreeAds,
} from "../../actions/marketplaceSellerActions";
// import { getFreeAdDetail } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import PromoTimer from "../PromoTimer";
import ReportFreeAd from "./ReportFreeAd";
import {formatAmount} from "../FormatAmount";

function AllFreeAdCard({ product }) {
  const dispatch = useDispatch();

  const getFreeAdDetailState = useSelector(
    (state) => state.getFreeAdDetailState
  );
  const { sellerAvatarUrl } = getFreeAdDetailState;

  const [productSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(product?.ad_save_count); 

  const [productMessages, setProductMessages] = useState({
    productSaveSuccess: false,
    productRemoveSuccess: false,
    productSaveError: null,
    productRemoveError: null,
  });

  const [productLoading, setProductLoading] = useState({
    productSaveLoading: false,
    productRemoveLoading: false,
  });

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getSellerAccountState = useSelector(
    (state) => state.getSellerAccountState
  );
  const { sellerAccount } = getSellerAccountState;
  console.log("is_seller_verified", sellerAccount?.is_seller_verified);
  // console.log("ad_view_count", product?.ad_view_count);

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
    const pk = product.id;
    if (userInfo) {
      dispatch(getSellerAccount());
      dispatch(getFreeAdDetail(pk));
    }
  }, [dispatch, userInfo, product.id]);

  useEffect(() => {
    if (
      userInfo &&
      userInfo.favorite_products &&
      userInfo.favorite_products.includes(product.id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, product.id]);

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (productSaved) {
        setProductLoading({ productRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, product.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveSuccess: true,
              productSaveSuccess: false,
              productRemoveError: null,
              productSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            const updatedSaveCount = product?.ad_save_count - 1;
            dispatch(updateProductSaveCount(product.id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productRemoveSuccess: false,
              productSaveSuccess: false,
              productSaveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productRemoveLoading: false });
          });
      } else {
        setProductLoading({ productSaveLoading: true });
        dispatch(saveProduct(userInfo.id, product.id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveSuccess: true,
              productRemoveSuccess: false,
              productSaveError: null,
              productRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1);
            const updatedSaveCount = product?.ad_save_count + 1;
            dispatch(updateProductSaveCount(product.id, updatedSaveCount));
          })
          .catch((error) => {
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productSaveSuccess: false,
              productRemoveSuccess: false,
              productRemoveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productSaveLoading: false });
          });
      }
    }
    setTimeout(() => {
      setProductMessages((prevState) => ({
        ...prevState,
        productSaveSuccess: false,
        productRemoveSuccess: false,
      }));
    }, 3000);
  };

  const adData = {
    ad_id: product.id,
  }

  const viewProductHandler = () => {
    if (!userInfo) {
      history.push("/login");
    }
    
    dispatch(trackFreeAdView(adData));

    history.push(`/free-ad-detail/${product.id}`);
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
        id: product.id,
        image1: product.image1,
        ad_name: product.ad_name,
        price: product.price,
      currency: product?.currency,
      sellerAvatarUrl,
        seller_username: product.seller_username,
        expiration_date: product.expiration_date,
        ad_rating: product.ad_rating,
      };

      history.push({
        pathname: `/free/ad/message/${product.id}`,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    }
  };

  return (
    <Row>
      <Col>
        <Card className="my-3 p-3 rounded">
          {productMessages.productSaveSuccess && (
            <Message variant="success">Item added to favorites.</Message>
          )}
          {productMessages.productRemoveSuccess && (
            <Message variant="danger">Item removed from favorites.</Message>
          )}
          {productMessages.productSaveError && (
            <Message variant="danger">
              {productMessages.productSaveError}
            </Message>
          )}
          {productMessages.productRemoveError && (
            <Message variant="danger">
              {productMessages.productRemoveError}
            </Message>
          )}

          {productLoading.productSaveLoading && <Loader />}
          {productLoading.productRemoveLoading && <Loader />}

          <Link onClick={viewProductHandler}>
            <Card.Img src={product.image1} />
          </Link>

          <Card.Body>
            <div className="d-flex justify-content-between py-2">
              <Link onClick={viewProductHandler}>
                <Card.Title as="div">
                  <strong>{product.ad_name}</strong>
                </Card.Title>
              </Link>
            </div>

            <div className="d-flex justify-content-end">
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
                        <i>ID Not Verified</i>{" "}
                        <i
                          // className="fas fa-times"
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
                    value={product.rating}
                    text={`${formatCount(product?.num_reviews)} reviews `}
                    color={"green"}
                  />

                  {userInfo ? (
                    <Link to={`/review-list/${product.id}`}>
                      (Seller Reviews)
                    </Link>
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
                  {formatCount(product?.ad_view_count)} views
                </span>
              </Card.Text>
            </div>

            <div className="d-flex justify-content-between py-2">
              <Card.Text as="h5" className="py-2">
                <span>
                  {formatAmount(product?.price)} {product?.currency}{" "}
                  {/* {product?.usd_price ? (
                <span> / {product?.usd_price} USD </span> 
              ) : (
                <></>
              )} */}
                  {product?.is_price_negotiable ? <i>(Negotiable)</i> : <></>}
                </span>
              </Card.Text>
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
                  <PromoTimer expirationDate={product?.expiration_date} />
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
                  variant={productSaved ? "danger" : "outline-danger"}
                >
                  <div className="mt-auto">
                    <i
                      className={productSaved ? "fas fa-heart" : "far fa-heart"}
                    ></i>{" "}
                    {productSaved ? "Saved" : "Save"}{" "}
                    <span className="text-muted">
                      ({formatCount(totalSaves)})
                    </span>
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
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {product?.city ? product?.city : ""}{" "}
                  {product?.state_province ? product?.state_province : ""},{" "}
                  {product?.country ? product?.country : ""}.
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
              <span className="d-flex justify-content-center py-2">
                {reportAdModal && <ReportFreeAd adId={product?.id} />}
              </span>
            </Modal.Body>
          </Modal>
        </div>
      </Col>
    </Row>
  );
}

export default AllFreeAdCard;
