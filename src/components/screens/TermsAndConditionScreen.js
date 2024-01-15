// TermsAndConditionScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function TermsAndConditionScreen() {
  return (
    <Container>
      <Row className="justify-content-center py-2 ">
        <Col>
          <h2 className="py-2 text-center">Terms and Conditions</h2>

          <p>
            Welcome to our eCommerce platform and marketplace! These terms and
            conditions outline the rules and regulations for the use of our
            services.
          </p>

          <h3>Section 1: Introduction</h3>
          <p>
            By accessing this platform, we assume you accept these terms and
            conditions. Do not continue to use our platform if you do not agree
            to take all of the terms and conditions stated on this page.
          </p>

          <h3>Section 2: eCommerce Platform</h3>
          <p>
            - Users can browse and purchase products/services through our
            platform.
          </p>
          <p>
            - Payments, shipping, and returns are subject to our eCommerce terms
            and conditions.
          </p>

          <h3>Section 3: Marketplace</h3>
          <p>
            - Our platform includes a marketplace where third-party sellers can
            list and sell their products/services.
          </p>
          <p>
            - Users engaging in marketplace activities must comply with both our
            platform's terms and conditions and the marketplace-specific terms.
          </p>

          <h4>3.1 Seller Responsibilities</h4>
          <p>
            - Sellers are responsible for accurate product listings and
            fulfillment.
          </p>
          <p>
            - Sellers must comply with our platform's policies and guidelines for
            sellers.
          </p>

          <h4>3.2 Buyer Responsibilities</h4>
          <p>
            - Buyers are responsible for reviewing product listings,
            understanding shipping terms, and providing accurate information.
          </p>
          <p>
            - Buyers must comply with our platform's policies and guidelines for
            buyers.
          </p>

          <h3>Section 4: User Responsibilities</h3>
          <p>
            - Users are responsible for maintaining the security of their
            accounts and passwords.
          </p>
          <p>
            - Users must comply with both general and specific terms and
            conditions related to their activities on our platform.
          </p>

          <h3>Section 5: Changes to Terms</h3>
          <p>
            We reserve the right to revise these terms and conditions at any
            time. By using our platform, you agree to be bound by the current
            version of these terms and conditions.
          </p>

          <h3>Section 6: Contact Information</h3>
          <p>
            If you have any questions about these terms and conditions, please
            contact us at support@mcdofshop.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default TermsAndConditionScreen;
