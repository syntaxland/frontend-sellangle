// PostFreeAd.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { postFreeAd } from "../../actions/marketplaceSellerActions";
import { getUserProfile } from "../../actions/userProfileActions";
import Message from "../Message";
import Loader from "../Loader";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FREE_AD_DURATION_CHOICES,
  AD_CONDITION_CHOICES,
  AD_CATEGORY_CHOICES,
  AD_TYPE_CHOICES,
  CURRENCY_CHOICES,
} from "../constants";

function PostFreeAd() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [durationChoices, setDurationChoices] = useState([]);
  const [adConditionChoices, setAdConditionChoices] = useState([]);
  const [adCategoryChoices, setAdCategoryChoices] = useState([]);
  const [adTypeChoices, setAdTypeChoices] = useState([]);
  const [currencyChoices, setCurrencyChoices] = useState([]);

  useEffect(() => {
    setDurationChoices(FREE_AD_DURATION_CHOICES);
    setAdConditionChoices(AD_CONDITION_CHOICES);
    setAdCategoryChoices(AD_CATEGORY_CHOICES);
    setAdTypeChoices(AD_TYPE_CHOICES);
    setCurrencyChoices(CURRENCY_CHOICES);
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
    //   history.push("/ad/free");
    // }
  }, [userInfo, history, profile.is_marketplace_seller]);

  const postFreeAdState = useSelector((state) => state.postFreeAdState);
  const { success, error, loading } = postFreeAdState;

  const [adName, setAdName] = useState("");
  const [adNameError, setAdNameError] = useState("");

  const [adCategory, setAdCategory] = useState("");
  const [adCategoryError, setAdCategoryError] = useState("");

  const [adType, setAdType] = useState("");
  const [adTypeError, setAdTypeError] = useState("");

  const [country, setCountry] = useState({});
  const [countryError, setCountryError] = useState("");

  const [stateProvince, setStateProvince] = useState({});
  const [stateProvinceError, setStateProvinceError] = useState("");

  const [city, setCity] = useState({});
  const [cityError, setCityError] = useState("");

  const [condition, setCondition] = useState("");
  // const [conditionError, setConditionError] = useState("");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  // const [usdPrice, setUsdPrice] = useState("");

  const [currency, setCurrency] = useState("");
  const [currencyError, setCurrencyError] = useState("");

  const [brand, setBrand] = useState("");
  // const [brandError, setBrandError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [countInStock, setCountInStock] = useState("");

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

      // case "location":
      //   setLocation(value);
      //   setLocationError("");
      //   break;

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

      // case "usdPrice":
      //   setUsdPrice(value);
      //   break;

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

      case "countInStock":
        setCountInStock(value);
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
  sellerData.append("price", price);
  sellerData.append("currency", currency);
  sellerData.append("brand", brand);
  sellerData.append("description", description);
  sellerData.append("count_in_stock", countInStock);
  sellerData.append("youtube_link", youtubeLink);
  sellerData.append("image1", image1);
  sellerData.append("image2", image2);
  sellerData.append("image3", image3);
  sellerData.append("duration", duration);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const handlePostPaidAd = () => {
    history.push("/ad/paid");
    // window.location.href = "/ad/paid";
  };

  const handlePostFreeAd = (e) => {
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

    // if (!location) {
    //   setLocationError("Please enter ad location.");
    // } else {
    //   setLocationError("");
    // }

    // if (!condition) {
    //   setConditionError("Please enter ad condtion.");
    // } else {
    //   setPriceError("");
    // }

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
      // !location ||
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
      dispatch(postFreeAd(sellerData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Post Free Ad</h2>
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
              {/* <Form.Text className="text-danger">{conditionError}</Form.Text>
               */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Form.Control
                as="select"
                value={currency}
                onChange={(e) => handleFieldChange("currency", e.target.value)}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Currency</option>
                {currencyChoices?.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
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
              <Form.Label>Description</Form.Label>
           

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

              <Form.Text className="text-danger">{descriptionError}</Form.Text>
            </Form.Group>
          </Form>
          <div className="py-2">
            <Button
              variant="success"
              onClick={handlePostFreeAd}
              className="rounded py-2 mb-2 text-center w-100"
              disabled={loading}
            >
              <div className="d-flex justify-content-center">
                <span className="py-1">Post Free Ad</span>
                {loading && <LoaderButton />}
              </div>
            </Button>
          </div>
        </Col>
        <div className="d-flex justify-content-end py-2 mt-2">
          <Button
            variant="outline-danger"
            onClick={handlePostPaidAd}
            className="rounded"
            size="sm"
            disabled={loading || success}
          >
            Post Promoted Ad
          </Button>
        </div>
      </Row>
    </Container>
  );
}

export default PostFreeAd;
