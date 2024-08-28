// SellerAccountDetail.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerAccountDetail } from "../../actions/marketplaceSellerActions";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Accordion,
  Modal,
} from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import DatePicker from "react-datepicker";
import VerifySeller from "./VerifySeller";

import Select from "react-select";
import {
  ID_TYPE_CHOICES,
  COUNTRY_CHOICES,
  BUSINESS_TYPE_CHOICES,
  STAFF_SIZE_CHOICES,
  BUSINESS_INDUSTRY_CHOICES,
  BUSINESS_CATEGORY_CHOICES,
} from "../constants";

function SellerAccountDetail({ seller_username }) {
  const dispatch = useDispatch();

  const [idTypeChoices, setIdTypeChoices] = useState([]);
  const [countryChoices, setCountryChoices] = useState([]);
  const [businessTypeChoices, setBusinessTypeChoices] = useState([]);
  const [staffSizeChoices, setStaffSizeChoices] = useState([]);
  const [industryChoices, setIndustryChoices] = useState([]);
  const [businessCategoryChoices, setBusinessCategoryChoices] = useState([]);

  useEffect(() => {
    setIdTypeChoices(ID_TYPE_CHOICES);
    setCountryChoices(COUNTRY_CHOICES);
    setBusinessTypeChoices(BUSINESS_TYPE_CHOICES);
    setStaffSizeChoices(STAFF_SIZE_CHOICES);
    setIndustryChoices(BUSINESS_INDUSTRY_CHOICES);
    setBusinessCategoryChoices(BUSINESS_CATEGORY_CHOICES);
  }, []);

  const getSellerAccountDetailState = useSelector(
    (state) => state.getSellerAccountDetailState
  );
  const {
    loading,
    error,
    sellerAccount,
    sellerApiKey,
    sellerPhoto,
  } = getSellerAccountDetailState;
  console.log("sellerAccount:", sellerAccount);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [businessData, setBusinessData] = useState({
    business_name: "",
    business_status: "",
    business_reg_num: "",
    business_reg_cert: "",
    business_address: "",
    staff_size: "",
    business_industry: "",
    business_category: "",
    business_description: "",
    business_phone: "",
    business_website: "",
    country: "",
    id_type: "",
    id_number: "",
    id_card_image: "",
    dob: "",
    home_address: "",
  });

  const [photoData, setPhotoData] = useState({
    photo: "",
  });

  useEffect(() => {
    if (sellerAccount) {
      setBusinessData({
        business_name: sellerAccount?.business_name,
        business_reg_num: sellerAccount?.business_reg_num,
        business_reg_cert: sellerAccount?.business_reg_cert,
        business_address: sellerAccount?.business_address,
        business_status: sellerAccount?.business_status,
        staff_size: sellerAccount?.staff_size,
        business_industry: sellerAccount?.business_industry,
        business_category: sellerAccount?.business_category,
        business_description: sellerAccount?.business_description,
        business_phone: sellerAccount?.business_phone,
        business_website: sellerAccount?.business_website,
        country: sellerAccount?.country,
        id_type: sellerAccount?.id_type,
        id_number: sellerAccount?.id_number,
        id_card_image: sellerAccount?.id_card_image,
        dob: sellerAccount?.dob,
        home_address: sellerAccount?.home_address,
      });
    }
  }, [sellerAccount]);

  const [apiKeyData, setapiKeyData] = useState({
    live_api_key: "",
  });

  useEffect(() => {
    if (sellerApiKey) {
      setapiKeyData({
        live_api_key: sellerApiKey?.live_api_key,
      });
    }
  }, [sellerApiKey]);

  useEffect(() => {
    if (sellerPhoto) {
      setPhotoData({
        photo: sellerPhoto?.photo,
      });
      // setPhotoDataChanges(false);
    }
  }, [sellerPhoto]);

  useEffect(() => {
    dispatch(getSellerAccountDetail(seller_username));
  }, [dispatch, seller_username]);

  const [verifySellerModal, setVerifySellerModal] = useState(false);
  const handleVerifySellerOpen = () => {
    setVerifySellerModal(true);
  };
  const handleVerifySellerClose = () => {
    setVerifySellerModal(false);
  };

  return (
    <Container Fluid>
      <Row className="d-flex justify-content-center py-2">
        <h2 className="text-center py-2">
          Seller Profile <i className="fas fa-user"></i>
        </h2>

        <div className="d-flex justify-content-center text-center py-2">
          {loading && <Loader />}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}
        </div>
        <p className="d-flex justify-content-end">
          <i> Verified </i>
          {sellerAccount?.is_seller_verified ? (
            <i
              className="fas fa-check-circle"
              style={{ fontSize: "18px", color: "blue" }}
            ></i>
          ) : (
            <i
              className="fas fa-times-circle"
              style={{ fontSize: "18px", color: "red" }}
            ></i>
          )}
        </p>

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Seller Account</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_name"
                      value={businessData.business_name}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_status"
                      value={businessData.business_status}
                    >
                      <option value="">Select Business Status</option>
                      {businessTypeChoices.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_reg_num"
                      value={businessData.business_reg_num}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Registration Certificate</Form.Label>
                    <div className="py-2">
                      {sellerAccount?.business_reg_cert && (
                        <img
                          src={sellerAccount?.business_reg_cert}
                          alt="Business Reg Cert"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control type="file" name="business_reg_cert" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Staff Size</Form.Label>
                    <Form.Control
                      as="select"
                      name="staff_size"
                      value={businessData?.staff_size}
                    >
                      <option value="">Select Staff Size</option>
                      {staffSizeChoices.map((size) => (
                        <option key={size[0]} value={size[0]}>
                          {size[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Industry</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_industry"
                      value={businessData?.business_industry}
                    >
                      <option value="">Select Business Industry</option>
                      {industryChoices.map((industry) => (
                        <option key={industry[0]} value={industry[0]}>
                          {industry[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="business_category"
                      value={businessData?.business_category}
                    >
                      <option value="">Select Business Category</option>
                      {businessCategoryChoices.map((category) => (
                        <option key={category[0]} value={category[0]}>
                          {category[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_description"
                      value={businessData?.business_description}
                    />
                  </Form.Group>

                  {/* <Form.Group>
                    <Form.Label>Business Phone</Form.Label>
                    <PhoneInput
                      // country={businessData?.country}
                      // country="US"
                      // country={selectedCountry}
                      value={businessData?.business_phone}
                      onChange={(value) =>
                        handleBusinessDataChanges({
                          target: { name: "business_phone", value },
                        })
                      }
                      placeholder="Enter phone number" 
                      maxLength={18}
                    />
                  </Form.Group> */}

                  <Form.Group>
                    <Form.Label>Business Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_phone"
                      value={businessData.business_phone}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Website</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_website"
                      value={businessData?.business_website}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="business_address"
                      value={businessData?.business_address}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Country</Form.Label>

                    <Select
                      value={{
                        value: businessData?.country,
                        label: businessData?.country,
                      }}
                      options={countryChoices?.map((type) => ({
                        value: type[0],
                        label: type[1],
                      }))}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="id_type"
                      value={businessData?.id_type}
                    >
                      <option value="">ID Type</option>
                      {idTypeChoices.map((type) => (
                        <option key={type[0]} value={type[0]}>
                          {type[1]}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Personal ID Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="id_number"
                      value={businessData?.id_number}
                      // onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>ID Card Image</Form.Label>

                    <div className="py-2">
                      {sellerAccount?.id_card_image && (
                        <img
                          src={sellerAccount?.id_card_image}
                          alt="ID Card "
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control
                      type="file"
                      name="id_card_image"
                      // onChange={handleBusinessDataChanges}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>

                    <div>
                      <DatePicker
                        selected={
                          businessData.dob ? new Date(businessData?.dob) : null
                        }
                        // onChange={(date) =>
                        //   handleBusinessDataChanges({
                        //     target: { name: "dob", value: date },
                        //   })
                        // }
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        scrollableMonthYearDropdown
                        className="rounded py-2 mb-2 form-control"
                        placeholderText="Select date of birth"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Home Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="home_address"
                      value={businessData?.home_address}
                    />
                  </Form.Group>

                  {/* <div className="d-flex justify-content-end py-2">
                    <Button
                      className="rounded"
                      variant="primary"
                      onClick={handleUpdateBusinessAccount}
                      disabled={
                        !businessDataChanges ||
                        updateSellerAccountLoading ||
                        updateSellerAccountSuccess
                      }
                    >
                      <span className="d-flex justify-content-between">
                        {updateSellerAccountLoading && <LoaderButton />}
                        Update Business Account
                      </span>
                    </Button>{" "}
                  </div> */}
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Seller Photo</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    {/* <Form.Label>Seller Photo</Form.Label> */}
                    <div className="py-2">
                      {photoData?.photo && (
                        <img
                          src={photoData.photo}
                          alt="Seller"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      )}
                    </div>
                    <Form.Control type="file" name="photo" />
                  </Form.Group>
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Seller API Key</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Paysofter API Key</Form.Label>
                    <Form.Control
                      type="text"
                      name="live_api_key"
                      value={apiKeyData?.live_api_key}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end py-2">
                  <Button
                    className="rounded"
                    variant="primary"
                    disabled
                  ></Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="d-flex justify-content-center mt-5 py-3">
            <Button
              variant="primary"
              onClick={handleVerifySellerOpen}
              className="rounded"
            >
              Verify Seller
            </Button>
          </div>

          <Row className="d-flex justify-content-center py-2">
            <Col md={6}>
              <Modal show={verifySellerModal} onHide={handleVerifySellerClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-center w-100 py-2">
                    Verify Seller
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {verifySellerModal && (
                    <VerifySeller seller_username={seller_username} />
                  )}
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerAccountDetail;
