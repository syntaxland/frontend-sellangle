// GetBuyerPaidAdMessages.js
import React, { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
  // useHistory
} from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { listBuyerFreeAdMessages } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function GetBuyerPaidAdMessages() {
  const dispatch = useDispatch();
  // const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const listBuyerFreeAdMessagesState = useSelector(
    (state) => state.listBuyerFreeAdMessagesState
  );
  const { loading, freeAdMessages, error } = listBuyerFreeAdMessagesState;
  console.log("freeAdMessages:", freeAdMessages);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = freeAdMessages?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(listBuyerFreeAdMessages());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center py-3">
            <i className="fas fa-envelope"></i> Seller Inbox
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <div className="text-center py-3">
                  Seller inbox messages appear here.
                </div>
              ) : (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-sm py-2 rounded"
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Ad ID</th>
                      <th>Buyer</th>
                      <th>Message</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((ad, index) => (
                      <tr key={ad.id} className="rounded">
                        <td>{index + 1}</td>
                        <td>{ad.id}</td>
                        <td>{ad.buyer}</td>
                        <td>{ad.message}</td>
                        <td>
                          {new Date(ad.timestamp).toLocaleString("en-US", {
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
                          <Button variant="outline-primary" size="sm">
                            <Link
                              to={`/free/ad/message/${ad.ad_id}`}
                              style={{ textDecoration: "none" }}
                            >
                              Message Buyer
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={freeAdMessages?.length}
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

export default GetBuyerPaidAdMessages;
