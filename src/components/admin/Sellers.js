// Sellers.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Row,
  Col,
  Container,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { getAllSellers } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import SellerAccountDetail from "./SellerAccountDetail";

function Sellers() {
  const dispatch = useDispatch();

  const getAllSellersState = useSelector((state) => state.getAllSellersState);
  const { loading, sellers, error } = getAllSellersState;
  console.log("sellers:", sellers);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sellers
    ? sellers?.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const [selectedSeller, setSelectedSeller] = useState(null);
  const [verifySellerModal, setVerifySellerModal] = useState(false);
  const handleVerifySellerOpen = (seller) => {
    setSelectedSeller(seller);
    console.log("seller:", seller.username);
    setVerifySellerModal(true);
  };
  const handleVerifySellerClose = () => {
    setVerifySellerModal(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center py-3">
            <i className="fas fa-users"></i> Sellers
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">Sellers appear here.</div>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Seller Status</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Last Login</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((seller, index) => (
                      <tr key={seller.id}>
                        <td>{index + 1}</td>

                        <td className="text-center">
                          <td>
                            {seller.is_seller_account_verified ? (
                              <ListGroup className="text-center py-2">
                                <ListGroup.Item>
                                  <span style={{ color: "green" }}>
                                    Verified
                                    <i
                                      className="fas fa-check-circle"
                                      style={{
                                        fontSize: "16px",
                                        color: "green",
                                      }}
                                    ></i>
                                  </span>
                                </ListGroup.Item>
                              </ListGroup>
                            ) : (
                              <div>
                                <p style={{ color: "red" }}>
                                  <i
                                    className="fas fa-times-circle"
                                    style={{ fontSize: "16px", color: "red" }}
                                  ></i>{" "}
                                  Seller Not Verified
                                </p>

                                <div className="py-2">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() =>
                                      handleVerifySellerOpen(seller)
                                    }
                                  >
                                    Verfiy Seller
                                  </Button>
                                </div>
                              </div>
                            )}
                          </td>
                        </td>
                        <td>{seller.username}</td>
                        <td>{seller.email}</td>
                        <td>{seller.first_name}</td>
                        <td>{seller.last_name}</td>
                        <td>{seller.phone_number}</td>
                        <td>
                          {new Date(seller.last_login).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </td>

                        <td>
                          {new Date(seller.created_at).toLocaleString("en-US", {
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
              <div className="py-2">
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={sellers.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </div>
            </>
          )}

          <Modal show={verifySellerModal} onHide={handleVerifySellerClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100 py-2">
                Verify Seller
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {verifySellerModal && (
                <SellerAccountDetail
                  seller_username={selectedSeller?.username}
                />
              )}
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default Sellers;
