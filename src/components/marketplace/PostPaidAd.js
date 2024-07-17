// PostPaidAd.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { postPaidAd } from "../../actions/marketplaceSellerActions";
import { getUserProfile } from "../../actions/userProfileActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PAID_AD_DURATION_CHOICES,
  AD_CONDITION_CHOICES,
  AD_CATEGORY_CHOICES,
  AD_TYPE_CHOICES,
  CURRENCY_CHOICES,
  MAIN_CURRENCY_CHOICES,
} from "../constants";

function PostPaidAd() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [durationChoices, setDurationChoices] = useState([]);
  const [adConditionChoices, setAdConditionChoices] = useState([]);
  const [adCategoryChoices, setAdCategoryChoices] = useState([]);
  const [adTypeChoices, setAdTypeChoices] = useState([]);
  const [currencyChoices, setCurrencyChoices] = useState([]);
  const [mainCurrencyChoices, setMainCurrencyChoices] = useState([]);

  useEffect(() => {
    setDurationChoices(PAID_AD_DURATION_CHOICES);
    setAdConditionChoices(AD_CONDITION_CHOICES);
    setAdCategoryChoices(AD_CATEGORY_CHOICES);
    setAdTypeChoices(AD_TYPE_CHOICES);
    setCurrencyChoices(CURRENCY_CHOICES);
    setMainCurrencyChoices(MAIN_CURRENCY_CHOICES);
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } 
    // else if (userInfo && !profile.is_marketplace_seller) {
    //   history.push("/create-marketplace-seller");
    // } else {
    //   history.push("/ad/paid");
    // }
  }, [userInfo, history, profile.is_marketplace_seller]);

  const postPaidAdState = useSelector((state) => state.postPaidAdState);
  const { success, error, loading } = postPaidAdState;

  const [adName, setAdName] = useState("");
  const [adNameError, setAdNameError] = useState("");

  const [adCategory, setAdCategory] = useState("");
  const [adCategoryError, setAdCategoryError] = useState("");

  const [adType, setAdType] = useState("");
  const [adTypeError, setAdTypeError] = useState("");

  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  const [stateProvince, setStateProvince] = useState("");
  const [stateProvinceError, setStateProvinceError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [condition, setCondition] = useState("");
  // const [conditionError, setConditionError] = useState("");

  const [currency, setCurrency] = useState("NGN");
  const [currencyError, setCurrencyError] = useState("");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [usdPrice, setUsdPrice] = useState("");
  const [usdCurrency, setUsdCurrency] = useState("USD");

  const [brand, setBrand] = useState("");
  // const [brandError, setBrandError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [youtubeLink, setYoutubeLink] = useState("");
  // const [youtubeLinkError, setYoutubeLinkError] = useState("");

  const [image1, setImage1] = useState("");
  const [image1Error, setImage1Error] = useState("");

  const [image2, setImage2] = useState("");
  // const [image2Error, setImage2Error] = useState("");

  const [image3, setImage3] = useState("");
  // const [image3Error, setImage3Error] = useState("");

  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountPercentageError, setDiscountPercentageError] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const [isPriceNegotiable, setIsPriceNegotiable] = useState("");
  const [isAutoRenewal, setIsAutoRenewal] = useState("");

  const [
    showStrikethroughPromoPrice,
    setShowStrikethroughPromoPrice,
  ] = useState("");

  const [formError, setFormError] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (country) {
      setStates(State.getStatesOfCountry(country.isoCode));
    } else {
      setStates([]);
    }
  }, [country, country.isoCode]);

  useEffect(() => {
    if (stateProvince) {
      setCities(City.getCitiesOfState(country.isoCode, stateProvince.isoCode));
    } else {
      setCities([]);
    }
  }, [stateProvince, country.isoCode]);

  const handleCategoryChange = (selectedOption) => {
    setAdCategory(selectedOption.value);
    setAdCategoryError("");
    setAdType("");
  };

  const handleTypeChange = (selectedOption) => {
    setAdType(selectedOption.value);
    setAdTypeError("");
  };

  const [showMainCurrencyInfoModal, setShowMainCurrencyInfoModal] = useState(
    false
  );
  const [showAltCurrencyInfoModal, setShowAltCurrencyInfoModal] = useState(
    false
  );
  const [
    showLineThrougPriceInfoModal,
    setShowLineThrougPriceInfoModal,
  ] = useState(false);

  const handleMainCurrencyInfoModalShow = () => {
    setShowMainCurrencyInfoModal(true);
  };

  const handleMainCurrencyInfoModalClose = () => {
    setShowMainCurrencyInfoModal(false);
  };

  const handleAltCurrencyInfoModalShow = () => {
    setShowAltCurrencyInfoModal(true);
  };

  const handleAltCurrencyInfoModalClose = () => {
    setShowAltCurrencyInfoModal(false);
  };

  const handleLineThrougPriceInfoModalShow = () => {
    setShowLineThrougPriceInfoModal(true);
  };
  const handleLineThrougPriceInfoModalClose = () => {
    setShowLineThrougPriceInfoModal(false);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bold",
    "italic",
    "underline",
    "align",
    "link",
    "image",
  ];

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "adName":
        setAdName(value);
        setAdNameError("");
        break;

      case "adCategory":
        setAdCategory(value);
        setAdCategoryError("");
        break;

      case "adType":
        setAdType(value);
        setAdTypeError("");
        break;

      case "country":
        setCountry(value);
        setCountryError("");
        break;

      case "stateProvince":
        setStateProvince(value);
        setStateProvinceError("");
        break;

      case "city":
        setCity(value);
        setCityError("");
        break;

      case "condition":
        setCondition(value);
        // setConditionError("");
        break;

      case "currency":
        setCurrency(value);
        setCurrencyError("");
        break;

      case "price":
        setPrice(value);
        setPriceError("");
        break;

      case "usdPrice":
        setUsdPrice(value);
        break;

      case "usdCurrency":
        setUsdCurrency(value);
        break;

      case "brand":
        setBrand(value);
        // setBrandError("");
        break;

      case "description":
        setDescription(value);
        setDescriptionError("");
        break;

      case "youtubeLink":
        setYoutubeLink(value);
        // setYoutubeLinkError("");
        break;

      case "image1":
        setImage1(value);
        setImage1Error("");
        break;

      case "image2":
        setImage2(value);
        // setImage2Error("");
        break;

      case "image3":
        setImage3(value);
        // setImage3Error("");
        break;

      case "promoCode":
        setPromoCode(value);
        setPromoCodeError("");
        break;

      case "discountPercentage":
        setDiscountPercentage(value);
        setDiscountPercentageError("");
        break;

      case "countInStock":
        setCountInStock(value);
        break;

      case "isPriceNegotiable":
        setIsPriceNegotiable(value);
        break;

      case "showStrikethroughPromoPrice":
        setShowStrikethroughPromoPrice(value);
        break;

      case "isAutoRenewal":
        setIsAutoRenewal(value);
        break;

      case "duration":
        setDuration(value);
        setDurationError("");
        break;

      default:
        break;
    }
  };

  const sellerData = new FormData();
  sellerData.append("ad_name", adName);
  sellerData.append("ad_category", adCategory);
  sellerData.append("ad_type", adType);
  sellerData.append("country", country.isoCode);
  sellerData.append("state_province", stateProvince.isoCode);
  sellerData.append("city", city.name);
  sellerData.append("condition", condition);
  sellerData.append("currency", currency);
  sellerData.append("usd_currency", usdCurrency);
  sellerData.append("price", price);
  sellerData.append("usd_price", usdPrice);
  sellerData.append("brand", brand);
  sellerData.append("description", description);
  sellerData.append("youtube_link", youtubeLink);
  sellerData.append("image1", image1);
  sellerData.append("image2", image2);
  sellerData.append("image3", image3);
  sellerData.append("duration", duration);
  sellerData.append("promo_code", promoCode);
  sellerData.append("discount_percentage", discountPercentage);
  sellerData.append("count_in_stock", countInStock);
  sellerData.append("is_price_negotiable", isPriceNegotiable);
  sellerData.append(
    "show_strike_through_promo_price",
    showStrikethroughPromoPrice
  );
  sellerData.append("is_auto_renewal", isAutoRenewal);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/seller/bank");
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handlePostPaidAd = (e) => {
    e.preventDefault(e);

    if (!adName) {
      setAdNameError("Please enter the ad name.");
    } else {
      setAdNameError("");
    }

    if (!adCategory) {
      setAdCategoryError("Please select the ad category.");
    } else {
      setAdCategoryError("");
    }

    if (!adType) {
      setAdTypeError("Please select the ad type.");
    } else {
      setAdTypeError("");
    }

    if (!country) {
      setCountryError("Please enter ad country.");
    } else {
      setCountryError("");
    }

    if (!stateProvince) {
      setStateProvinceError("Please enter ad state/province.");
    } else {
      setStateProvinceError("");
    }

    if (!city) {
      setCityError("Please enter ad city.");
    } else {
      setCityError("");
    }

    if (promoCode && promoCode.length < 3) {
      setPromoCodeError("Promo Code must be at least 3 characters.");
      return;
    } else if (/[^a-zA-Z0-9_]/.test(promoCode)) {
      setPromoCodeError("Promo Code must not contain special characters.");
      return;
    } else {
      setPromoCodeError("");
    }

    if (promoCode && !discountPercentage) {
      setDiscountPercentageError(
        "Discount Percentage is required when Promo Code is entered."
      );
    } else if (!/^\d*\.?\d*$/.test(discountPercentage)) {
      setDiscountPercentageError(
        "Discount Percentage must contain only digits and decimal points."
      );
    } else {
      setDiscountPercentageError("");
    }

    if (!currency) {
      setCurrencyError("Please select currency.");
    } else {
      setCurrencyError("");
    }

    if (!price) {
      setPriceError("Please enter ad price.");
    } else {
      setPriceError("");
    }

    if (!description) {
      setDescriptionError("Please enter the description.");
    } else {
      setDescriptionError("");
    }

    if (!image1) {
      setImage1Error("Please upload the ad image.");
    } else {
      setImage1Error("");
    }

    if (!duration) {
      setDurationError("Please select the ad duration.");
    } else {
      setDurationError("");
    }

    if (
      !adName ||
      !adCategory ||
      !adType ||
      !country ||
      !stateProvince ||
      !city ||
      !currency ||
      !price ||
      !description ||
      !image1 ||
      !duration
    ) {
      setFormError("Please fix the errors in the form.");
      return;
    } else {
      dispatch(postPaidAd(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Promoted Ad</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Ad created successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}
          {formError && (
            <Message variant="danger" fixed>
              {formError}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Ad Name*</Form.Label>
              <Form.Control
                type="text"
                value={adName}
                onChange={(e) => handleFieldChange("adName", e.target.value)}
                placeholder="Enter the ad name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
              <Form.Text className="text-danger">{adNameError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Category*</Form.Label>
              <Select
                options={adCategoryChoices?.map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={{ value: adCategory, label: adCategory }}
                onChange={handleCategoryChange}
                placeholder="Select Category"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{adCategoryError}</Form.Text>
            </Form.Group>

            {adCategory && (
              <Form.Group>
                <Form.Label>Ad Type*</Form.Label>
                <Select
                  options={adTypeChoices[adCategory]?.map(([value, label]) => ({
                    value,
                    label,
                  }))}
                  value={{ value: adType, label: adType }}
                  onChange={handleTypeChange}
                  placeholder="Select Type"
                  className="rounded py-2 mb-2"
                  required
                />
                <Form.Text className="text-danger">{adTypeError}</Form.Text>
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label>Ad Country*</Form.Label>
              <Select
                options={countries.map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
                value={{ value: country.isoCode, label: country.name }}
                onChange={(selectedOption) => {
                  handleFieldChange("country", {
                    isoCode: selectedOption.value,
                    name: selectedOption.label,
                  });
                }}
                placeholder="Select Country"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{countryError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad State/Province*</Form.Label>
              <Select
                options={states.map((state) => ({
                  value: state.isoCode,
                  label: state.name,
                }))}
                value={{
                  value: stateProvince.isoCode,
                  label: stateProvince.name,
                }}
                onChange={(selectedOption) => {
                  handleFieldChange("stateProvince", {
                    isoCode: selectedOption.value,
                    name: selectedOption.label,
                  });
                }}
                placeholder="Select State/Province"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">
                {stateProvinceError}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad City*</Form.Label>
              <Select
                options={cities.map((city) => ({
                  value: city.name,
                  label: city.name,
                }))}
                value={{ value: city.name, label: city.name }}
                onChange={(selectedOption) => {
                  handleFieldChange("city", {
                    name: selectedOption.label,
                  });
                }}
                placeholder="Select City"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{cityError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Condition</Form.Label>
              <Form.Control
                as="select"
                value={condition}
                onChange={(e) => handleFieldChange("condition", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Condition</option>
                {adConditionChoices?.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              {/* <Form.Text className="text-danger">{conditionError}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Row className="py-2">
                <Col md={10}>
                  <Select
                    value={{ value: currency, label: currency }}
                    onChange={(selectedOption) =>
                      handleFieldChange("currency", selectedOption.value)
                    }
                    options={mainCurrencyChoices?.map((type) => ({
                      value: type[0],
                      label: type[1],
                    }))}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleMainCurrencyInfoModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="This is the main currency price that can be used for Paysofter Promise checkout."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal
                    show={showMainCurrencyInfoModal}
                    onHide={handleMainCurrencyInfoModalClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Main Currency Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        This is the main currency price that can be used for
                        Paysofter Promise checkout.{" "}
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>

              <Form.Text className="text-danger">{currencyError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price*</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => handleFieldChange("price", e.target.value)}
                placeholder="Enter price"
                className="rounded py-2 mb-2"
                required
              />
              <Form.Text className="text-danger">{priceError}</Form.Text>
            </Form.Group>

            <Form.Group controlId="usdCurrency">
              <Form.Label>Alternative Currency</Form.Label>
              <Row className="py-2">
                <Col md={10}>
                  <Select
                    value={{ value: usdCurrency, label: usdCurrency }}
                    onChange={(selectedOption) =>
                      handleFieldChange("usdCurrency", selectedOption.value)
                    }
                    options={currencyChoices?.map((type) => ({
                      value: type[0],
                      label: type[1],
                    }))}
                  />
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleAltCurrencyInfoModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="This is optional and could be the alternative currency."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal
                    show={showAltCurrencyInfoModal}
                    onHide={handleAltCurrencyInfoModalClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Alternative Currency Info
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        This is optional and could be the alternative currency.{" "}
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price Alternative</Form.Label>
              <Form.Control
                type="number"
                value={usdPrice}
                onChange={(e) => handleFieldChange("usdPrice", e.target.value)}
                placeholder="Enter price alternative"
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is Price Negotiable?"
                checked={isPriceNegotiable}
                onChange={(e) =>
                  handleFieldChange("isPriceNegotiable", e.target.checked)
                }
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Promo Code</Form.Label>
              <Form.Control
                type="text"
                value={promoCode}
                onChange={(e) => handleFieldChange("promoCode", e.target.value)}
                placeholder="Enter ad promo code"
                className="rounded py-2 mb-2"
                maxLength={10}
              />
              <Form.Text className="text-danger">{promoCodeError}</Form.Text>
            </Form.Group>

            {promoCode && (
              <>
                <Form.Group>
                  <Form.Label>Discount Percentage*</Form.Label>
                  <Form.Control
                    type="text"
                    value={discountPercentage}
                    onChange={(e) =>
                      handleFieldChange("discountPercentage", e.target.value)
                    }
                    placeholder="Enter ad discount percentage"
                    className="rounded py-2 mb-2"
                    maxLength={4}
                    required
                  />
                  <Form.Text className="text-danger">
                    {discountPercentageError}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Row className="py-2">
                    <Col md={10}>
                      <Form.Check
                        type="checkbox"
                        label="Show strike through old prices?"
                        checked={showStrikethroughPromoPrice}
                        onChange={(e) =>
                          handleFieldChange(
                            "showStrikethroughPromoPrice",
                            e.target.checked
                          )
                        }
                        className="rounded py-2 mb-2"
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline"
                        onClick={handleLineThrougPriceInfoModalShow}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="This displays the strike through price."
                      >
                        <i className="fa fa-info-circle"> </i>
                      </Button>

                      <Modal
                        show={showLineThrougPriceInfoModal}
                        onHide={handleLineThrougPriceInfoModalClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-center w-100 py-2">
                            Show Strike Through Price
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p className="text-center">
                            This shows the line through price. E.g. 100 USD ad
                            price at 5% discount rate will display thus: `
                            <span style={{ textDecoration: "line-through" }}>
                              100 USD
                            </span>{" "}
                            95 USD (5% Off)`.{" "}
                          </p>
                        </Modal.Body>
                      </Modal>
                    </Col>
                  </Row>
                </Form.Group>
              </>
            )}

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => handleFieldChange("brand", e.target.value)}
                placeholder="Enter ad brand"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
              {/* <Form.Text className="text-danger">{brandError}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
                type="text"
                value={youtubeLink}
                onChange={(e) =>
                  handleFieldChange("youtubeLink", e.target.value)
                }
                placeholder="Enter ad Youtube link"
                className="rounded py-2 mb-2"
                maxLength={225}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Number In Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) =>
                  handleFieldChange("countInStock", e.target.value)
                }
                placeholder="Enter number of ad in stock"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 1</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image1", e.target.files[0])}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
              />
              <Form.Text className="text-danger">{image1Error}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 2</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image2", e.target.files[0])}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 3</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFieldChange("image3", e.target.files[0])}
                placeholder="Upload proof of address"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration*</Form.Label>
              <Form.Control
                as="select"
                value={duration}
                onChange={(e) => handleFieldChange("duration", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Duration</option>
                {durationChoices?.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{durationError}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Renew Automatically?"
                checked={isAutoRenewal}
                onChange={(e) =>
                  handleFieldChange("isAutoRenewal", e.target.checked)
                }
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description*</Form.Label>
              {/* <Form.Control
                // type="text"
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                required
                maxLength={2000}
              /> */}

              <ReactQuill
                value={description}
                onChange={(value) => handleFieldChange("description", value)}
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                modules={modules}
                formats={formats}
                maxLength={4000}
                required
              />

              {/* <ReactQuill
                value={description}
                // onChange={setMessage}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                modules={modules} 
                formats={formats}
                placeholder="Enter ad description"
                maxLength={2000}
                required
              /> */}
              <Form.Text className="text-danger">{descriptionError}</Form.Text>
            </Form.Group>
          </Form>
          <div className="py-2">
            <Button
              variant="success"
              onClick={handlePostPaidAd}
              className="rounded py-2 mb-2 text-center w-100"
              disabled={loading || success}
            >
              <div className="d-flex justify-content-center">
                <span className="py-1">Post Ad</span>
                {loading && <LoaderButton />}
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PostPaidAd;
