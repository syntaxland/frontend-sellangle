// PromoProduct.js
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listPromoProducts } from "../actions/promoActions";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";

const PromoProduct = () => {
  const dispatch = useDispatch();

  const promoProductList = useSelector((state) => state.promoProductList);
  const { loading, error, promoProducts } = promoProductList;
  console.log("promoProducts:", promoProducts);

  useEffect(() => {
    dispatch(listPromoProducts());
  }, [dispatch]);

  return (
    <div className="promo-products">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {promoProducts.map((product) => (
              <Col key={product._id} xs={12} sm={12} md={6} lg={4} xl={4}> 
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default PromoProduct;
