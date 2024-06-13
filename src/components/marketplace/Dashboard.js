// Dashboard.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faEye,
  faHeart,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  getSellerAdStatistics,
  getSellerDetail,
} from "../../actions/marketplaceSellerActions";
// import { Line, Pie } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   BarElement,
//   PointElement,
//   Title,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LineElement,
//   LinearScale,
//   BarElement,
//   Title,
//   PointElement
// );
import Message from "../Message";
import Loader from "../Loader";

function Dashboard() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const getSellerAdStatState = useSelector(
    (state) => state.getSellerAdStatState
  );
  const {
    loading,
    error,
    totalSellerAdsViews,
    totalSellerAdSaved,
    totalFollwersCount,
  } = getSellerAdStatState;

  // const getSellerDetailState = useSelector(
  //   (state) => state.getSellerDetailState
  // );
  // const { sellerDetail } = getSellerDetailState;

  useEffect(() => {
    dispatch(getSellerAdStatistics());
    dispatch(getSellerDetail());
  }, [dispatch]);

  return (
    <div className="d-flex justify-content-center text-center">
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <h2 className="py-3">
                <FontAwesomeIcon icon={faDashboard} /> Dashboard (Seller)
              </h2>
              <div>
                <div>
                  <div>
                    <FontAwesomeIcon icon={faEye} /> Total Views:{" "}
                    {totalSellerAdsViews}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faHeart} /> Total Likes:{" "}
                    {totalSellerAdSaved}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faPeopleGroup} /> Total Followers:{" "}
                    {totalFollwersCount}
                  </div>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
