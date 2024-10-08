// creditPointActions.js
// import axios from "axios";
import axios from "../axiosConfig";
import {
  // CREDIT_POINT_REQUEST_CREATE_REQUEST,
  // CREDIT_POINT_REQUEST_CREATE_SUCCESS,
  // CREDIT_POINT_REQUEST_CREATE_FAIL,
  CREDIT_POINT_LIST_REQUEST,
  CREDIT_POINT_LIST_SUCCESS,
  CREDIT_POINT_LIST_FAIL,
  CREDIT_POINT_ALL_LIST_REQUEST,  
  CREDIT_POINT_ALL_LIST_SUCCESS,
  CREDIT_POINT_ALL_LIST_FAIL,
  CREDIT_POINT_BALANCE_REQUEST,
  CREDIT_POINT_BALANCE_SUCCESS,
  CREDIT_POINT_BALANCE_FAIL,
  // GET_USER_CREDIT_POINT_PAYMENTS_REQUEST,
  // GET_USER_CREDIT_POINT_PAYMENTS_SUCCESS,
  // GET_USER_CREDIT_POINT_PAYMENTS_FAIL,
  GET_ALL_CREDIT_POINT_PAYMENTS_REQUEST,
  GET_ALL_CREDIT_POINT_PAYMENTS_SUCCESS,
  GET_ALL_CREDIT_POINT_PAYMENTS_FAIL,
  // CREDIT_POINT_EARNINGS_REQUEST,
  // CREDIT_POINT_EARNINGS_SUCCESS,
  // CREDIT_POINT_EARNINGS_FAIL,
  BUY_CREDIT_POINT_REQUEST,
  BUY_CREDIT_POINT_SUCCESS,
  BUY_CREDIT_POINT_FAIL,
  RESET_BUY_CREDIT_POINT_STATE,
  SELL_CREDIT_POINT_REQUEST,
  SELL_CREDIT_POINT_SUCCESS,
  SELL_CREDIT_POINT_FAIL,
  GET_BUY_CREDIT_POINT_REQUEST,
  GET_BUY_CREDIT_POINT_SUCCESS,
  GET_BUY_CREDIT_POINT_FAIL,
  GET_SELL_CREDIT_POINT_REQUEST,
  GET_SELL_CREDIT_POINT_SUCCESS,
  GET_SELL_CREDIT_POINT_FAIL,
  GET_BUYER_CREDIT_POINT_REQUEST,
  GET_BUYER_CREDIT_POINT_SUCCESS,
  GET_BUYER_CREDIT_POINT_FAIL,
  BUY_USD_CREDIT_POINT_REQUEST,
  BUY_USD_CREDIT_POINT_SUCCESS,
  BUY_USD_CREDIT_POINT_FAIL,
  RESET_BUY_USD_CREDIT_POINT_STATE,
  GET_USD_BUY_CREDIT_POINT_REQUEST,
  GET_USD_BUY_CREDIT_POINT_SUCCESS,
  GET_USD_BUY_CREDIT_POINT_FAIL,
  GET_ADS_CPS_CHARGES_REQUEST,
  GET_ADS_CPS_CHARGES_SUCCESS,
  GET_ADS_CPS_CHARGES_FAIL,
  GET_USER_CPS_BONUSES_REQUEST,
  GET_USER_CPS_BONUSES_SUCCESS,
  GET_USER_CPS_BONUSES_FAIL,
  SELL_CPS_TO_SELLANGLE_REQUEST,
  SELL_CPS_TO_SELLANGLE_SUCCESS,
  SELL_CPS_TO_SELLANGLE_FAIL,
  SELLANGLE_FULFILLED_CPS_REQUEST,
  SELLANGLE_FULFILLED_CPS_SUCCESS,
  SELLANGLE_FULFILLED_CPS_FAIL,
  GET_SELLER_SELL_CPS_TO_SELLANGLE_REQUEST,
  GET_SELLER_SELL_CPS_TO_SELLANGLE_SUCCESS,
  GET_SELLER_SELL_CPS_TO_SELLANGLE_FAIL,
  UPDATE_CPS_CHECKOUT_LINK_REQUEST,
  UPDATE_CPS_CHECKOUT_LINK_SUCCESS,
  UPDATE_CPS_CHECKOUT_LINK_FAIL,
  GET_ALL_SELL_CPS_TO_SELLANGLE_REQUEST,
  GET_ALL_SELL_CPS_TO_SELLANGLE_SUCCESS,
  GET_ALL_SELL_CPS_TO_SELLANGLE_FAIL,
} from "../constants/creditPointConstants";

import { API_URL } from "../config/apiConfig";

