// EditPaidAd.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import {
  editPaidAd,
  getPaidAdDetail,
} from "../../actions/marketplaceSellerActions";
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

function EditPaidAd({ match }) {
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

  const { id } = useParams();
  const getPaidAdDetailState = useSelector(
    (state) => state.getPaidAdDetailState
  );
  const { ads } = getPaidAdDetailState;
  console.log("Paid Ads:", ads);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getPaidAdDetail(match.params.id));
  }, [dispatch, match]);

  const editPaidAdState = useSelector((state) => state.editPaidAdState);
  const { success, error, loading } = editPaidAdState;

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [editAdChanges, setEditAdChanges] = useState(false);
  const [editAdData, setEditAdData] = useState({
    ad_name: "",
    ad_category: "",
    ad_type: "",
    location: "",

    country: {},
    state_province: {},
    city: {},
    condition: "",
    currency: "",
    price: "",
    usd_price: "",
    usd_currency: "",
    brand: "",
    description: "",
    youtube_link: "",
    image1: "",
    image2: "",
    image3: "",
    duration: "",
    promo_code: "",
    discount_percentage: "",
    count_in_stock: "",
    is_price_negotiable: "",
    show_strike_through_promo_price: "",
    is_auto_renewal: "",
  });

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

  useEffect(() => {
    if (ads) {
      setEditAdData({
        ad_name: ads?.ad_name,
        ad_category: ads?.ad_category,
        ad_type: ads?.ad_type,
        location: ads?.location,

        country: ads?.country ? Country?.getCountryByCode(ads?.country) : {},
        state_province: ads?.state_province
          ? State?.getStateByCodeAndCountry(ads?.state_province, ads?.country)
          : {},
        city: ads?.city
          ? City?.getCitiesOfState(ads?.country, ads?.state_province)?.find(
              (city) => city.name === ads?.city
            )
          : {},
        condition: ads?.condition,
        currency: ads?.currency,
        price: ads?.price,
        usd_price: ads?.usd_price,
        usd_currency: ads?.usd_currency,
        brand: ads?.brand,
        description: ads?.description,
        youtube_link: ads?.youtube_link,
        image1: ads?.image1,
        image2: ads?.image2,
        image3: ads?.image3,
        duration: ads?.duration,
        promo_code: ads?.promo_code,
        discount_percentage: ads?.discount_percentage,
        count_in_stock: ads?.count_in_stock,
        is_price_negotiable: ads?.is_price_negotiable,
        show_strike_through_promo_price: ads?.show_strike_through_promo_price,
        is_auto_renewal: ads?.is_auto_renewal,
      });
      setEditAdChanges(false);
    }
  }, [ads]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (editAdData.country) {
      setStates(State.getStatesOfCountry(editAdData.country?.isoCode));
    } else {
      setStates([]);
    }
  }, [editAdData.country]);

  useEffect(() => {
    if (editAdData.state_province) {
      setCities(
        City.getCitiesOfState(
          editAdData.country?.isoCode,
          editAdData.state_province?.isoCode
        )
      );
    } else {
      setCities([]);
    }
  }, [editAdData.state_province, editAdData.country?.isoCode]);

  const handleEditAdChanges = (e) => {
    const { name, value, files, checked } = e.target;

    if (
      name === "show_strike_through_promo_price" ||
      name === "is_price_negotiable" ||
      name === "is_auto_renewal"
    ) {
      setEditAdData({ ...editAdData, [name]: checked });
    } else if (files) {
      setEditAdData({ ...editAdData, [name]: files[0] });
    } else {
      setEditAdData({ ...editAdData, [name]: value });
    }

    setEditAdChanges(true);
  };

  const handleEditAd = () => {
    const editAdFormData = new FormData();

    editAdFormData.append("ad_name", editAdData.ad_name);
    editAdFormData.append("ad_category", editAdData.ad_category);
    editAdFormData.append("ad_type", editAdData.ad_type);
    editAdFormData.append("country", editAdData?.country?.isoCode);
    editAdFormData.append(
      "state_province",
      editAdData?.state_province?.isoCode
    );
    editAdFormData.append("city", editAdData?.city?.name);
    editAdFormData.append("condition", editAdData.condition);
    editAdFormData.append("currency", editAdData.currency);
    editAdFormData.append("price", editAdData.price);
    editAdFormData.append("usd_price", editAdData.usd_price);
    editAdFormData.append("usd_currency", editAdData.usd_currency);
    editAdFormData.append("brand", editAdData.brand);
    editAdFormData.append("description", editAdData.description);
    editAdFormData.append("youtube_link", editAdData.youtube_link);
    editAdFormData.append("duration", editAdData.duration);
    editAdFormData.append("promo_code", editAdData.promo_code);
    editAdFormData.append(
      "discount_percentage",
      editAdData.discount_percentage
    );
    editAdFormData.append("count_in_stock", editAdData.count_in_stock);
    editAdFormData.append(
      "is_price_negotiable",
      editAdData.is_price_negotiable
    );
    editAdFormData.append(
      "show_strike_through_promo_price",
      editAdData.show_strike_through_promo_price
    );
    editAdFormData.append("is_auto_renewal", editAdData.is_auto_renewal);
    editAdFormData.append("ad_id", id);

    if (editAdFormData.image1 instanceof File) {
      editAdFormData.append("image1", editAdData.image1);
    }

    if (editAdFormData.image2 instanceof File) {
      editAdFormData.append("image2", editAdData.image2);
    }

    if (editAdFormData.image3 instanceof File) {
      editAdFormData.append("image3", editAdData.image3);
    }

    console.log("editAdFormData:", editAdFormData);

    dispatch(editPaidAd(editAdFormData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/current-ads");
        // history.push("/dashboard/marketplace/sellers");
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col xs={12} md={6}>
          <h2 className="text-center py-2">Edit Ad</h2>
          {loading && <Loader />}

          {success && (
            <Message variant="success" fixed>
              Ad updated successfully.
            </Message>
          )}
          {error && (
            <Message variant="danger" fixed>
              {error}
            </Message>
          )}

          <Form>
            <Form.Group>
              <Form.Label>Ad Name</Form.Label>
              <Form.Control
                type="text"
                name="ad_name"
                value={editAdData.ad_name}
                onChange={handleEditAdChanges}
                placeholder="Enter the ad name"
                className="rounded py-2 mb-2"
                required
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Category</Form.Label>
              <Form.Control
                as="select"
                name="ad_category"
                value={editAdData.ad_category}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Category</option>
                {adCategoryChoices.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Type</Form.Label>
              <Form.Control
                as="select"
                name="ad_type"
                value={editAdData.ad_type}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Type</option>
                {adTypeChoices[editAdData.ad_category]?.map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Country</Form.Label>

              <Select
                options={countries.map((country) => ({
                  value: country?.isoCode,
                  label: country?.name,
                }))}
                value={{
                  value: editAdData?.country?.isoCode,
                  label: editAdData?.country?.name,
                }}
                onChange={(selectedOption) => {
                  setEditAdData({
                    ...editAdData,
                    country: {
                      isoCode: selectedOption.value,
                      name: selectedOption.label,
                    },
                  });
                }}
                placeholder="Select Country"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad State/Province</Form.Label>

              <Select
                options={states.map((state) => ({
                  value: state?.isoCode,
                  label: state?.name,
                }))}
                value={{
                  value: editAdData?.state_province?.isoCode,
                  label: editAdData?.state_province?.name,
                }}
                onChange={(selectedOption) => {
                  setEditAdData({
                    ...editAdData,
                    state_province: {
                      isoCode: selectedOption.value,
                      name: selectedOption.label,
                    },
                  });
                }}
                placeholder="Select State/Province"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad City</Form.Label>

              <Select
                options={cities.map((city) => ({
                  value: city.name,
                  label: city.name,
                }))}
                value={{
                  value: editAdData?.city?.name,
                  label: editAdData?.city?.name,
                }}
                onChange={(selectedOption) => {
                  setEditAdData({
                    ...editAdData,
                    city: {
                      name: selectedOption.label,
                    },
                  });
                }}
                placeholder="Select City"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ad Condition</Form.Label>
              <Form.Control
                as="select"
                name="condition"
                value={editAdData.condition}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Condition</option>
                {adConditionChoices.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Currency*</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={editAdData.currency}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Currency</option>
                {mainCurrencyChoices.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editAdData.price}
                onChange={handleEditAdChanges}
                placeholder="Enter price"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Promo Code</Form.Label>
              <Form.Control
                type="text"
                name="promo_code"
                value={editAdData.promo_code}
                onChange={handleEditAdChanges}
                placeholder="Enter ad promo code"
                className="rounded py-2 mb-2"
                maxLength={10}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="number"
                name="discount_percentage"
                value={editAdData.discount_percentage}
                onChange={handleEditAdChanges}
                placeholder="Enter ad discount percentage"
                className="rounded py-2 mb-2"
                maxLength={4}
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show strike through promo price?"
                name="show_strike_through_promo_price"
                checked={editAdData.show_strike_through_promo_price}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group controlId="usdCurrency">
              <Form.Label>Alternative Currency</Form.Label>
              <Select
                value={{
                  value: editAdData.usd_currency,
                  label: editAdData.usd_currency,
                }}
                onChange={(selectedOption) =>
                  handleEditAdChanges({
                    target: {
                      name: "usd_currency",
                      value: selectedOption.value,
                    },
                  })
                }
                options={currencyChoices.map((type) => ({
                  value: type[0],
                  label: type[1],
                }))}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price Alternative</Form.Label>
              <Form.Control
                type="number"
                name="usd_price"
                value={editAdData.usd_price}
                onChange={handleEditAdChanges}
                placeholder="Enter USD price equivalent"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is Price Negotiable?"
                name="is_price_negotiable"
                checked={editAdData.is_price_negotiable}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={editAdData.brand}
                onChange={handleEditAdChanges}
                placeholder="Enter ad brand"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
                type="text"
                name="youtube_link"
                value={editAdData.youtube_link}
                onChange={handleEditAdChanges}
                placeholder="Enter ad Youtube link"
                className="rounded py-2 mb-2"
                maxLength={225}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Number In Stock</Form.Label>
              <Form.Control
                type="number"
                name="count_in_stock"
                value={editAdData.count_in_stock}
                onChange={handleEditAdChanges}
                placeholder="Enter number of ad in stock"
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 1</Form.Label>
              <div className="py-2">
                {ads?.image1 && (
                  <img
                    src={ads?.image1}
                    alt="Image1"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                name="image1"
                onChange={handleEditAdChanges}
                placeholder="Upload the ID Card Photoname"
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 2</Form.Label>
              <div className="py-2">
                {ads?.image2 && (
                  <img
                    src={ads?.image2}
                    alt="image2"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                name="image2"
                onChange={handleEditAdChanges}
                placeholder="Upload the ID Card Photo"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image 3</Form.Label>
              <div className="py-2">
                {ads?.image3 && (
                  <img
                    src={ads?.image3}
                    alt="image3"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                name="image3"
                onChange={handleEditAdChanges}
                placeholder="Upload proof of address"
                className="rounded py-2 mb-2"
                maxLength={100}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                as="select"
                name="duration"
                value={editAdData.duration}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
                required
              >
                <option value="">Select Ad Duration</option>
                {durationChoices.map((type) => (
                  <option key={type[0]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Renew Automatically?"
                name="is_auto_renewal"
                checked={editAdData.is_auto_renewal}
                onChange={handleEditAdChanges}
                className="rounded py-2 mb-2"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              {/* <Form.Control
                // type="text"
                as="textarea"
                rows={4}
                name="description"
                value={editAdData.description}
                onChange={handleEditAdChanges}
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                required
                maxLength={4000}
              /> */}
              <ReactQuill
                value={editAdData.description}
                onChange={(value) =>
                  handleEditAdChanges({
                    target: { name: "description", value: value },
                  })
                }
                placeholder="Enter ad description"
                className="rounded py-2 mb-2"
                modules={modules}
                formats={formats}
                maxLength={4000}
                required
              />
            </Form.Group>
          </Form>
          <div className="py-2">
            <Button
              variant="success"
              onClick={handleEditAd}
              className="rounded py-2 mb-2 text-center w-100"
              disabled={!editAdChanges || loading || success}
            >
              <div className="d-flex justify-content-center">
                <span className="py-1">Update Ad</span>
                {loading && <LoaderButton />}
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditPaidAd;
