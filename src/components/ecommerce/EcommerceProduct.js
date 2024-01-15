// EcommerceProduct.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// import Product from "../Product";
// import { listProducts } from "../../actions/productAction";
// import Loader from "../Loader";
// import Message from "../Message";
import PromoProductScroll from "../PromoProductScroll";

function EcommerceProduct() {
  const dispatch = useDispatch();



  return (
    <div>
      <Row>
        <Col>

        

          <div>
            <hr />
            <h1 className="text-center py-3">Hot Deals</h1>
            <hr />
            <PromoProductScroll />
            
          </div>

          <div>
            <hr />
            <h1 className="text-center py-3">Categories</h1>
            <hr />
            <PromoProductScroll />
            
          </div>

          <div>
            <hr />
            <h1 className="text-center py-3">Categories</h1>
            <hr />
            <PromoProductScroll />
            
          </div>

          

          <hr />

        </Col>
      </Row>
    </div>
  );
}

export default EcommerceProduct;
