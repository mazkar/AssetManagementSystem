import * as ActionType from './actionTypes';

const initialState = {
  token: null,
  // 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsX25hbWUiOiJBZG1pbmlzdHJhdG9yIiwicm9sZSI6IkFkbWluIiwidXNlcl9pZCI6MTQ1LCJ1c2VyX25hbWUiOiJ0ZXN0aW5nMTIyM0BnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdLCJ2ZW5kb3JfaWQiOm51bGwsInBvc2l0aW9uIjoibWFuYWdlciIsImV4cCI6MTY0ODQ0ODA0OSwiYXV0aG9yaXRpZXMiOlsiQWRtaW4iXSwianRpIjoiMjkyNTEyNDctNWEyOC00MTk0LTlkYWYtMTU4NDJlZmI3MWI4IiwiY2xpZW50X2lkIjoic2VjdXJpdHktY2xpZW50In0.NB9Mf3lxDcYq2U8ZKEp38_bmCjK5qGF28ucRokC08eTuYWbiJs6J4h4yirLq8HIBZtvZlafisbWEOPOT4a6R-1014YrAssqlsncSdw8bKeCTEehs6ZsNUkrZhywnX_NicmE28O50UDpbCoHMaqIb-i2UUuymRxEAMLB0q1C2N1KjpnENjG88al89s-SdAfUGJL99TERLqWhXNH98Cs5xQAHnHISguowQHRtc_jqDeaIZkr0WrNxOPhPNActF8nGpcafWnhl5PrFXhgv7tRdX0e-s4CtFQ4qC6mSXrOCYeA-eVPekWCrBa_Nwsg6nD1dAptm0zqFSTjkfGEmzRKyqDA',
  isLoading: false,
  message: null,
  userData: null,
  tokenExpired: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Sign in
    case ActionType.AUTH_SIGN_IN:
      return {...state, isLoading: true};
    case ActionType.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.access_token,
        message: action.payload.message,
        isLoading: false,
        userData: action.payload.userData,
        tokenExpired: action.payload.tokenExpired,
      };
    case ActionType.AUTH_SIGN_IN_FAILURE:
      return {
        ...state,
        token: action.payload.access_token,
        message: action.payload.message,
        isLoading: false,
      };

    // Refresh token
    case ActionType.AUTH_REFRESH_TOKEN:
      return {...state, isLoading: true};
    case ActionType.AUTH_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        message: action.payload.message,
        isLoading: false,
        userData: action.payload.userData,
        tokenExpired: action.payload.tokenExpired,
      };
    case ActionType.AUTH_REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
      };

    // Sign out
    case ActionType.AUTH_SIGN_OUT:
      return {...state, isLoading: true};
    case ActionType.AUTH_SIGN_OUT_SUCCESS:
      return {
        ...initialState,
      };
    case ActionType.AUTH_SIGN_OUT_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
      };

    case 'resetReducer':
      return {...initialState};

    default:
      return state;
  }
};

export default authReducer;