export const sellangleFulfilledCps =
  (cpsData) => async (dispatch, getState) => {
    try {
      dispatch({ type: SELLANGLE_FULFILLED_CPS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/sellangle-fulfilled-cps/`,
        cpsData,
        config
      );

      dispatch({ type: SELLANGLE_FULFILLED_CPS_SUCCESS, payload: data });
      // window.location.reload();
      // window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: SELLANGLE_FULFILLED_CPS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSellerSellCpsToSellangle = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELLER_SELL_CPS_TO_SELLANGLE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-seller-sell-cps-to-sellangle/`,

      config
    );

    dispatch({
      type: GET_SELLER_SELL_CPS_TO_SELLANGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_SELL_CPS_TO_SELLANGLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateCpsCheckoutLink =
  (cpsData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CPS_CHECKOUT_LINK_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/update-cps-checkout-link/`,
        cpsData,
        config
      );

      dispatch({ type: UPDATE_CPS_CHECKOUT_LINK_SUCCESS, payload: data });
      // window.location.reload();
      // window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: UPDATE_CPS_CHECKOUT_LINK_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getAllSellCpsToSellangle = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_SELL_CPS_TO_SELLANGLE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-sell-cps-to-sellangle/`,

      config
    );

    dispatch({
      type: GET_ALL_SELL_CPS_TO_SELLANGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SELL_CPS_TO_SELLANGLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sellCpsToSellangle = (cpsData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELL_CPS_TO_SELLANGLE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/sell-cps-to-sellangle/`,
      cpsData,
      config
    );

    dispatch({ type: SELL_CPS_TO_SELLANGLE_SUCCESS, payload: data });
    // window.location.reload();
    // window.location.href = "/dashboard/users";
  } catch (error) {
    dispatch({
      type: SELL_CPS_TO_SELLANGLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserCpsBonuses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_CPS_BONUSES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-cps-bonuses/`,

      config
    );

    dispatch({
      type: GET_USER_CPS_BONUSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_CPS_BONUSES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAdCpsCharges = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ADS_CPS_CHARGES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-ad-charges-cps/`,
      config
    );

    dispatch({
      type: GET_ADS_CPS_CHARGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADS_CPS_CHARGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUsdBuyCreditPoint = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USD_BUY_CREDIT_POINT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-usd-buy-credit-point/`,
      config
    );

    dispatch({ type: GET_USD_BUY_CREDIT_POINT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USD_BUY_CREDIT_POINT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getBuyerCreditPoint = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BUYER_CREDIT_POINT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-buyer-credit-point/`,
      config
    );

    dispatch({ type: GET_BUYER_CREDIT_POINT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BUYER_CREDIT_POINT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserBuyCreditPoint = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BUY_CREDIT_POINT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-buy-credit-point/`,
      config
    );

    dispatch({ type: GET_BUY_CREDIT_POINT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BUY_CREDIT_POINT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserSellCreditPoint = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SELL_CREDIT_POINT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-sell-credit-point/`,
      config
    );

    dispatch({ type: GET_SELL_CREDIT_POINT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SELL_CREDIT_POINT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const buyCreditPoint =
  (creditPointData) => async (dispatch, getState) => {
    try {
      dispatch({ type: BUY_CREDIT_POINT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/buy-credit-point/`,
        creditPointData,
        config
      );

      dispatch({ type: BUY_CREDIT_POINT_SUCCESS, payload: data });
      // window.location.reload();
      // window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: BUY_CREDIT_POINT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetbuyCreditPointState = () => (dispatch) => {
  dispatch({ type: RESET_BUY_CREDIT_POINT_STATE });
};

export const buyUsdCreditPoint =
  (creditPointData) => async (dispatch, getState) => {
    try {
      dispatch({ type: BUY_USD_CREDIT_POINT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/buy-usd-credit-point/`,
        creditPointData,
        config
      );

      dispatch({ type: BUY_USD_CREDIT_POINT_SUCCESS, payload: data });
      // window.location.reload();
      // window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: BUY_USD_CREDIT_POINT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const resetbuyUsdCreditPointState = () => (dispatch) => {
  dispatch({ type: RESET_BUY_USD_CREDIT_POINT_STATE });
};

export const sellCreditPoint =
  (creditPointData) => async (dispatch, getState) => {
    try {
      dispatch({ type: SELL_CREDIT_POINT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/sell-credit-point/`,
        creditPointData,
        config
      );

      dispatch({ type: SELL_CREDIT_POINT_SUCCESS, payload: data });
      // window.location.reload();
      // window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: SELL_CREDIT_POINT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// export const createCreditPointRequest = (creditPointRequest) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({ type: CREDIT_POINT_REQUEST_CREATE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.access}`,
//       },
//     };

//     const { data } = await axios.post(
//       `${API_URL}/api/credit-point-request/`,
//       creditPointRequest,
//       config
//     );

//     dispatch({ type: CREDIT_POINT_REQUEST_CREATE_SUCCESS, payload: data });
//     window.location.reload();
//     window.location.href = "/dashboard/users";
//   } catch (error) {
//     dispatch({
//       type: CREDIT_POINT_REQUEST_CREATE_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

export const getCreditPointList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREDIT_POINT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-credit-point/`,
      config
    );

    dispatch({ type: CREDIT_POINT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREDIT_POINT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllCreditPointRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREDIT_POINT_ALL_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-credit-point-requests/`,
      config
    );

    dispatch({ type: CREDIT_POINT_ALL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREDIT_POINT_ALL_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCreditPointBalance = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREDIT_POINT_BALANCE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-credit-point-balance/`,
      config
    );

    dispatch({ type: CREDIT_POINT_BALANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREDIT_POINT_BALANCE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const getCreditPointEarnings = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: CREDIT_POINT_EARNINGS_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.access}`,
//       },
//     };

//     const { data } = await axios.get(
//       `${API_URL}/api/get-user-credit-point-earnings/`,
//       config
//     );

//     dispatch({ type: CREDIT_POINT_EARNINGS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: CREDIT_POINT_EARNINGS_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const getUserCreditPointPayments = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: GET_USER_CREDIT_POINT_PAYMENTS_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.access}`,
//       },
//     };

//     const { data } = await axios.get(
//       `${API_URL}/api/get-user-credit-point-payments/`,
//       config
//     );

//     dispatch({ type: GET_USER_CREDIT_POINT_PAYMENTS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: GET_USER_CREDIT_POINT_PAYMENTS_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

export const getAllCreditPointPayments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CREDIT_POINT_PAYMENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-credit-point-payments/`,
      config
    );

    dispatch({ type: GET_ALL_CREDIT_POINT_PAYMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CREDIT_POINT_PAYMENTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
