// Dashboard.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { getCreditPointBalance } from "../../actions/creditPointActions";
// import { listPayments } from "../../actions/paymentActions";
// import { getOrders } from "../../actions/orderActions";
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

function Dashboard() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const creditPointBal = useSelector((state) => state.creditPointBal);
  const { loading, error, creditPointBalance } = creditPointBal;
  console.log("creditPointBalance:", creditPointBalance);

  useEffect(() => {
    dispatch(getCreditPointBalance());
  }, [dispatch]);

  return (
    <div className="justify-content-center text-center">
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <h2 className="py-3">
                <i className="fas fa-dashboard"></i> Dashboard (Seller)
              </h2>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
