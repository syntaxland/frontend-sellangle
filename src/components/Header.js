// Headers.js
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  // Form,
} from "react-bootstrap";
import { logout } from "../actions/userActions";

import { getUserProfile } from "../actions/userProfileActions"; 
import { getUserMessages } from "../actions/messagingActions";
import {
  GetActiveBuyerFreeAdMessages,
  GetActiveBuyerPaidAdMessages,
  listBuyerFreeAdMessages,
  listBuyerPaidAdMessages,
} from "../actions/marketplaceSellerActions";
import { listSupportTicket } from "../actions/supportActions";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import logoImage from "../images/logo.png";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const getUserMessagesState = useSelector(
    (state) => state.getUserMessagesState
  );
  const { messages } = getUserMessagesState;
  // console.log("messages:", messages);

  // const [keyword, setKeyword] = useState("");
  const [greeting, setGreeting] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword.trim()) {
  //     history.push(`/products/search/${keyword}`);
  //   } else {
  //     history.push("/");
  //   }
  // };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting(`Good morning!`);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting(`Good afternoon!`);
    } else {
      setGreeting(`Good evening!`);
    }
  }, []);

  const handleSearchAds = () => {
    history.push("/search-ad/");
  };

  const msgCounted = messages?.reduce(
    (total, userMessages) => total + userMessages.msg_count,
    0
  );
  const listBuyerFreeAdMessagesState = useSelector(
    (state) => state.listBuyerFreeAdMessagesState
  );
  const { freeAdMessages } = listBuyerFreeAdMessagesState;

  const listBuyerPaidAdMessagesState = useSelector(
    (state) => state.listBuyerPaidAdMessagesState
  );
  const { paidAdMessages } = listBuyerPaidAdMessagesState;

  const msgFreeAdCounted = freeAdMessages?.reduce(
    (total, userMessages) => total + userMessages.seller_free_ad_msg_count,
    0
  );

  const msgPaidAdCounted = paidAdMessages?.reduce(
    (total, userMessages) => total + userMessages.seller_paid_ad_msg_count,
    0
  );

  const GetActiveBuyerFreeAdMessageState = useSelector(
    (state) => state.GetActiveBuyerFreeAdMessageState
  );
  const { activeBuyerFreeAdMessages } = GetActiveBuyerFreeAdMessageState;

  const GetActiveBuyerPaidAdMessageState = useSelector(
    (state) => state.GetActiveBuyerPaidAdMessageState
  );
  const { activeBuyerPaidAdMessages } = GetActiveBuyerPaidAdMessageState;

  const msgActiveFreeAdCounted = activeBuyerFreeAdMessages?.reduce(
    (total, userMessages) => total + userMessages.buyer_free_ad_msg_count,
    0
  );

  const msgActivePaidAdCounted = activeBuyerPaidAdMessages?.reduce(
    (total, userMessages) => total + userMessages.buyer_paid_ad_msg_count,
    0
  );

  // console.log("msgFreeAdCounted header:", msgFreeAdCounted);
  // console.log("msgPaidAdCounted header:", msgPaidAdCounted);

  const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { tickets } = listSupportTicketState;

  const supportMsgCounted = tickets?.reduce(
    (total, userMessages) => total + userMessages.user_msg_count,
    0
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
      dispatch(getUserMessages());
      dispatch(GetActiveBuyerFreeAdMessages());
      dispatch(GetActiveBuyerPaidAdMessages());
      dispatch(listBuyerFreeAdMessages());
      dispatch(listBuyerPaidAdMessages());

      dispatch(listSupportTicket());
    }
  }, [dispatch, userInfo]);

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            {/* <i className="fas fa-home" style={{ fontSize: "16px" }}></i> */}
            <img
              src={logoImage}
              alt="Sell Angle"
              style={{
                maxHeight: "40px",
                maxWidth: "80px",
                height: "auto",
                width: "auto",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            {/* <Form
              className="searchBarContainer d-flex flex-grow-1 mt-2"
              onSubmit={searchHandler}
              inline={!userInfo}
            >
              <Form.Control
                type="search"
                placeholder="Search products, brands or categories."
                className="mr-auto ml-auto rounded"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                    variant="primary"
                    className="rounded"
                    size="sm"
                    onClick={handleSearchAds} 
                  >
                    <div className="d-flex justify-content-center">
                      <span className="py-1">
                        Search Ads <i className="fas fa-search"></i>
                        </span>
                    </div>
                  </Button>
            </Form> */}

            <div className="searchBarContainer d-flex flex-grow-1 mt-2">
              <Button
                variant="primary"
                className="rounded"
                size="sm"
                onClick={handleSearchAds}
              >
                <div className="d-flex justify-content-center">
                  <span className="py-1">
                    Search Ads <i className="fas fa-search"></i>
                  </span>
                </div>
              </Button>
            </div>

            <div>
              <Nav className="mr-auto ml-auto">
                {userInfo ? (
                  <Nav.Link as={Link} to="/dashboard/users">
                    <i
                      className="fas fa-dashboard"
                      style={{ fontSize: "16px" }}
                    ></i>{" "}
                    Dashboard
                  </Nav.Link>
                ) : (
                  <span>
                    <Nav.Link as={Link} to="/login">
                      <i
                        className="fas fa-dashboard"
                        style={{ fontSize: "16px" }}
                      ></i>{" "}
                      Dashboard
                    </Nav.Link>
                  </span>
                )}
                <Nav.Link as={Link} to="#">
                  <>
                    <i
                      className="fas fa-handshake"
                      style={{ fontSize: "16px" }}
                    ></i>{" "}
                    <i>{greeting}</i>
                  </>
                  {userInfo && userInfo.avatar && (
                    <img
                      src={userInfo.avatar}
                      alt="Avatar"
                      className="avatar"
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Nav.Link>

                {userInfo ? (
                  <NavDropdown
                    className="profile-dropdown custom-dropdown"
                    align="end"
                    // title={
                    //   userInfo.first_name
                    //     ? userInfo.first_name.charAt(0).toUpperCase() +
                    //       userInfo.first_name.slice(1)
                    //     : ""
                    // }

                    title={userInfo?.username}
                    id="username"
                  >
                    {/* <Nav.Link as={Link} to="/dashboard/users">
                      <i
                        className="fas fa-dashboard"
                        style={{ fontSize: "16px" }}
                      ></i>{" "}
                      Dashboard (User)
                    </Nav.Link>
                     */}
                    <NavDropdown.Divider />

                    <div>
                      {profile.is_marketplace_seller ? (
                        <>
                          <Nav.Link
                            as={Link}
                            to="/dashboard/marketplace/sellers"
                          >
                            <i
                              className="fas fa-dashboard"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            Dashboard (Seller)
                          </Nav.Link>
                        </>
                      ) : (
                        <>
                          <div>
                            <Nav.Link as={Link} to="/create-marketplace-seller">
                              <i
                                className="fas fa-user"
                                style={{ fontSize: "16px" }}
                              ></i>{" "}
                              Create Seller Account
                            </Nav.Link>
                          </div>
                        </>
                      )}
                    </div>
                    <NavDropdown.Divider />

                    <div>
                      {profile.is_marketplace_seller ? (
                        <>
                          <Nav.Link as={Link} to="/ad/free">
                            <i
                              className="fas fa-plus"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            Post Free Ad
                          </Nav.Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <NavDropdown.Divider />

                    <div>
                      {profile.is_marketplace_seller ? (
                        <>
                          <Nav.Link as={Link} to="/current-ads">
                            <i
                              className="fas fa-ad"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            Current Ads
                          </Nav.Link>
                          <NavDropdown.Divider />

                          <Nav.Link as={Link} to="/billing">
                            <i
                              className="fas fa-money-bill"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            Billing
                          </Nav.Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <NavDropdown.Divider />

                    <div>
                      {userInfo ? (
                        <>
                          <Nav.Link as={Link} to="/inbox">
                            <i
                              className="fas fa-message"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            Inbox{" "}
                            {msgCounted +
                              msgPaidAdCounted +
                              msgFreeAdCounted +
                              msgActiveFreeAdCounted +
                              msgActivePaidAdCounted >
                              0 && (
                              <span className="msg-counter">
                                {msgCounted +
                                  msgPaidAdCounted +
                                  msgFreeAdCounted +
                                  msgActiveFreeAdCounted +
                                  msgActivePaidAdCounted}
                              </span>
                            )}
                          </Nav.Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <NavDropdown.Divider />

                    <div>
                      {userInfo ? (
                        <>
                          <Nav.Link as={Link} to="/support/tickets/">
                            <i
                              className="fas fa-question-circle"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            Support{" "}
                            {supportMsgCounted > 0 && (
                              <span className="msg-counter">
                                {supportMsgCounted}
                              </span>
                            )}
                          </Nav.Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <NavDropdown.Divider />

                    <div>
                      {profile.is_superuser || profile.is_staff ? (
                        <>
                          <Nav.Link as={Link} to="/dashboard/admin">
                            <i
                              className="fas fa-dashboard"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            Admin
                          </Nav.Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <NavDropdown.Divider />

                    {/* <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item> */}
                  </NavDropdown>
                ) : (
                  <>
                    {/* <Nav.Link as={Link} to="/login">
                      Sign in
                    </Nav.Link> */}
                  </>
                )}

                {!userInfo ? (
                  <Nav.Link as={Link} to="/login">
                    Login{" "}
                    <i
                      className="fa fa-sign-in"
                      style={{ fontSize: "16px" }}
                    ></i>
                  </Nav.Link>
                ) : (
                  <Nav.Link onClick={logoutHandler}>
                    Logout{" "}
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ fontSize: "16px" }}
                    ></i>
                  </Nav.Link>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
