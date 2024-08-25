// SoldCpsToSellangle.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { getAllSellCpsToSellangle } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { formatAmount } from "../FormatAmount";
import SellangleFulfilledCps from "./SellangleFulfilledCps";

function SoldCpsToSellangle() {
  const dispatch = useDispatch();

  const getAllSellCpsToSellangleState = useSelector(
    (state) => state.getAllSellCpsToSellangleState
  );
  const { loading, creditPoints, error } = getAllSellCpsToSellangleState;
  console.log("GetSellCpsToSellangle:", creditPoints);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo.access:", userInfo.access);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditPoints?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getAllSellCpsToSellangle());
  }, [dispatch]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [CheckoutCpsModal, setCheckoutCpsModal] = useState(false);
  const handleCheckoutCpsOpen = (cps) => {
    setSelectedOption(cps);
    console.log("id:", cps?.id);
    setCheckoutCpsModal(true);
  };
  const handleCheckoutCpsClose = () => {
    setCheckoutCpsModal(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-credit-card"></i> Sold CPS To Sellangle
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
                  Sold CPS to Sellangle appear here.
                </div>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Fulfilled</th>
                      <th>CPS ID</th>
                      <th>CPS Checkout Link</th>
                      <th>Seller</th>
                      <th>Buyer</th>
                      <th>Amount</th>
                      <th>CPS Amount</th>
                      <th>Paysofter Seller ID</th>
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
                        <td>
                          {cps.is_fulfilled ? (
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
                        <td>{cps.cps_sell_id}</td>
                        <td>
                          <div className="py-2"> {cps.cps_checkout_link}</div>
                          {cps.is_fulfilled ? (
                            <>
                              <td>{cps.paysofter_promise_id}</td>
                            </>
                          ) : (
                            <>
                              <div className="py-2">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleCheckoutCpsOpen(cps)}
                                >
                                  Checkout CPS
                                </Button>
                              </div>
                            </>
                          )}
                        </td>
                        <td>{cps.seller_username}</td>
                        <td>{cps.buyer_username}</td>
                        <td style={{ color: "green" }}>
                          {formatAmount(cps.amount)} {cps.currency}
                        </td>
                        <td style={{ color: "red" }}>
                          {formatAmount(cps.cps_amount)}
                        </td>
                        <td>{cps.paysofter_seller_id}</td>
                        <td>{formatAmount(cps.seller_old_bal)}</td>
                        <td>{formatAmount(cps.seller_new_bal)}</td>
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
                totalItems={creditPoints.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}

          <Modal show={CheckoutCpsModal} onHide={handleCheckoutCpsClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100 py-2">
                Fulfil CPS
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {CheckoutCpsModal && (
                <SellangleFulfilledCps
                  cpsId={selectedOption?.id}
                  amount={selectedOption?.amount}
                  currency={selectedOption?.currency}
                  cps_amount={selectedOption?.cps_amount}
                  seller_username={selectedOption?.seller_username}
                />
              )}
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default SoldCpsToSellangle;
