// GetAdCpsCharges.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Container } from "react-bootstrap";
import { getAdCpsCharges } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { formatAmount } from "../FormatAmount";

function GetAdCpsCharges() {
  const dispatch = useDispatch();

  const getAdCpsChargesState = useSelector(
    (state) => state.getAdCpsChargesState
  );
  const { loading, adCpsCharges, error } = getAdCpsChargesState;
  console.log("adCpsCharges:", adCpsCharges);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adCpsCharges?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getAdCpsCharges());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-credit-card"></i> CPS Ad Charges
          </h1>
          <hr />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  {" "}
                  Ad cps charges appear here.
                </div>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>CPS Charges ID</th>
                      <th>User</th>
                      <th>CPS Charged</th>
                      <th>Old Balance</th>
                      <th>New Balance</th>
                      <th>Success</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((cps, index) => (
                      <tr key={cps.id}>
                        <td>{index + 1}</td>
                        <td>{cps.ad_charge_cps_id}</td>
                        <td>{cps.username}</td>
                        <td style={{ color: "red" }}>
                          {formatAmount(cps.cps_amount)}
                        </td>
                        <td>{formatAmount(cps.old_bal)}</td>
                        <td>{formatAmount(cps.new_bal)}</td>
                        <td>
                          {cps.is_success ? (
                            <>
                              <i
                                className="fas fa-check-circle"
                                style={{ fontSize: "16px", color: "green" }}
                              ></i>{" "}
                              Yes
                            </>
                          ) : (
                            <>
                              <i
                                className="fas fa-times-circle"
                                style={{ fontSize: "16px", color: "red" }}
                              ></i>{" "}
                              No
                            </>
                          )}
                        </td>
                        <td>
                          {new Date(cps.created_at).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={adCpsCharges?.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default GetAdCpsCharges;
