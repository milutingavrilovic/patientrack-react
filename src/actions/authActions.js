import * as types from './actionTypes';
import AuthApi from '../api/authApi';
import jwt_decode from 'jwt-decode';

const setToken = async (token) => {
  return await localStorage.setItem('token', token);
};

export const loginSuccess = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    user
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
        dispatch(loginSuccess(decoded_token));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    return dispatch(signOutSuccess());
  };
};