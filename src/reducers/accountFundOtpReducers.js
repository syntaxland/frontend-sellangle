// accountFundOtpReducers.js
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  RESET_VERIFY_OTP_STATE,
  VERIFY_USD_OTP_REQUEST,
  VERIFY_USD_OTP_SUCCESS,
  VERIFY_USD_OTP_FAIL,
  RESET_VERIFY_USD_OTP_STATE,
} from "../constants/accountFundOtpConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const otpSendReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_OTP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SEND_OTP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const otpVerifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case VERIFY_OTP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_VERIFY_OTP_STATE:
      return {};
    default:
      return state;
  }
};

export const otpVerifyUsdPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_USD_OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_USD_OTP_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case VERIFY_USD_OTP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RESET_VERIFY_USD_OTP_STATE:
      return {};
    default:
      return state;
  }
};
