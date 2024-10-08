// App.js
import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import React, { useContext } from "react";
import { Container } from "react-bootstrap";
// This is a react-router-dom@5.3.4 app
// import { useHistory  } from 'react-router'
import { BrowserRouter as Router, Route } from "react-router-dom";
// import styled, {  createGlobalStyle, ThemeProvider} from "styled-components"

import Header from "./components/Header";
import Footer from "./components/Footer"; 
import Time from "./components/Time";
// import OrderSuccessPage from "./components/OrderSuccessPage";
// import HomeScreen from "./components/screens/HomeScreen";
// import ProductScreen from "./components/screens/ProductScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import LoginScreen from "./components/screens/LoginScreen";
// import CartScreen from "./components/screens/CartScreen";
// import CheckoutScreen from "./components/screens/CheckoutScreen";
// import PaymentScreen from "./components/screens/PaymentScreen";
// import ShipmentScreen from "./components/screens/ShipmentScreen";
// import ReviewScreen from "./components/screens/ReviewScreen";
// import AddReviewScreen from "./components/screens/AddReviewScreen";
// import EditReviewScreen from "./components/screens/EditReviewScreen";
// import CreditPointScreen from "./components/screens/CreditPointScreen";
import LiveChatScreen from "./components/screens/LiveChatScreen";
import FeedbackScreen from "./components/screens/FeedbackScreen";
import DarkModeScreen from "./components/screens/DarkModeScreen";
import TermsAndConditionScreen from "./components/screens/TermsAndConditionScreen";
import PrivacyPolicyScreen from "./components/screens/PrivacyPolicyScreen";
import DeleteAccountGuideScreen from "./components/screens/DeleteAccountGuideScreen";
import AppVersionScreen from "./components/screens/AppVersionScreen";

import SendEmailOtp from "./components/emailOtp/SendEmailOtp";
import VerifyEmailOtp from "./components/emailOtp/VerifyEmailOtp";

// import VerifyAccountFundOtp from "./components/payment/VerifyAccountFundOtp";

import UserProfile from "./components/profiles/UserProfile";

import DeleteAccount from "./components/profiles/DeleteAccount";
import ChangePassword from "./components/profiles/ChangePassword";
import ResetPasswordRequest from "./components/profiles/ResetPasswordRequest";
import ResetPassword from "./components/profiles/ResetPassword";
import Orders from "./components/profiles/Orders";
import Payments from "./components/profiles/Payments";
import Inbox from "./components/profiles/Inbox";

import UserDashboard from "./components/profiles/UserDashboard";
import CreditPoint from "./components/profiles/CreditPoint";
import EcommerceDashboard from "./components/ecommerce/EcommerceDashboard";

import AdminDashboard from "./components/admin/AdminDashboard";
import CreditPointAdmin from "./components/admin/CreditPointAdmin";
import Sellers from "./components/admin/Sellers";

import MarketplaceDashboard from "./components/marketplace/MarketplaceDashboard";
import Marketplace from "./components/marketplace/Marketplace";
import PostFreeAd from "./components/marketplace/PostFreeAd";
import PostPaidAd from "./components/marketplace/PostPaidAd";
import CreateMarketplaceSeller from "./components/marketplace/CreateMarketplaceSeller";
import SellerPhoto from "./components/marketplace/SellerPhoto";
import PaidAdProductDetail from "./components/marketplace/PaidAdProductDetail";
import FreeAdProductDetail from "./components/marketplace/FreeAdProductDetail";
import PaidAdScreen from "./components/marketplace/PaidAdScreen";
import BuyerPaidAdMessage from "./components/marketplace/BuyerPaidAdMessage";
import BuyerFreeAdMessage from "./components/marketplace/BuyerFreeAdMessage";
import SellerPaidAdMessage from "./components/marketplace/SellerPaidAdMessage";
import SellerFreeAdMessage from "./components/marketplace/SellerFreeAdMessage";
import EditPaidAd from "./components/marketplace/EditPaidAd";
import SellerShopFront from "./components/marketplace/SellerShopFront";
import EditFreeAd from "./components/marketplace/EditFreeAd";
import SearchResults from "./components/marketplace/SearchResults";
import CurrentAds from "./components/marketplace/CurrentAds";
// import SellerInbox from "./components/marketplace/SellerInbox";
import Billing from "./components/marketplace/Billing";

import CreateSupportTicket from "./components/support/CreateSupportTicket";
import UserReplySupportTicket from "./components/support/UserReplySupportTicket";
import AdminReplySupportTicket from "./components/support/AdminReplySupportTicket";
import SupportTicket from "./components/support/SupportTicket";

