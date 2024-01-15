// SearchScreen.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import Product from "../Product";
import { searchProducts } from "../../actions/productAction";
import Message from "../Message";
import Loader from "../Loader";

function SearchScreen({ match }) { 
  const dispatch = useDispatch();
  const keyword = match.params.keyword;

  const productList = useSelector((state) => state.productList); 
  const { loading, error, products } = productList;

  const [category, setCategory] = useState("");
  // const [sortOrder, setSortOrder] = useState("");
  const [sortOrder, setSortOrder] = useState("createdAt");
  const [brand, setBrand] = useState(""); // New state for brand filter
  const [priceRange, setPriceRange] = useState(""); // New state for priceRange filter
  const [rating, setRating] = useState(""); // New state for rating filter

  // useEffect(() => {
  //   dispatch(
  //     searchProducts(keyword, category, brand, priceRange, rating, sortOrder)
  //   );
  // }, [dispatch, keyword, category, brand, priceRange, rating, sortOrder]);

  useEffect(() => {
    dispatch(
      searchProducts(keyword)
    );
  }, [dispatch, keyword]);

  console.log(
    "keyword, category, brand, priceRange, rating, sortOrder:",
    keyword,
    // category,
    // brand,
    // priceRange,
    // rating,
    // sortOrder
  );

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <Container>
      <h1>Search Results for "{keyword}"</h1>

      <Row>
        <Col md={4}>
          <i className="fa fa-filter"></i>
          <Form.Control
            as="select"
            onChange={handleCategoryChange}
            value={category}
          >
            <option value="">Filter by Category</option>
            <option value="Shower">Shower</option>
            <option value="Basins">Basins</option>
          </Form.Control>
        </Col>

        <Col md={4}>
          <i className="fa fa-angle-down"></i>
          <Form.Control
            as="select"
            onChange={handleSortOrderChange}
            value={sortOrder}
          >
            <option value="">Sort by</option>
            <option value="-createdAt">Latest</option>
            <option value="createdAt">Oldest</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="-price">Highest Price First</option>{" "}
            {/* Add option for Highest Price First */}
            <option value="price">Lowest Price First</option>{" "}
            {/* Add option for Lowest Price First */}
          </Form.Control>
        </Col>

        <Col md={4}>
          <i className="fa fa-angle-down"></i>
          <Form.Control as="select" onChange={handleBrandChange} value={brand}>
            <option value="">Filter by Brand</option>
            <option value="Shower">Shower</option>
            <option value="Basins">Basins</option>
          </Form.Control>
        </Col>

        <Col md={4}>
          <i className="fa fa-angle-down"></i>
          <Form.Control
            as="select"
            onChange={handlePriceRangeChange}
            value={priceRange}
          >
            <option value="">Filter by Price Range</option>
            <option value="100-10000">NGN 100 - 10k</option>
            <option value="10001-50000">NGN 10.1k - 50k</option>
            <option value="50001-100000">NGN 50.1k - 100k</option>
            <option value="100001-500000">NGN 100.1k - 500k</option>
            <option value="500001-10000000">NGN 500.1k and above</option>
          </Form.Control>
        </Col>
        <Col md={4}>
          <i className="fa fa-angle-down"></i>
          <Form.Control
            as="select"
            onChange={handleRatingChange}
            value={rating}
          >
            <option value="">Filter by Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length === 0 ? (
        <Message variant="danger">No products found for "{keyword}"</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default SearchScreen;


// import React, { useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Product from "../Product";

// const API_URL = process.env.REACT_APP_API_URL;

// function SearchScreen() {
//   const { keyword } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(
//           `${API_URL}/api/products/search/?search=${keyword}`
//         );
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [keyword]);

//    return (
//     <div>
//       <h1>Search Results for "{keyword}"</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <Row>
//           {products.map((product) => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               <Product product={product} />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// }

// export default SearchScreen;
