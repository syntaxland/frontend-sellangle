// CreditPoint.js
import React, { useEffect } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import GetBuyCreditPoint from "../CreditPoint/GetBuyCreditPoint";
import GetUsdBuyCreditPoint from "../CreditPoint/GetUsdBuyCreditPoint";
import GetSellCreditPoint from "../CreditPoint/GetSellCreditPoint";
import GetBuyerCreditPoint from "../CreditPoint/GetBuyerCreditPoint";
import GetAdCpsCharges from "../CreditPoint/GetAdCpsCharges";
import GetUserCpsBonuses from "../CreditPoint/GetUserCpsBonuses";
import GetSellCpsToSellangle from "../CreditPoint/GetSellCpsToSellangle";

const CreditPoint = () => {
  // const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  return (
    <Container>
      <Row>
        <Col>
            <div>
              <GetUserCpsBonuses />
            </div>

            <div>
              <GetAdCpsCharges />
            </div>

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
              <GetSellCpsToSellangle />
            </div>

            <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default CreditPoint;
