import React from "react";
import ReactDOM from "react-dom"; 
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios"; 
import { logout } from "./actions/userActions";
// import showNotification from "./App"; 
// import { NotificationProvider } from "./components/Notification/NotificationContext"; 

// import { updateAccessToken } from './actions/userActions';

// // Check if the user is logged in and update the access token
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const accessToken = userInfoFromStorage ? userInfoFromStorage.access : null;

// if (accessToken) {
//   store.dispatch(updateAccessToken(accessToken));
// }

// Custom middleware to intercept API responses
const responseInterceptor = (response) => {
  if (response.status === 401) {
    // Token refresh failed or both access and refresh tokens have expired
    // Log out the user by clearing tokens and resetting authentication status
    localStorage.removeItem("userInfo");
    store.dispatch(logout()); // Dispatch your logout action, replace with your actual logout action if using Redux
    // Redirect to login page or display a message notifying the user they are logged out
    // showNotification("You are logged out.", "info"); 
    window.location.href = "/login";
  }
  return response;
}; 

// Attach the responseInterceptor to your API request function (e.g., using Axios)
axios.interceptors.response.use(
  responseInterceptor,
  (error) => {
    // Handle other errors, if any
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Provider store={store}>
    {/* <NotificationProvider /> */}
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import "./bootstrap.min.css";
// import { Provider } from "react-redux";
// import store from "./store";

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

// reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import './bootstrap.min.css';
// // import { BrowserRouter as Router } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <Router> */}
//     <App />
//     {/* </Router> */}
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
