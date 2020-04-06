import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

import jwt_decode from 'jwt-decode';
import { loginSuccess } from "../actions/authActions";
import {
  getCustomerRFIDAssets,
  getCustomersNameCollections,
  getFixItemCount,
  getFixItemList,
  getMessagesCount,
  getNotificationsCount,
  getOtherData,
  getOwnerData,
  getRecordItemCount,
  getRecordItemList,
  getSecurData,
  getValidateCounter,
  getChartsTab1,
  getChartsTab2,
  getChartsTab3, getTimeLine, getTransactions,
} from "../actions/patientTrackActions";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

store.dispatch(getValidateCounter());
store.dispatch(getOwnerData());
store.dispatch(getSecurData());
store.dispatch(getOtherData());
store.dispatch(getCustomersNameCollections());
store.dispatch(getCustomerRFIDAssets());
store.dispatch(getFixItemCount());
store.dispatch(getFixItemList());
store.dispatch(getRecordItemCount());
store.dispatch(getRecordItemList());
store.dispatch(getMessagesCount());
store.dispatch(getNotificationsCount());
store.dispatch(getChartsTab1());
store.dispatch(getChartsTab2());
store.dispatch(getChartsTab3());
store.dispatch(getTimeLine());
store.dispatch(getTransactions());

const token = localStorage.getItem('token');

if(token) {
  const decoded_token = jwt_decode(token);
  store.dispatch(loginSuccess(decoded_token));
}

export default store;