// SelectCurrency.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";

function SelectCurrency({ selectedCurrency, onCurrencyChange }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const CURRENCY_CHOICES = [
    ["NGN", "Nigerian Naira"],
    ["USD", "United States Dollar"],
  ];

  return (
    <Row className="d-flex justify-content-center  py-2">
      <Col>
        <div>
          <Select
            options={CURRENCY_CHOICES.map(([value, label]) => ({
              value,
              label,
            }))}
            value={{
              value: selectedCurrency,
              label: selectedCurrency,
            }}
            onChange={onCurrencyChange}
            placeholder="Currencies"
            className="rounded py-2 mb-2"
            required
          />
        </div>
      </Col>
    </Row>
  );
}

export default SelectCurrency;
