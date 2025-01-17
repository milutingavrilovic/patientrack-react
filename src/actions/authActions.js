import * as types from './actionTypes';
import AuthApi from '../api/authApi';
import jwt_decode from 'jwt-decode';

import { initEnvironment } from "./patenTrackActions";

const setToken = async (token) => {
  return await localStorage.setItem('token', token);
};

export const loginSuccess = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
};

export const authEmailSuccess = (sent) => {
  return {
    type: types.AUTH_EMAIL_SUCCESS,
    sent: sent
  };
};

export const codeAuthenticatSuccess = (code) => {
  return {
    type: types.AUTH_CODE_SUCCESS,
    isLoadingReset: false,
    code
  };
};

export const passwordResetSuccess = (code) => {
  return {
    type: types.PASSWORD_RESET_SUCCESS,
    isLoadingReset: true,
    code: '',
    password_reset: true
  };
};

export const signOutSuccess = () => {
  return {
    type: types.SIGN_OUT_SUCCESS
  };
};

export const setProfile = (data) => {
  return {
    type: types.SET_PROFILE,
    data
  };
};

export const getProfile = () => {
  return dispatch => {
    return AuthApi.getProfile()
      .then(res => {
        dispatch(setProfile(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const login = (user) => {
  return (dispatch) => {
    return AuthApi.signIn(user)
      .then(res => {
        setToken(res.data.accessToken);
        const decoded_token = jwt_decode(res.data.accessToken);
        dispatch(initEnvironment());
        dispatch(loginSuccess(decoded_token));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const forget = (user) => {
  return (dispatch) => {
    return AuthApi.forget(user)
      .then(res => {
        dispatch(authEmailSuccess(true));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const checkCode = (code) => {
  return (dispatch) => {
    return AuthApi.checkCode(code)
      .then(res => {
        dispatch(codeAuthenticatSuccess(res.data.token));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const passwordReset = (user) => {
  return (dispatch) => {
    return AuthApi.password_reset(user)
      .then(res => {
        dispatch(passwordResetSuccess(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};


export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    console.log("SIGNOUT");
    return dispatch(signOutSuccess());
  };
};