import IdleLogout from "./IdleLogout";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      {/* <Router forceRefresh={true}> */}
      <IdleLogout />
      <Container fluid>
        {/* <section class="container-fliud"> */}
        <Header userInfo={userInfo} />
        <Time />
        <main className=" py-3">
          {/* <Route exact path="/" component={HomeScreen} /> */}
          {/* <Route path="/product/:id" component={ProductScreen} /> */}
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          {/* <Route path="/cart/:id?" component={CartScreen} /> */}
          {/* <Route path="/products/search/:keyword" component={SearchScreen} /> */}
          {/* <Route path="/checkout" component={CheckoutScreen} /> */}
          {/* <Route path="/payment" component={PaymentScreen} /> */}

          {/* <Route path="/shipment/:id" component={ShipmentScreen} /> */}
          {/* <Route path="/favourites" component={FavouritesScreen} /> */}
          <Route path="/send-email-otp" component={SendEmailOtp} />
          <Route path="/verify-email-otp" component={VerifyEmailOtp} />
          {/* <Route path="/verify-account-fund-otp" component={VerifyAccountFundOtp} /> */}
          {/* <Route
            path="/order-success/:reference"
            component={OrderSuccessPage}
          /> */}
          <Route
            path="/terms-and-conditions"
            component={TermsAndConditionScreen}
          />

          <Route path="/privacy-policy" component={PrivacyPolicyScreen} />
          <Route
            path="/account-deletion-guide"
            component={DeleteAccountGuideScreen}
          />
          <Route path="/apps/" component={AppVersionScreen} />

          <Route path="/user/profile" component={UserProfile} />
          <Route path="/delete-account" component={DeleteAccount} />
          <Route path="/change-password" component={ChangePassword} />
          <Route
            path="/reset-password-request"
            component={ResetPasswordRequest}
          />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/orders" component={Orders} />
          <Route path="/payments" component={Payments} />

          <Route path="/dashboard/users" component={UserDashboard} />

          <Route
            path="/dashboard/ecommerce/sellers"
            component={EcommerceDashboard}
          />
          <Route path="/dashboard/admin" component={AdminDashboard} />

          <Route path="/user/cps/" component={CreditPoint} />
          <Route path="/admin/cps/" component={CreditPointAdmin} />
          <Route path="/admin/sellers/" component={Sellers} />
          {/* <Route path="/add-review/:orderItemId" component={AddReviewScreen} /> */}
          {/* <Route path="/edit-review/" component={EditReviewScreen} /> */}
          {/* <Route path="/credit-point/" component={CreditPointScreen} /> */}
          <Route
            path="/create-support-ticket"
            component={CreateSupportTicket}
          />
          <Route
            path="/user-reply-support-ticket/:id"
            component={UserReplySupportTicket}
          />
          <Route
            path="/admin-reply-support-ticket/:id"
            component={AdminReplySupportTicket}
          />
          <Route path="/support/tickets/" component={SupportTicket} />

          <Route path="/inbox" component={Inbox} />
          <Route path="/live-chat" component={LiveChatScreen} />
          <Route path="/create-feedback" component={FeedbackScreen} />
          <Route path="/dark-mode" component={DarkModeScreen} />

          <Route
            path="/dashboard/marketplace/sellers"
            component={MarketplaceDashboard}
          />
          <Route path="/" component={Marketplace} exact />
          <Route path="/ad/free" component={PostFreeAd} />
          <Route path="/ad/paid" component={PostPaidAd} />
          <Route
            path="/promoted-ad-detail/:id"
            component={PaidAdProductDetail}
          />
          <Route path="/free-ad-detail/:id" component={FreeAdProductDetail} />
          <Route path="/paid-ad-screen" component={PaidAdScreen} />

          <Route
            path="/buyer/paid/ad/message/:id"
            component={BuyerPaidAdMessage}
          />
          <Route
            path="/buyer/free/ad/message/:id"
            component={BuyerFreeAdMessage}
          />
          <Route
            path="/seller/paid/ad/message/:id"
            component={SellerPaidAdMessage}
          />
          <Route
            path="/seller/free/ad/message/:id"
            component={SellerFreeAdMessage}
          />

          <Route path="/edit/paid/ad/:id" component={EditPaidAd} />
          <Route path="/edit/free/ad/:id" component={EditFreeAd} />
          <Route
            path="/shopfront/:seller_username"
            component={SellerShopFront}
          />
          <Route path="/current-ads" component={CurrentAds} />
          {/* <Route path="/seller-inbox" component={SellerInbox} /> */}
          <Route path="/billing" component={Billing} />
          <Route path="/search-ad/" component={SearchResults} />
          <Route
            path="/create-marketplace-seller"
            component={CreateMarketplaceSeller}
          />
          <Route path="/seller/photo/" component={SellerPhoto} />
        </main>
        <Footer />
        {/* </section> */}
      </Container>
    </Router>
  );
}

export default App;
