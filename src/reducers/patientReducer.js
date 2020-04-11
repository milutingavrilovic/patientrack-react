import * as types from '../actions/actionTypes';
import initialState from './initialState';

const patientReducer = (state = initialState.patient, action) => {
  switch (action.type) {
    case types.SET_CURRENT_WIDGET:
      return {
        ...state,
        currentWidget: state.currentWidget === action.data ? 'all' : action.data
      };
    case types.SET_VALIDATE_COUNTER:
      return {
        ...state,
        validateCounter: Object.assign({}, action.data)
      };
    case types.SET_OWNER_DATA:
      return {
        ...state,
        ownerData: [...action.data]
      };
    case types.SET_SECUR_DATA:
      return {
        ...state,
        securData: [...action.data]
      };
    case types.SET_OTHER_DATA:
      return {
        ...state,
        otherData: [...action.data]
      };
    case types.SET_CUSTOMERS_NAME_COLLECTIONS:
      return {
        ...state,
        customersNamesCollections: [...action.data]
      };
    case types.SET_CUSTOMER_RFID_ASSETS:
      return {
        ...state,
        customersRFIDAssets: [...action.data]
      };
    case types.SET_FIX_ITEM_COUNT:
      return {
        ...state,
        fixItemCount: action.data
      };
    case types.SET_RECORD_ITEM_COUNT:
      return {
        ...state,
        recordItemCount: action.data
      };
    case types.SET_FIX_ITEM_LIST:
      return {
        ...state,
        fixItemList: action.data
      };
    case types.SET_RECORD_ITEM_LIST:
      return {
        ...state,
        recordItemList: action.data
      };
    case types.CHANGE_WIDTH_AND_HEIGHT:
      return {
        ...state,
        screenWidth: action.screenWidth,
        screenHeight: action.screenHeight
      };
    case types.SET_NOTIFICATIONS_COUNT:
      return {
        ...state,
        notificationsCount: action.data
      };
    case types.SET_MESSAGES_COUNT:
      return {
        ...state,
        messagesCount: action.data
      };
    case types.SET_CHARTS_TAB1:
      return {
        ...state,
        chartsTab1: action.data
      };
    case types.SET_CHARTS_TAB2:
      return {
        ...state,
        chartsTab2: action.data
      };
    case types.SET_CHARTS_TAB3:
      return {
        ...state,
        chartsTab3: action.data
      };
    case types.SET_TIME_LINE:
      return {
        ...state,
        timeLine: action.data
      };
    case types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.data
      };
    default:
      return state;
  }
};

export default patientReducer;