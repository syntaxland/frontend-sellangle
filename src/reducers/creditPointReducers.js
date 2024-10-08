// creditPointReducers.js
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

const initialState = {
  loading: false,
  success: false,
  error: null,
  creditPointRequest: [],
  creditPointRequests: [],
  creditPointAllRequests: [],
  creditPointBalance: [],
  creditPointPayments: [],
  creditPointAllPayments: [],

  creditPointEarnings: [],
  creditPoints: [],

  adCpsCharges: [],
};

export const sellangleFulfilledCpsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELLANGLE_FULFILLED_CPS_REQUEST:
      return { ...state, loading: true };
    case SELLANGLE_FULFILLED_CPS_SUCCESS:
      return { ...state, loading: false, success: true };
    case SELLANGLE_FULFILLED_CPS_FAIL:
      return { ...state, loading: false, error: action.payload };
    // case RESET_SELL_CPS_TO_SELLANGLE_STATE:
    //   return {};
    default:
      return state;
  }
};

export const getSellerSellCpsToSellangleReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_SELLER_SELL_CPS_TO_SELLANGLE_REQUEST:
      return { loading: true };
    case GET_SELLER_SELL_CPS_TO_SELLANGLE_SUCCESS:
      return { loading: false, success: true, creditPoints: action.payload };
    case GET_SELLER_SELL_CPS_TO_SELLANGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateCpsCheckoutLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CPS_CHECKOUT_LINK_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CPS_CHECKOUT_LINK_SUCCESS:
      return { ...state, loading: false, success: true };
    case UPDATE_CPS_CHECKOUT_LINK_FAIL:
      return { ...state, loading: false, error: action.payload };
    // case RESET_SELL_CPS_TO_SELLANGLE_STATE:
    //   return {};
    default:
      return state;
  }
};

export const getAllSellCpsToSellangleReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_ALL_SELL_CPS_TO_SELLANGLE_REQUEST:
      return { loading: true };
    case GET_ALL_SELL_CPS_TO_SELLANGLE_SUCCESS:
      return { loading: false, success: true, creditPoints: action.payload };
    case GET_ALL_SELL_CPS_TO_SELLANGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellCpsToSellangleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELL_CPS_TO_SELLANGLE_REQUEST:
      return { ...state, loading: true };
    case SELL_CPS_TO_SELLANGLE_SUCCESS:
      return { ...state, loading: false, success: true };
    case SELL_CPS_TO_SELLANGLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    // case RESET_SELL_CPS_TO_SELLANGLE_STATE:
    //   return {};
    default:
      return state;
  }
};

export const getUserCpsBonusesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CPS_BONUSES_REQUEST:
      return { loading: true };
    case GET_USER_CPS_BONUSES_SUCCESS:
      return { loading: false, success: true, creditPoints: action.payload };
    case GET_USER_CPS_BONUSES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAdCpsChargesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADS_CPS_CHARGES_REQUEST:
      return { loading: true };
    case GET_ADS_CPS_CHARGES_SUCCESS:
      return { loading: false, success: true, adCpsCharges: action.payload };
    case GET_ADS_CPS_CHARGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUsdBuyCreditPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USD_BUY_CREDIT_POINT_REQUEST:
      return { ...state, loading: true };
    case GET_USD_BUY_CREDIT_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        creditPoints: action.payload,
      };
    case GET_USD_BUY_CREDIT_POINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const buyUsdCreditPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_USD_CREDIT_POINT_REQUEST:
      return { ...state, loading: true };
    case BUY_USD_CREDIT_POINT_SUCCESS:
      return { ...state, loading: false, success: true };
    case BUY_USD_CREDIT_POINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESET_BUY_USD_CREDIT_POINT_STATE:
      return {};
    default:
      return state;
  }
};

export const getBuyerCreditPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYER_CREDIT_POINT_REQUEST:
      return { ...state, loading: true };
    case GET_BUYER_CREDIT_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        creditPoints: action.payload,
      };
    case GET_BUYER_CREDIT_POINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBuyCreditPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUY_CREDIT_POINT_REQUEST:
      return { ...state, loading: true };
    case GET_BUY_CREDIT_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        creditPoints: action.payload,
      };
    case GET_BUY_CREDIT_POINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellCreditPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELL_CREDIT_POINT_REQUEST:
      return { ...state, loading: true };
    case GET_SELL_CREDIT_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        creditPoints: action.payload,
      };
    case GET_SELL_CREDIT_POINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const buyCreditPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CREDIT_POINT_REQUEST:
      return { ...state, loading: true };
    case BUY_CREDIT_POINT_SUCCESS:
      return { ...state, loading: false, success: true };
    case BUY_CREDIT_POINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESET_BUY_CREDIT_POINT_STATE:
      return {};
    default:
      return state;
  }
};

export const sellCreditPointReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELL_CREDIT_POINT_REQUEST:
      return { ...state, loading: true };
    case SELL_CREDIT_POINT_SUCCESS:
      return { ...state, loading: false, success: true };
    case SELL_CREDIT_POINT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const creditPointRequestCreateReducer = (
//   state = initialState,
//   action
// ) => {
//   switch (action.type) {
//     case CREDIT_POINT_REQUEST_CREATE_REQUEST:
//       return { loading: true };
//     case CREDIT_POINT_REQUEST_CREATE_SUCCESS:
//       //   return { loading: false, success: true, creditPointRequest: action.payload };
//       return {
//         loading: false,
//         success: true,
//         creditPointRequest: action.payload,
//       };

//     case CREDIT_POINT_REQUEST_CREATE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const creditPointListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_LIST_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_LIST_SUCCESS:
      return { ...state, loading: false, creditPointRequests: action.payload };
    case CREDIT_POINT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointAllListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_ALL_LIST_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_ALL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        creditPointAllRequests: action.payload,
      };
    case CREDIT_POINT_ALL_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const creditPointBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDIT_POINT_BALANCE_REQUEST:
      return { ...state, loading: true };
    case CREDIT_POINT_BALANCE_SUCCESS:
      return { ...state, loading: false, creditPointBalance: action.payload };
    case CREDIT_POINT_BALANCE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const creditPointEarningsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREDIT_POINT_EARNINGS_REQUEST:
//       return { ...state, loading: true };
//     case CREDIT_POINT_EARNINGS_SUCCESS:
//       return { ...state, loading: false, creditPointEarnings: action.payload };
//     case CREDIT_POINT_EARNINGS_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const userCreditPointPaymentsReducer = (
//   state = initialState,
//   action
// ) => {
//   switch (action.type) {
//     case GET_USER_CREDIT_POINT_PAYMENTS_REQUEST:
//       return { ...state, loading: true };
//     case GET_USER_CREDIT_POINT_PAYMENTS_SUCCESS:
//       return { ...state, loading: false, creditPointPayments: action.payload };
//     case GET_USER_CREDIT_POINT_PAYMENTS_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const allCreditPointPaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CREDIT_POINT_PAYMENTS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_CREDIT_POINT_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        creditPointAllPayments: action.payload,
      };
    case GET_ALL_CREDIT_POINT_PAYMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
