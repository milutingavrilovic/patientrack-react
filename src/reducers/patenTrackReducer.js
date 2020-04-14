import * as types from '../actions/actionTypes';
import initialState from './initialState';

const patenTrackReducer = (state = initialState.patient, action) => {
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
    case types.SET_CUSTOMERS:
      return {
        ...state,
        customersData: Object.assign({}, {
          ...state.customersData,
          [action.customerType]: action.data
        })
      };
    case types.SET_ASSETS_COUNT:
      return {
        ...state,
        assetsCount: action.data
      };
    case types.SET_CUSTOMERS_NAME_COLLECTIONS:
      return {
        ...state,
        customersNamesCollections: Object.assign({}, {
          ...state.customersNamesCollections,
          [action.name]: [...action.data]
        })
      };
    case types.SET_CUSTOMER_RFID_ASSETS:
      return {
        ...state,
        customersRFIDAssets: Object.assign({}, {
          ...state.customersRFIDAssets,
          [action.rfID]: [...action.data]
        })
      };
    case types.SET_RECORD_ITEMS:
      return {
        ...state,
        recordItems: Object.assign({}, {
          ...state.recordItems,
          [action.itemType]: {
            ...state.recordItems[action.itemType],
            [action.itemOption]: action.data
          }
        })
      };
    case types.CHANGE_WIDTH_AND_HEIGHT:
      return {
        ...state,
        screenWidth: action.screenWidth,
        screenHeight: action.screenHeight
      };
    case types.SET_ALERTS_COUNT:
      return {
        ...state,
        alertsCount: action.data
      };
    case types.SET_MESSAGES_COUNT:
      return {
        ...state,
        messagesCount: action.data
      };
    case types.SET_CHARTS:
      return {
        ...state,
        charts: Object.assign({}, {
          ...state.charts,
          [action.option]: action.data
        })
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
    case types.SET_COMMENTS:
      return {
        ...state,
        comments: action.data
      };
    case types.SET_ASSETS:
      return {
        ...state,
        assets: action.data
      };
    case types.SET_ASSETS_OUTSOURCE:
      return {
        ...state,
        assetsOutsource: action.data
      };
    case types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.data
      };
    case types.SET_TREE_OPEN:
      return {
        ...state,
        tree: Object.assign({}, {
          ...state.tree,
          [action.key]: action.value
        })
      };
    case types.SET_CURRENT_ASSET:
      return {
        ...state,
        currentAsset: action.data
      };
    case types.SET_SITE_LOGO:
      return {
        ...state,
        siteLogo: action.data
      };
    case types.SET_NESTGRID_TAB:
      return {
        ...state,
        nestGridTab: action.payload
      };
    case types.SET_TIMELINE_TAB:
      return {
        ...state,
        timelineTab: action.payload
      };
    case types.SET_CHART_TAB:
      return {
        ...state,
        chartTab: action.payload
      };
    case types.SET_FIXIT_TAB:
      return {
        ...state,
        fixitTab: action.payload
      };
    case types.SET_RECORDIT_TAB:
      return {
        ...state,
        recorditTab: action.payload
      };
    default:
      return state;
  }
};

export default patenTrackReducer;