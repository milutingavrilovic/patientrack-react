import * as types from '../actions/actionTypes';
import initialState from './initialState';

const patenTrackReducer = (state = initialState.patient, action) => {
  switch (action.type) {
    case types.INIT_STAGE:
      return {
        ...initialState.patient
      };    
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
      const params = action.tabId == 0 ? 'employee' : action.tabId == 1 ? 'ownership' : action.tabId == 2 ? 'security' : 'other';
      const newItems = [...state.customersData[params]];
      const parentIndex = newItems.findIndex(x => x.id == action.parentNode);
      const childIndex = newItems[parentIndex].child.findIndex(x => x.id == action.currentNode);
      newItems[parentIndex].child[childIndex]['child'] = [...action.data]
      console.log("newItems1", newItems);
      return {
        ...state,
        customersData: Object.assign({}, {
          ...state.customersData,
          [params]: [...newItems]
        })
      }
      /*return {
        ...state,
        customersNamesCollections: Object.assign({}, {
          ...state.customersNamesCollections,
          [action.name]: [...action.data]
        })
      };*/
    case types.SET_CUSTOMERS_NAME_COLLECTIONS_LOADING:      
      return {
        ...state,
        customersNameCollectionsLoading: action.data
      };
      
    case types.SET_CUSTOMER_RFID_ASSETS:
      const propIndex = action.tabId == 0 ? 'employee' : action.tabId == 1 ? 'ownership' : action.tabId == 2 ? 'security' : 'other';
      const oldItems = [...state.customersData[propIndex]];
      const parentNode = oldItems.findIndex(x => x.id == action.parentNode);
      const parentNode2 = oldItems[parentNode].child.findIndex(x => x.id == action.parentNode1);
      const childNode = oldItems[parentNode].child[parentNode2].child.findIndex(x => x.id == action.currentNode);
      oldItems[parentNode].child[parentNode2].child[childNode]['child'] = [...action.data]
      console.log("newItems2", oldItems);
      return {
        ...state,
        customersData: Object.assign({}, {
          ...state.customersData,
          [propIndex]: [...oldItems]
        })
      }
      /*return {
        ...state,
        customersRFIDAssets: Object.assign({}, {
          ...state.customersRFIDAssets,
          [action.rfID]: [...action.data]
        })
      };*/
    case types.SET_LAWYERS_LIST:
      return {
        ...state,
        lawyerList: [...action.data]
      };
    case types.SET_DOCUMENTS_LIST:
      return {
        ...state,
        documentList: [...action.data]
      };
    case types.SET_COMPANIES_LIST:
      return {
        ...state,
        companiesList: [...action.data]
      };
    case types.SET_USERS_LIST:
      return {
        ...state,
        userList: [...action.data]
      };
    case types.SET_USERS_LIST_LOADING:
      return {
        ...state,
        userListLoading: action.data
      };
    case types.SET_EDIT_ROW:
      return {
        ...state,
        user_edit_row: action.payload
      };
    case types.SET_DELETE_ROW:
      return {
        ...state,
        user_delete_row: action.payload
      };
    case types.SET_DOCUMENT_UPDATE_ROW:
      console.log("DOCUMENTROW");
      return {
        ...state,
        update_document_row: action.row
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
    case types.SET_COMMENT_SAVED:
      return {
        ...state,
        commentMessage: action.message
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
    case types.SET_COMPANY_TREE_OPEN:
      return {
        ...state,
        company_tree: Object.assign({}, {
          ...state.company_tree,
          [action.key]: action.value
        })
      }; 
    case types.RESET_COMPANY_TREE:
      return {
        ...state,
        company_tree: {}
      };       
    case types.SET_CURRENT_ASSET:
      return {
        ...state,
        currentAsset: action.data
      };
    case types.SET_CURRENT_COLLECTION_ID:
      return {
        ...state,
        selectedRFID: action.data
      };
    case types.SET_SUB_COMPANIES:
      return {
        ...state,
        childCompanies: Object.assign({}, {
          ...state.childCompanies,
          [action.name]: action.data
        })
      };
    case types.SET_MAIN_COMPANY_SELECTED:
      return {
        ...state,
        main_company_selected: action.payload
      };
    case types.SET_SUB_COMPANY_SELECTED_NAME:
      return {
        ...state,
        searchCompaniesSelected: action.name
      };
    case types.SET_SEARCH_COMPANY_SELECTED:
      return {
        ...state,
        search_companies_selected: action.name
      };
    case types.SET_SETTING_TEXT:
      return {
        ...state,
        settingText: action.name
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
    case types.SET_SEARCH_COMPANY:
      return {
        ...state,
        searchCompanies: action.list
      };
    case types.SET_SEARCH_COMPANY_LOADING:
      return {
        ...state,
        searchCompanyLoading: action.payload
      };
    case types.SET_COMPANY_LOADING:
      return {
        ...state,
        companyListLoading: action.payload
      };
    case types.SET_DOCUMENT_ITEMS_LOADING:
      return {
        ...state,
        documentListLoading: action.payload
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
    case types.SET_SETTING_TAB:
      return {
        ...state,
        settingTab: action.payload
      };
    case types.SET_ILLUSTRATION_URL:
      return {
        ...state,
        illustrationUrl: action.illustrationUrl
      };
    default:
      return state;
  }
};

export default patenTrackReducer;