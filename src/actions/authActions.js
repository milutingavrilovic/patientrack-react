import * as types from './actionTypes';
import AuthApi from '../api/authApi';
import jwt_decode from 'jwt-decode';

export function signUpSuccess(user) {
  return {
    type: types.SIGN_UP_SUCCESS,
    user
  };
}

export function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

export function signOutSuccess() {
  return {
    type: types.SIGN_OUT_SUCCESS
  };
}

export function signUp(user) {
  console.log('authActions:', user);
  return function(dispatch) {
    return AuthApi.signUp(user)
      .then(res => {
        console.log(res.data);
        dispatch(login(user));
      })
  }
}

export function login(user) {
  return function(dispatch) {
    return dispatch(loginSuccess(user));
    // return AuthApi.signIn(user)
    //   .then(res => {
    //     localStorage.setItem('token', res.data.token);
    //     const decoded_token = jwt_decode(res.data.token);
    //
    //   })
  }
}

export function signOut() {
  return function(dispatch) {
    localStorage.removeItem('token');
    return dispatch(signOutSuccess());
  };
}