// PromoProductScroll.js
import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listPromoProducts } from "../actions/promoActions";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import "./PromoProductScroll.css";

const PromoProductScroll = () => {
  const dispatch = useDispatch();

  const promoProductList = useSelector((state) => state.promoProductList);
  const { loading, error, promoProducts } = promoProductList;

  useEffect(() => {
    dispatch(listPromoProducts());
  }, [dispatch]);

  // Refs for scroll container and scroll buttons
  // const scrollContainerRef = useRef(null);

  // const scrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollLeft -= 200;
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollLeft += 200;
  //   }
  // };

  return (
    <div className="horizontal-scroll-container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {/* <div className="scroll-buttons">
            <button onClick={scrollLeft}>{"<"}</button>
          </div> */}
          
          {promoProducts.length === 0 ? (
            <div className="no-promo-products-message text-center">
              Running offers appear here.
            </div>
          ) : (
            // <div className="horizontal-scroll" ref={scrollContainerRef}>
            <div>
              <Row>
                {promoProducts.map((product) => (
                  <Col key={product._id} xs={12} sm={12} md={6} lg={3} xl={3}> 
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </div> 
          )}

          {/* <div className="scroll-buttons">
            <button onClick={scrollRight}>{">"}</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PromoProductScroll;

// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Col } from "react-bootstrap";
// import { listPromoProducts } from "../actions/promoActions";
// import Product from "./Product";
// import Loader from "./Loader";
// import Message from "./Message";
// import "./PromoProductScroll.css";

// const PromoProductScroll = () => {
//   const dispatch = useDispatch();

//   const promoProductList = useSelector((state) => state.promoProductList);
//   const { loading, error, promoProducts } = promoProductList;

//   useEffect(() => {
//     dispatch(listPromoProducts());
//   }, [dispatch]);

//   // Refs for scroll container
//   const scrollContainerRef = useRef(null);

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollLeft -= 10; // Adjust scroll distance as needed
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollLeft += 10; // Adjust scroll distance as needed
//     }
//   };

//   return (
//     <div className="horizontal-scroll-container">
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div>
//           <div className="scroll-buttons">
//             <button onClick={scrollLeft}>{"<"}</button>
//           </div>
//           <div className="horizontal-scroll" ref={scrollContainerRef}>
//             <Row>
//               {promoProducts.map((product) => (
//                 <Col key={product._id} xs={12} sm={12} md={6} lg={3} xl={3}>
//                   <Product product={product} />
//                 </Col>
//               ))}
//             </Row>
//           </div>
//           <div className="scroll-buttons">
//             <button onClick={scrollRight}>{">"}</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PromoProductScroll;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Col } from "react-bootstrap";
// import { listPromoProducts } from "../actions/promoActions";
// import Product from "./Product";
// import Loader from "./Loader";
// import Message from "./Message";
// import "./PromoProductScroll.css";

// const PromoProductScroll = () => {
//   const dispatch = useDispatch();

//   const promoProductList = useSelector((state) => state.promoProductList);
//   const { loading, error, promoProducts } = promoProductList;

//   useEffect(() => {
//     dispatch(listPromoProducts());
//   }, [dispatch]);

//   return (
//     <div className="horizontal-scroll-container">
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Row className="horizontal-scroll">
//           {promoProducts.map((product) => (
//             <Col key={product._id} xs={12} sm={12} md={6} lg={4} xl={4}>
//               <Product product={product} />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default PromoProductScroll;
