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
    case types.SET_VALIDATE_COUNTER_LOADING:
      return {
        ...state,
        validateCounterLoading: action.data
      };
    case types.SET_CUSTOMERS:
      return {
        ...state,
        customersData: Object.assign({}, {
          ...state.customersData,
          [action.customerType]: action.data
        })
      };
    case types.SET_CUSTOMERS_LOADING:
      return {
        ...state,
        customersLoading: action.data
      };
    case types.SET_ASSETS_COUNT:
      return {
        ...state,
        assetsCount: action.data
      };
    case types.SET_ASSETS_COUNT_LOADING:
      return {
        ...state,
        assetsCountLoading: action.data
      };
    case types.SET_CUSTOMERS_NAME_COLLECTIONS:
      return {
        ...state,
        customersNamesCollections: Object.assign({}, {
          ...state.customersNamesCollections,
          [action.name]: [...action.data]
        })
      };
    case types.SET_CUSTOMERS_NAME_COLLECTIONS_LOADING:
      return {
        ...state,
        customersNameCollectionsLoading: action.data
      };
    case types.SET_CUSTOMER_RFID_ASSETS:
      return {
        ...state,
        customersRFIDAssets: Object.assign({}, {
          ...state.customersRFIDAssets,
          [action.rfID]: [...action.data]
        })
      };
    case types.SET_LAWYERS_LIST:
      return {
        ...state,
        lawyerList: [...action.data]
      };
    case types.SET_CUSTOMER_RFID_ASSETS_LOADING:
      return {
        ...state,
        customersRFIDAssetsLoading: action.data
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
    case types.SET_RECORD_ITEMS_LOADING:
      return {
        ...state,
        recordItemsLoading: action.data
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
    case types.SET_CHARTS_LOADING:
      return {
        ...state,
        chartsLoading: action.data
      };
    case types.SET_TIME_LINE:
      return {
        ...state,
        timeLine: action.data
      };
    case types.SET_TIME_LINE_LOADING:
      return {
        ...state,
        timeLineLoading: action.data
      };
    case types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.data
      };
    case types.SET_TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: action.data
      };
    case types.SET_COMMENTS:
      return {
        ...state,
        comments: action.data
      };
    case types.SET_COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: action.data
      };
    case types.SET_ASSETS:
      return {
        ...state,
        assets: action.data
      };
    case types.SET_ASSETS_LOADING:
      return {
        ...state,
        assetsLoading: action.data
      };
    case types.SET_ASSETS_OUTSOURCE:
      return {
        ...state,
        assetsOutsource: action.data
      };
    case types.SET_ASSETS_OUTSOURCE_LOADING:
      return {
        ...state,
        assetsOutsourceLoading: action.data
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
    case types.SET_CUR_TREE_LEVEL1:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel1: action.data
          };
        })
      };
    case types.INIT_CUR_TREE_LEVEL1:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel1: ''
          };
        })
      };
    case types.SET_CUR_TREE_LEVEL2:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel2: action.data
          };
        })
      };
    case types.INIT_CUR_TREE_LEVEL2:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel2: ''
          };
        })
      };
    case types.SET_CUR_TREE_LEVEL3:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel3: action.data
          };
        })
      };
    case types.INIT_CUR_TREE_LEVEL3:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel3: ''
          };
        })
      };
    case types.SET_CUR_TREE_LEVEL4:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel4: action.data
          };
        })
      };
    case types.INIT_CUR_TREE_LEVEL4:
      return {
        ...state,
        curTree: state.curTree.map((item, index) => {
          if(index !== action.tabId)
            return item;
          return {
            ...item,
            curTreeLevel4: ''
          };
        })
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
    case types.SET_PDF_TAB:
      return {
        ...state,
        pdfTab: action.payload
      };
    case types.SET_SHARE_URL:
      return {
        ...state,
        shareUrl: action.url
      };
    default:
      return state;
  }
};

export default patenTrackReducer;