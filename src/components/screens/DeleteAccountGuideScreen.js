// DeleteAccountGuideScreenjs
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function DeleteAccountGuideScreen() {
  return (
    <Container>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          <h2 className="py-2 text-center">Account Deletion Guide</h2>

          <p>
            Welcome to SellAngle! If you wish to delete your account and
            associated data, please follow the steps below.
          </p>

          <h3>Steps to Delete Your Account:</h3>
          <ol>
            <li>Go to the Account Settings section of the app.</li>
            <li>Locate the option to delete your account.</li>
            <li>
              Follow the on-screen instructions to confirm the deletion process.
            </li>
            <li>
              Your account and associated data will be permanently deleted.
            </li>
          </ol>

          <h3>Types of Data Deleted:</h3>
          <ul>
            <li>
              User profile information (e.g., username, email address, phone
              number)
            </li>
            <li>Transaction history</li>
            <li>Preferences and settings</li>
          </ul>

          <h3>Data Retention Period:</h3>
          <p>
            Once your account is deleted, all associated data will be
            permanently removed from our systems. We do not retain any user data
            beyond the account deletion process.
          </p>

          <p>
            If you have any questions or need further assistance, please contact
            us at sellangle@gmail.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default DeleteAccountGuideScreen;
