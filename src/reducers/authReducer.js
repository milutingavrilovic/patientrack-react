import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.auth, action) => {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: Object.assign({}, action.user)
      };
    case types.AUTH_EMAIL_SUCCESS:
      return {
        ...state,
        authenticated: false,
        auth_email_sent: action.sent,
        user: Object.assign({}, {})
      };
    case types.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        authenticated: false,
        isLoadingReset: action.isLoadingReset,
        password_reset: action.password_reset,
        code: action.code,
      };
    case types.AUTH_CODE_SUCCESS:
      return {
        ...state,
        authenticated: false,
        isLoadingReset: action.isLoadingReset,
        code: action.code
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        redirect_page: true,
        authenticated: false,
        user: Object.assign({}, {})
      };
    case types.SET_PROFILE:
      return {
        ...state,
        profile: action.data
      };
    default:
      return state;
  }
};

export default authReducer;