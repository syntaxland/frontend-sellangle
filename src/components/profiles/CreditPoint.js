// CreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import {
  getCreditPointList,
  getUserCreditPointPayments,
  getCreditPointEarnings,
} from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";
import CreditPointEarning from "./CreditPointEarning";
import GetBuyCreditPoint from "../CreditPoint/GetBuyCreditPoint"; 
import GetUsdBuyCreditPoint from "../CreditPoint/GetUsdBuyCreditPoint"; 
import GetSellCreditPoint from "../CreditPoint/GetSellCreditPoint";
import GetBuyerCreditPoint from "../CreditPoint/GetBuyerCreditPoint";

const CreditPoint = () => {
  const dispatch = useDispatch();
  // const creditPointList = useSelector((state) => state.creditPointList);
  // const { loading, creditPointRequests, error } = creditPointList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const userCreditPointPayments = useSelector(
    (state) => state.userCreditPointPayments
  );
  const {
    loading: creditPointPaymentsLoading,
    creditPointPayments,
    error: creditPointPaymentsError,
  } = userCreditPointPayments;
  // console.log("User creditPointPayments:", creditPointPayments);
  // console.log("User creditPointRequests:", creditPointRequests);
  // console.log();

  useEffect(() => {
    dispatch(getCreditPointList());
    dispatch(getUserCreditPointPayments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCreditPointEarnings());
  }, [dispatch]);

  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePayments, setCurrentPagePayments] = useState(1);

  const itemsPerPage = 5;

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = creditPointRequests.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  const indexOfLastItemPayments = currentPagePayments * itemsPerPage;
  const indexOfFirstItemPayments = indexOfLastItemPayments - itemsPerPage;
  const currentItemsPayments = creditPointPayments.slice(
    indexOfFirstItemPayments,
    indexOfLastItemPayments
  );

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginatePayments = (pageNumber) => setCurrentPagePayments(pageNumber);

  // const totalPages = Math.ceil(creditPointRequests.length / itemsPerPage);
  const totalPagesPayments = Math.ceil(
    creditPointPayments.length / itemsPerPage
  );

  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageNumbersPayments = Array.from(
    { length: totalPagesPayments },
    (_, i) => i + 1
  );

  return (
    <>
      <Row>
        <div className="justify-content-md-center">
          <Col>
          <div>
              <GetUsdBuyCreditPoint />
            </div>

            <div>
              <GetBuyCreditPoint />
            </div>

            <div>
              <GetSellCreditPoint />
            </div>

            <div>
              <GetBuyerCreditPoint />
            </div>

            <div>
              <CreditPointEarning />
            </div>

            <div>
              <h1 className="text-center py-3">Referral Bonus Point</h1>
              <hr />

              {creditPointPaymentsLoading ? (
                <Loader />
              ) : creditPointPaymentsError ? (
                <Message variant="danger">{creditPointPaymentsError}</Message>
              ) : (
                <>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Referrer</th>
                        <th>Referred User</th>
                        {/* <th>Order ID</th> */}
                        {/* <th>Credit Points Earned</th> */}
                        <th>Referral Bonus</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItemsPayments?.map((payment, index) => (
                        <tr key={payment.id}>
                          <td>{index + 1}</td>
                          <td>
                            {payment.referrer_first_name}{" "}
                            {payment.referrer_last_name}
                          </td>
                          <td>
                            {payment.referred_first_name}{" "}
                            {payment.referred_last_name}
                          </td>
                          {/* <td>{payment.order_id}</td> */}
                          {/* <td style={{ color: "green" }}>{payment.credit_points_earned}</td> */}
                          <td style={{ color: "green" }}>
                            {payment.referral_credit_points_bonus}
                          </td>
                          <td>
                            {new Date(payment.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          currentPagePayments === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            paginatePayments(currentPagePayments - 1)
                          }
                        >
                          Previous
                        </button>
                      </li>
                      {pageNumbersPayments.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            currentPagePayments === number ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginatePayments(number)}
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPagePayments === totalPagesPayments
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            paginatePayments(currentPagePayments + 1)
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </>
              )}
            </div>

           
            <hr />
          </Col>
        </div>
      </Row>
    </>
  );
};

export default CreditPoint;
