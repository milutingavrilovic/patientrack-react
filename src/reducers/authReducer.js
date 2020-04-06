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
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: Object.assign({}, action.user)
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        user: Object.assign({}, {})
      };
    default:
      return state;
  }
};

export default authReducer;