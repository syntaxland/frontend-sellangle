// Paysofter.js
import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import PaysofterButton from "./PaysofterButton";
import ApplyPromoCode from "../ApplyPromoCode";
import LoaderPaysofter from "../LoaderPaysofter";
import Message from "../Message";
import "./Paysofter.css"; 
import {formatAmount} from "../FormatAmount";

function Paysofter({
  // ads,
  buyerEmail,
  amount,
  sellerApiKey,
  currency,
  usdPrice,
  reference,
  order_id,
  totalPrice,
  taxPrice,
  userEmail,
  adsPrice,
  finalItemsPrice,
  promoDiscount,
  discountPercentage,
  promoTotalPrice,
  paysofterPublicKey,
}) {
  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { loading, error } = paymentCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { ads } = getPaidAdDetailState;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const createdAt = new Date().toISOString();

  const paymentData = {
    reference: reference,
    order_id: order_id,
    amount: totalPrice,
    email: userEmail,

    ads_amount: adsPrice,
    final_ads_amount: finalItemsPrice,
    promo_code_discount_amount: promoDiscount,
    promo_code_discount_percentage: discountPercentage,
    final_total_amount: promoTotalPrice,
  };


  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col md={6}>
            <h1 className="text-center py-3">Paysofter Promise Option</h1>
            {loading && <LoaderPaysofter />}
            {error && <Message variant="danger">{error}</Message>}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                    <img
                      src={ads?.image1}
                      alt={ads?.ad_name}
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={8}>
                    <p>{ads?.ad_name}</p>
                    {/* <p>
                        {ads?.qty} x NGN {ads?.ad_price} = NGN{" "}
                        {ads?.qty * ads?.ad_price}
                      </p> */}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                <p>Ad Name: {ads?.ad_name}</p>
              </ListGroup.Item> */}

              {/* <ListGroup.Item>
                Tax: NGN{" "}
                {taxPrice?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </ListGroup.Item> */}

              <ListGroup.Item>
                Total Amount:{" "}
                {formatAmount(ads?.price)
                
                // ?.toLocaleString(undefined, {
                //   minimumFractionDigits: 2, 
                //   maximumFractionDigits: 2,
                // })
                
                }{" "}{currency}
              </ListGroup.Item>

              <ListGroup.Item>
                Promo Discount: {" "}
                {promoDiscount ? (
                  <span>
                    {formatAmount(promoDiscount)
                    
                    // ?.toLocaleString(undefined, {
                    //   minimumFractionDigits: 2,
                    //   maximumFractionDigits: 2,
                    // })
                    
                    }{" "}{currency}
                    ({discountPercentage}%)
                  </span>
                ) : (
                  <span>0</span>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                Final Total Amount: {currency}{" "}
                {promoTotalPrice ? (
                  <span>
                    {formatAmount(promoTotalPrice)
                    
                    // ?.toLocaleString(undefined, {
                    //   minimumFractionDigits: 2,
                    //   maximumFractionDigits: 2,
                    // })
                    
                    }{" "}{currency}
                  </span>
                ) : (
                  <span>
                    {formatAmount(totalPrice)
                    
                    // ?.toLocaleString(undefined, {
                    //   minimumFractionDigits: 2,
                    //   maximumFractionDigits: 2,
                    // })
                    
                    }
                  </span>
                )}
              </ListGroup.Item>

              <ListGroup.Item>Timestamp: {createdAt}</ListGroup.Item>
            </ListGroup>
            <div className="text-center py-2">
              <ApplyPromoCode order_id={order_id} />
            </div>

            <div>
              <PaysofterButton
                showPaymentModal={showPaymentModal}
                setShowPaymentModal={setShowPaymentModal}
                paymentData={paymentData}
                reference={reference}
                buyerEmail={buyerEmail}
                currency={currency}
                usdPrice={usdPrice}
                amount={amount}
                sellerApiKey={sellerApiKey}
              />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paysofter;
