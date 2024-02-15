// Billing.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Col, Row, Container, Button } from "react-bootstrap";
import { getSellerPaidAdCharges } from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import AdChargeCalculator from "./AdChargeCalculator";

function Billing() {
  const dispatch = useDispatch();

  const getSellerPaidAdChargesState = useSelector(
    (state) => state.getSellerPaidAdChargesState
  );
  const {
    loading,
    error,
    paidAdCharges,
    totalAdCharges,
  } = getSellerPaidAdChargesState;
  console.log("paidAdCharges:", paidAdCharges);
  console.log("totalAdCharges:", totalAdCharges);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paidAdCharges?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getSellerPaidAdCharges());
  }, [dispatch]);

  return (
    <Container>
      <Row className="py-2 d-flex justify-content-center">
        <Col>
          <h1 className="text-center py-2">Billing</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems?.length === 0 ? (
                <div className="text-center py-3">Ad charges appear here.</div>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>User</th>
                      <th>Ad</th>
                      <th>Ad Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((adCharge, index) => (
                      <>
                        <tr key={adCharge.id}>
                          <td>{index + 1}</td>
                          <td>{adCharge.username}</td>
                          <td>{adCharge.ad_name}</td>
                          <td>
                            {adCharge.ad_charges} CPS (
                            {adCharge.ad_charge_hours} hours)
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>
              )}
              <>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    variant="outline-transparent"
                    //   size="sm"
                    className="rounded w-100"
                    disabled
                  >
                    <strong>
                      Total Ad Charges: {totalAdCharges?.total_ad_charges} (
                      {totalAdCharges?.total_ad_charge_hours} hours)
                    </strong>
                  </Button>
                </div>

                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={paidAdCharges?.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            </>
          )}
        </Col>
      </Row>
      <AdChargeCalculator />
    </Container>
  );
}

export default Billing;
