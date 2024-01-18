// Marketplace.js
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { getUserProfile } from "../../actions/userProfileActions";
import AllPaidAdScreen from "./AllPaidAdScreen";
import AllFreeAdScreen from "./AllFreeAdScreen";
// import SearchFreeAdScreen from "./SearchFreeAdScreen";
// import SearchPaidAdScreen from "./SearchPaidAdScreen";
import SellerSearchCard from "./SellerSearchCard";
import FilterBar from "./FilterBar";
import {
  getSellerUsernameSearch,
  // searchAds,
  getAllPaidAd,
  getAllFreeAd,
} from "../../actions/marketplaceSellerActions";
import Message from "../Message";
import LoaderButton from "../LoaderButton";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

function Marketplace() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const [searchTerm, setSearchTerm] = useState("");
  const [sellerUsername, setSellerUsername] = useState("");

  const [searchSellerUsername, setSearchSellerUsername] = useState(null);
  // const [searchAdResult, setSearchAdResult] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const getAllPaidAdState = useSelector((state) => state.getAllPaidAdState);
  const { paidAds } = getAllPaidAdState;
  console.log("paidAds:", paidAds?.length);

  const getAllFreeAdState = useSelector((state) => state.getAllFreeAdState);
  const { freeAds } = getAllFreeAdState;
  console.log("freeAds:", freeAds?.length);

  const searchAdsState = useSelector((state) => state.searchAdsState);
  const {
    loading: searchAdLoading,
    // success: searchAdSuccess,

    error: searchAdError,
    freeSearchAds,
    paidSearchAds,
  } = searchAdsState;
  console.log("freeSearchAds", freeSearchAds?.length);
  console.log("paidSearchAds", paidSearchAds?.length);

  const getSellerUsernameSearchState = useSelector(
    (state) => state.getSellerUsernameSearchState
  );
  const {
    loading: sellerUsernameSearchLoading,
    // success: sellerUsernameSearchSuccess,
    error: sellerUsernameSearchError,
    serachResults,
    sellerAvatarUrl,
  } = getSellerUsernameSearchState;
  console.log("serachResults", serachResults);

  // const [freeAdSearchLength, setFreeAdSearchLength] = useState(0);
  // const [paidAdSearchLength, setPaidAdSearchLength] = useState(0);
  const [freeAdLength, setFreeAdLength] = useState(0);
  const [paidAdLength, setPaidAdLength] = useState(0);

  useEffect(() => {
    setFreeAdLength(freeAds ? freeAds.length : 0);
    setPaidAdLength(paidAds ? paidAds.length : 0);
  }, [freeAds, paidAds]);

  // useEffect(() => {
  //   setFreeAdSearchLength(freeSearchAds ? freeSearchAds.length : 0);
  //   setPaidAdSearchLength(paidSearchAds ? paidSearchAds.length : 0);
  // }, [freeSearchAds, paidSearchAds]);

  const [filteredFreeAds, setFilteredFreeAds] = useState([]);
  const [filteredPaidAds, setFilteredPaidAds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const freeAdsCategoryCount = freeAds ? freeAds.length : 0;
  const paidAdsCategoryCount = paidAds ? paidAds.length : 0;
  const totalAdsCategoryCount = freeAdsCategoryCount + paidAdsCategoryCount;

  const freeAdsTypeCount = freeAds ? freeAds.length : 0;
  const paidAdsTypeCount = paidAds ? paidAds.length : 0;
  const totalAdsTypeCount = freeAdsTypeCount + paidAdsTypeCount;

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  // };

  // const handleTypeChange = (type) => {
  //   setSelectedType(type);
  // };

  const handleCategoryChange = useCallback(
    (category) => {
      // Filter freeAds and paidAds based on the selected category
      const filteredFreeAds = freeAds.filter((ad) => ad.category === category);
      const filteredPaidAds = paidAds.filter((ad) => ad.category === category);

      // Set the filtered ads in the state
      setFilteredFreeAds(filteredFreeAds);
      setFilteredPaidAds(filteredPaidAds);
    },
    [freeAds, paidAds]
  );

  const handleTypeChange = useCallback(
    (type) => {
      // Filter freeAds and paidAds based on the selected type
      const filteredFreeAds = freeAds.filter((ad) => ad.type === type);
      const filteredPaidAds = paidAds.filter((ad) => ad.type === type);

      // Set the filtered ads in the state
      setFilteredFreeAds(filteredFreeAds);
      setFilteredPaidAds(filteredPaidAds);
    },
    [freeAds, paidAds]
  );

  // const filterAds = useCallback(() => {
  //   if (selectedCategory && selectedType) {
  //     const filteredFree = freeAds?.filter(
  //       (ad) =>
  //         ad.category === selectedCategory && ad.type === selectedType.value
  //     );
  //     setFilteredFreeAds(filteredFree);

  //     const filteredPaid = paidAds?.filter(
  //       (ad) =>
  //         ad.category === selectedCategory && ad.type === selectedType.value
  //     );
  //     setFilteredPaidAds(filteredPaid);
  //   } else {
  //     setFilteredFreeAds([]);
  //     setFilteredPaidAds([]);
  //   }
  // }, [selectedCategory, selectedType, freeAds, paidAds]);

  // useEffect(() => {
  //   filterAds();
  // }, [filterAds]);

  // const filterAds = () => {
  //   if (selectedCategory && selectedType) {
  //     const filteredFree = freeAds.filter(
  //       (ad) =>
  //         ad.category === selectedCategory && ad.type === selectedType.value
  //     );
  //     setFilteredFreeAds(filteredFree);

  //     const filteredPaid = paidAds.filter(
  //       (ad) =>
  //         ad.category === selectedCategory && ad.type === selectedType.value
  //     );
  //     setFilteredPaidAds(filteredPaid);
  //   } else {
  //     setFilteredFreeAds([]);
  //     setFilteredPaidAds([]);
  //   }
  // };

  // useEffect(() => {
  //   filterAds();
  // }, [filterAds]);

  // console.log("Country:", Country.getAllCountries());
  // console.log("State:", State.getAllStates());
  // console.log("City:", City.getAllCities());

  // const [defaultCountry] = useState({
  //   value: "US",
  //   label: "United States",
  // });

  // const [defaultState] = useState({
  //   value: "CA",
  //   label: "California",
  // });

  // const [defaultCity] = useState({
  //   value: "SanFrancisco",
  //   label: "San Francisco",
  // });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption.value);
    setSelectedCity("");
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  // const savedCountry = localStorage.getItem("selectedCountry");
  // const savedState = localStorage.getItem("selectedState");
  // const savedCity = localStorage.getItem("selectedCity");

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedState = localStorage.getItem("selectedState");
    const savedCity = localStorage.getItem("selectedCity");

    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedState) setSelectedState(savedState);
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  useEffect(() => {
    if (selectedCountry)
      localStorage.setItem("selectedCountry", selectedCountry);
    if (selectedState) localStorage.setItem("selectedState", selectedState);
    if (selectedCity) localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCountry, selectedState, selectedCity]);

  console.log("location", selectedCountry, selectedState, selectedCity);

  useEffect(() => {
    const adData = {
      selected_country: selectedCountry,
      selected_state: selectedState,
      selected_city: selectedCity,
    };
    dispatch(getAllPaidAd(adData));
    dispatch(getAllFreeAd(adData));
    // eslint-disable-next-line
  }, [dispatch, selectedCountry, selectedState, selectedCity]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const handlePostFreeAd = () => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo && !profile.is_marketplace_seller) {
      history.push("/create-marketplace-seller");
    } else {
      history.push("/ad/free");
    }
  };

  const handleSearchAds = () => {
    history.push("/search-ad/");
  };

  const handleSellerUsernameSearch = (e) => {
    e.preventDefault();
    if (sellerUsername.trim() !== "") {
      const lowerCaseUsername = sellerUsername.toLowerCase().trim();
      const result = dispatch(getSellerUsernameSearch(lowerCaseUsername));
      setSearchSellerUsername(result);
      if (!result) {
        console.log("Seller not found.");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <hr />
          <h1 className="text-center py-3">
            <i className="fas fa-shopping-cart"></i> Sell Angle
          </h1>
          <hr />

          <div className="py-2 d-flex justify-content-center text-center">
            {searchAdError && (
              <Message fixed variant="danger">
                {searchAdError}
              </Message>
            )}

            {/* {sellerUsernameSearchSuccess && (
              <Message variant="success" fixed> 
                Seller found!
              </Message>
            )} */}

            {sellerUsernameSearchError && (
              <Message fixed variant="danger">
                {sellerUsernameSearchError}
              </Message>
            )}
          </div>

          <Row className="py-2 d-flex justify-content-center">
            <Col md={8}>
              <Row className="py-2 d-flex justify-content-betwwen">
                {/* <Col md={10}> */}
                {/* <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search ads"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                  </Form.Group> */}
                {/* </Col> */}
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSearchAds}
                  >
                    <div className="d-flex justify-content-center">
                      <span className="py-1">
                        Search Ads <i className="fas fa-search"></i>
                        {/* Search */}
                        {/* Ads */}
                      </span>
                      {searchAdLoading && <LoaderButton />}
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr />
          <Col md={6}>
            <Button
              variant="outline-transparent"
              size="sm"
              className="py-2 rounded"
              disabled
            >
              <i className="fas fa-map-marker-alt"></i> Ad Location (
              {freeAdLength + paidAdLength})
            </Button>
          </Col>
          <Row className="py-2 d-flex justify-content-end">
            <Col className="py-2">
              <Col md={4}>
                <Select
                  options={Country.getAllCountries().map((country) => ({
                    // value: country.name,
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  value={{ value: selectedCountry, label: selectedCountry }}
                  // value={
                  //   selectedCountry
                  //     ? { value: selectedCountry, label: selectedCountry }
                  //     : defaultCountry
                  // }
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <Select
                  options={
                    selectedCountry
                      ? State.getStatesOfCountry(selectedCountry).map(
                          (state) => ({
                            value: state.isoCode,
                            // value: state.name,
                            label: state.name,
                          })
                        )
                      : []
                  }
                  value={{ value: selectedState, label: selectedState }}
                  // value={
                  //   selectedState
                  //     ? { value: selectedState, label: selectedState }
                  //     : defaultState
                  // }
                  onChange={handleStateChange}
                  placeholder="Select State/Province"
                  className="rounded"
                  required
                />
              </Col>
              <Col md={4}>
                <Select
                  options={
                    selectedState
                      ? City.getCitiesOfState(
                          selectedCountry,
                          selectedState
                        ).map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))
                      : []
                  }
                  value={{ value: selectedCity, label: selectedCity }}
                  // value={
                  //   selectedCity
                  //     ? { value: selectedCity, label: selectedCity }
                  //     : defaultCity
                  // }
                  onChange={handleCityChange}
                  placeholder="Select City"
                  className="rounded"
                  required
                />
              </Col>
            </Col>

            <Col md={4} xs={12} sm={6} lg={4} xl={4} className="py-2">
              <Form onSubmit={handleSellerUsernameSearch}>
                <Row className="d-flex justify-content-betwwen">
                  <Col md={10}>
                    <Form.Group>
                      <Form.Control
                        type="search"
                        placeholder="Search seller by username"
                        value={sellerUsername}
                        onChange={(e) => setSellerUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="rounded"
                      size="sm"
                      type="submit"
                      // onClick={handleSellerUsernameSearch}
                      required
                    >
                      <div className="d-flex justify-content-center">
                        <span className="py-1">
                          <i className="fas fa-search"></i>
                          {/* Search */}
                          {/* Seller */}
                        </span>
                        {sellerUsernameSearchLoading && <LoaderButton />}
                      </div>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <div className="py-2 d-flex justify-content-center">
            <FilterBar
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              filteredFreeAds={filteredFreeAds}
              filteredPaidAds={filteredPaidAds}
              paidAdsCategoryCount={paidAdsCategoryCount}
              freeAdsCategoryCount={freeAdsCategoryCount}
              totalAdsCategoryCount={totalAdsCategoryCount}
              freeAdsTypeCount={freeAdsTypeCount}
              paidAdsTypeCount={paidAdsTypeCount}
              totalAdsTypeCount={totalAdsTypeCount}
              setSelectedType={setSelectedType}
              setSelectedCategory={setSelectedCategory}
              onCategoryChange={handleCategoryChange}
              onTypeChange={handleTypeChange}
            />
          </div>

          <div className="py-2 d-flex justify-content-center">
            {searchSellerUsername && (
              <Row className="py-2 d-flex justify-content-center">
                <hr />
                <Col md={6}>
                  <div>
                    {serachResults && (
                      <SellerSearchCard
                        serachResults={serachResults}
                        sellerAvatarUrl={sellerAvatarUrl}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </div>

          <hr />

          <div className="text-center py-2">
            <span>At this angle, sells are quick ...{"  "}</span>
            <Button
              variant="success"
              className="rounded"
              size="sm"
              onClick={handlePostFreeAd}
            >
              Post Free Ads <i className="fas fa-plus-square"></i>
            </Button>
          </div>

          {/* <div className="py-2">
            {searchAdResult && (
              <Row className="py-2 d-flex justify-content-center">
                <h3 className="text-center">
                  <i className="fas fa-list"></i> Search Results (
                  {freeAdSearchLength + paidAdSearchLength})
                </h3>
                <Col>
                  <div>
                    {freeSearchAds || paidSearchAds ? (
                      <>
                        {freeSearchAds?.map((freeSearchAds) => (
                          <Col>
                            {freeSearchAds && (
                              <SearchFreeAdScreen
                                selectedCountry={selectedCountry}
                                selectedState={selectedState}
                                selectedCity={selectedCity}
                                freeSearchAds={freeSearchAds}
                              />
                            )}
                          </Col>
                        ))}

                        {paidSearchAds?.map((paidSearchAds) => (
                          <Col>
                            {paidSearchAds && (
                              <SearchPaidAdScreen
                                selectedCountry={selectedCountry}
                                selectedState={selectedState}
                                selectedCity={selectedCity}
                              />
                            )}
                          </Col>
                        ))}
                      </>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </div> */}

          <div>
            <AllPaidAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
            />
          </div>

          <div>
            <AllFreeAdScreen
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Marketplace;
