// PrivacyPolicyScreen.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function PrivacyPolicyScreen() {
  return (
    <Container>
      <Row className="d-flex justify-content-center py-2 ">
        <Col>
          <h2 className="py-2 text-center">Privacy Policy</h2>

          <p>
            Welcome to SellAngle Inc! This Privacy Policy outlines how we
            collect, use, and protect your personal information when you use our
            marketplace platform as a buyer or seller.
          </p>

          <h3>1. Information Collection</h3>
          <p>
            As a buyer or seller on our platform, you may provide us with
            personal information such as your name, email address, shipping
            address, payment details, and other necessary information to
            facilitate transactions.
          </p>

          <h3>2. Use of Information</h3>
          <p>
            We use the information you provide to facilitate transactions,
            process payments, communicate with you about your orders, and
            improve our marketplace services. Your information may also be used
            for marketing purposes, such as sending promotional offers and
            updates about our platform.
          </p>

          <h3>3. Information Sharing</h3>
          <p>
            We may share your personal information with third-party service
            providers, such as payment processors, shipping companies, and
            marketing partners, to facilitate transactions and provide you with
            our services. We ensure that these service providers adhere to
            strict confidentiality and data protection standards.
          </p>

          <h3>4. User-generated Content</h3>
          <p>
            Any content you post on our platform, such as product listings,
            reviews, and comments, may be visible to other users and the public.
            Please exercise caution and discretion when sharing personal
            information in your listings and communications.
          </p>

          <h3>5. Data Security</h3>
          <p>
            We take the security of your personal information seriously and
            implement industry-standard measures to protect it from unauthorized
            access, disclosure, alteration, or destruction.
          </p>

          <h3>6. Children's Privacy</h3>
          <p>
            Our platform is not intended for children under the age of 13. We do
            not knowingly collect personal information from children. If you are
            a parent or guardian and believe that your child has provided us
            with personal information, please contact us immediately so that we
            can remove it.
          </p>

          <h3>7. Changes to this Privacy Policy</h3>
          <p>
            We reserve the right to update or modify this Privacy Policy at any
            time. We will notify you of any changes by posting the new Privacy
            Policy on this page. It is your responsibility to review this
            Privacy Policy periodically for changes.
          </p>

          <h3>8. Contact Us</h3>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at privacy@sellangle.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default PrivacyPolicyScreen;
