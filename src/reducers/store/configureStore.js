import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../index';

import jwt_decode from 'jwt-decode';
import { loginSuccess } from "../../actions/authActions";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

const token = localStorage.getItem('token');

if(token) {
  const decoded_token = jwt_decode(token);
  store.dispatch(loginSuccess(decoded_token));
}
export default store;