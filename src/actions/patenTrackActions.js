import *as types from './actionTypes';
import PatenTrackApi from '../api/patenTrack';

export const setValidateCounter = (data) => {
  return {
    type: types.SET_VALIDATE_COUNTER,
    data
  };
};

export const setValidateLoading = (data) => {
  return {
    type: types.SET_VALIDATE_COUNTER_LOADING,
    data
  };
};

export const getValidateCounter = (flag) => {
  return dispatch => {
    dispatch(setValidateLoading(true));
    return PatenTrackApi
      .getValidateCounter()
      .then(res => {
        if (flag) {
          dispatch(setValidateLoading(false));
          dispatch(setValidateCounter(res.data));
        }
      })
      .catch(err=> {
        throw(err);
      });
  };
};


export const setCustomers = (customerType, data) => {
  return {
    type: types.SET_CUSTOMERS,
    customerType,
    data
  };
};

export const setCustomersLoading = (data) => {
  return {
    type: types.SET_CUSTOMERS_LOADING,
    data
  };
};

export const getCustomers = (type, flag) => {
  return dispatch => {
    dispatch(setCustomersLoading(true));
    return PatenTrackApi
      .getCustomers(type)
      .then(res => {
        if (flag) {
          dispatch(setCustomers(type, res.data));
          dispatch(setCustomersLoading(false));
        }
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setAssetsCount = (data) => {
  return {
    type: types.SET_ASSETS_COUNT,
    data
  };
};

export const setAssetCountLoading = (data) => {
  return {
    type: types.SET_ASSETS_COUNT_LOADING,
    data
  };
};

export const getAssetsCount = (flag) => {
  return dispatch => {
    dispatch(setAssetCountLoading(true));
    return PatenTrackApi
      .getAssetsCount()
      .then(res => {
        if (flag) {
          dispatch(setAssetCountLoading(false));
          dispatch(setAssetsCount(res.data));
        }
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setTransactions = (data) => {
  return {
    type: types.SET_TRANSACTIONS,
    data
  };
};

export const setTransactionsLoading = (data) => {
  return {
    type: types.SET_TRANSACTIONS_LOADING,
    data
  };
};

export const getTransactions = (flag) => {
  return dispatch => {
    dispatch(setTransactionsLoading(true));
    return PatenTrackApi
      .getTransactions()
      .then(res => {
        if (flag) {
          dispatch(setTransactionsLoading(false));
          dispatch(setTransactions(res.data));
        }
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setCustomersNameCollections = (name, tabId, parentNode, currentNode,  data) => {
  console.log("tabIdddddd", tabId);
  return {
    type: types.SET_CUSTOMERS_NAME_COLLECTIONS,
    name,
    tabId,
    parentNode,
    currentNode,
    data
  }
};

export const setCustomersNameCollectionsLoading = (data) => {
  return {
    type: types.SET_CUSTOMERS_NAME_COLLECTIONS_LOADING,
    data
  };
};

export const getCustomersNameCollections = (name, tabId, parentNode, currentNode) => {
  console.log("tabIdddddd", tabId);
  return dispatch => {
    dispatch(setCustomersNameCollectionsLoading(true));
    return PatenTrackApi
      .getCustomersNameCollections(name)
      .then(res => {
        console.log("tabId", tabId);
        dispatch(setCustomersNameCollections(name, tabId, parentNode, currentNode, res.data));
        dispatch(setCustomersNameCollectionsLoading(false));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setCustomerRFIDAssets = (rfID, tabId, parentNode, parentNode1, currentNode, data) => {
  return {
    type: types.SET_CUSTOMER_RFID_ASSETS,
    rfID,
    tabId, 
    parentNode, 
    parentNode1, 
    currentNode,
    data
  };
};

export const setCustomersRFIDAssetsLoading = (data) => {
  return {
    type: types.SET_CUSTOMER_RFID_ASSETS_LOADING,
    data
  };
};

export const getCustomerRFIDAssets = (rfID, tabId, parentNode, parentNode1, currentNode) => {
  return dispatch => {
    dispatch(setCustomersRFIDAssetsLoading(true));
    return PatenTrackApi.getCustomerRFIDAssets(rfID)
      .then(res => {
        dispatch(setCustomerRFIDAssets(rfID, tabId, parentNode, parentNode1, currentNode, res.data));
        dispatch(setCustomersRFIDAssetsLoading(false));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setRecordItems = (itemType, itemOption, data) => {
  return {
    type: types.SET_RECORD_ITEMS,
    itemType,
    itemOption,
    data
  };
};

export const setRecordItemsLoading = (data) => {
  return {
    type: types.SET_RECORD_ITEMS_LOADING,
    data
  };
};

export const getRecordItems = (type, option, flag) => {
  console.log("option", option);
  return dispatch => {
    dispatch(setRecordItemsLoading(true));
    return PatenTrackApi
      .getRecordItems(type, option)
      .then(res => {
        if (flag) {
          dispatch(setRecordItemsLoading(false));
          dispatch(setRecordItems(type, option, res.data))
        }
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const postRecordItems = (data, type) => {
  return dispatch => {
    return PatenTrackApi
      .postRecordItems(data, type)
      .then(res => {        
        if(typeof res == "object") {
          console.log(res);
          if(typeof res.data !== "undefined" && typeof res.data.share_url !== "undefined") {
            //dispatch(setShareUrl( res.data.share_url ));
            let body  = `${res.data.comment} \n\n\n ${res.data.document} \n\n\n ${res.data.share_url}`;
            window.open(`mailto:${res.data.email_address}?subject=Fix it&body=${encodeURIComponent(body)}`,"_BLANK");
          } else {
            //
          }
        }
        dispatch(getRecordItems(type, 'count', 1))
        dispatch(getRecordItems(type, 'list', 1))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const completeRecord = (data, type) => {
  return dispatch => {
    return PatenTrackApi
      .completeRecord(data, type)
      .then(res => {   
        dispatch(getRecordItems(type, 'count', 1))
        dispatch(getRecordItems(type, 'list', 1))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setLawyerItems = (data) => {
  return {
    type: types.SET_LAWYERS_LIST,
    data
  };
};

export const getLawyers = (flag) => {
  return dispatch => {    
    return PatenTrackApi
      .getLawyers()
      .then(res => {
        if (flag)
          dispatch(setLawyerItems(res.data))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const addLawyer = ( user ) => {
  return dispatch => {    
    return PatenTrackApi
      .addLawyer( user )
      .then(res => {
        console.log("userAdded", res);  
        dispatch(getLawyers());
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const updateLawyer = ( user, ID ) => {
  return dispatch => {    
    return PatenTrackApi
      .updateLawyer( user, ID )
      .then(res => {
        dispatch(setEditRow(true));
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const deleteLawyer = ( ID ) => {
  return dispatch => {    
    return PatenTrackApi
      .deleteLawyer( ID )
      .then(res => {
        dispatch(setDeleteRow(true));
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const setDocumentItems = (data) => {
  return {
    type: types.SET_DOCUMENTS_LIST,
    data
  };
};

export const setDocumentsLoading = (t) => {
  return {
    type: types.SET_DOCUMENT_ITEMS_LOADING,
    payload: t
  };
};

export const getDocuments = (flag) => {
  return dispatch => {    
    return PatenTrackApi
      .getDocuments()
      .then(res => {
        dispatch(setDocumentItems(res.data))          
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const addDocument = ( document ) => {
  return dispatch => {    
    dispatch(setDocumentsLoading(true));
    return PatenTrackApi
      .addDocument( document )
      .then(res => {
        dispatch(setDocumentsLoading(false));
        dispatch(getDocuments());
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const updateDocumentRow = (row) => {
  return {
    type: types.SET_DOCUMENT_UPDATE_ROW,
    row
  };
};

export const updateDocument = ( user, ID ) => {
  return dispatch => {    
    return PatenTrackApi
      .updateDocument( user, ID )
      .then(res => {
        dispatch(setEditRow(true));
        dispatch(updateDocumentRow(res.data));
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const deleteDocument = ( ID ) => {
  return dispatch => {    
    return PatenTrackApi
      .deleteDocument( ID )
      .then(res => {
        dispatch(setDeleteRow(true));
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const setCompanies = (data) => {
  return {
    type: types.SET_COMPANIES_LIST,
    data
  };
};

export const setCompanyLoading = ( t ) => {
  return {
    type: types.SET_COMPANY_LOADING,
    payload: t
  };
};

export const getCompanies = () => {
  return dispatch => {    
    dispatch(setCompanyLoading(true));
    return PatenTrackApi
      .getCompanies()
      .then(res => {
          dispatch(setCompanyLoading(false));
          dispatch(setCompanies(res.data))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const deleteCompany = (name) => {
  return dispatch => {
    return PatenTrackApi.deleteCompany(name)
      .then(res => {
        dispatch(getCompanies());
      })
      .catch(err => {
        throw( err );
      });
  };
};

export const setMainCompanyChecked = ( t ) => {
  return {
    type: types.SET_MAIN_COMPANY_SELECTED,
    payload: t
  };
};

export const setSelectedCompany = ( name ) => {
  return {
    type: types.SET_SUB_COMPANY_SELECTED_NAME,
    name
  };
};

export const setSearchCompanyLoading = ( t ) => {
  return {
    type: types.SET_SEARCH_COMPANY_LOADING,
    payload: t
  };
};

export const setSearchCompanies = ( data ) => {
  return {
    type: types.SET_SEARCH_COMPANY,
    list: data
  };
};



export const cancelRequest = ( ) => {
  return dispatch => {    
    dispatch(setSearchCompanyLoading(false));
    PatenTrackApi.cancelRequest();
    dispatch(setSearchCompanyLoading(false));
    dispatch(setSearchCompanies([]))
  }
};


export const searchCompany = ( name ) => {
  return dispatch => {    
    dispatch(setSearchCompanyLoading(true));
    return PatenTrackApi
      .searchCompany( name )
      .then(res => {        
          dispatch(setSearchCompanyLoading(false));
          console.log("res.data", res.data);
          dispatch(setSearchCompanies(res.data))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const addCompany = (data) => {
  return dispatch => {
    return PatenTrackApi
      .addCompany(data)
      .then(res => {        
        if(typeof res == "object") {
          console.log(res.data);          
        }
        dispatch(getCompanies());
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setUsers = (data) => {
  return {
    type: types.SET_USERS_LIST,
    data
  };
};

export const setUsersLoading = (data) => {
  return {
    type: types.SET_USERS_LIST_LOADING,
    data
  };
};

export const getUsers = () => {
  return dispatch => {    
    dispatch(setUsersLoading(true));
    return PatenTrackApi
      .getUsers()
      .then(res => {
        dispatch(setUsers(res.data))    
        
        dispatch(setUsersLoading(false));
      })
      .catch(err => {
        dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const setEditRow = (data) => {
  return {
    type: types.SET_EDIT_ROW,
    payload: data
  };
};

export const updateUser = ( user, ID ) => {
  return dispatch => {    
    return PatenTrackApi
      .updateUser( user, ID )
      .then(res => {
        console.log("editUser", res);  
        dispatch(setEditRow(true));
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const addUser = ( user ) => {
  return dispatch => {    
    return PatenTrackApi
      .addUser( user )
      .then(res => {
        console.log("userAdded", res);  
        dispatch(getUsers());
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};



export const setDeleteRow = (data) => {
  return {
    type: types.SET_DELETE_ROW,
    payload: data
  };
};

export const deleteUser = ( ID ) => {
  return dispatch => {    
    return PatenTrackApi
      .deleteUser( ID )
      .then(res => {
        console.log("DELETEUSER", res);  
        dispatch(setDeleteRow(true));
      })
      .catch(err => {
        //dispatch(setUsersLoading(false));
        throw(err);
      });
  }
};

export const setCurrentWidget = (data) => {
  return {
    type: types.SET_CURRENT_WIDGET,
    data
  };
};



export const initStage = () => {
  return {
    type: types.INIT_STAGE,
  };
};

export const changeWidthAndHeight = (screenHeight, screenWidth) => {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight,
    screenWidth
  };
};

export const initEnvironment = () => {
  return dispatch => {
    dispatch(initStage());
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    }
  };
};

export const setMessagesCount = (data) => {
  return {
    type: types.SET_MESSAGES_COUNT,
    data
  };
};

export const getMessagesCount = () => {
  return dispatch => {
    return PatenTrackApi
      .getMessages('count')
      .then(res => {
        dispatch(setMessagesCount(res.data.count))
      })
      .catch(err => {
        throw(err);
      });
  }
};


export const setAlertsCount = (data) => {
  return {
    type: types.SET_ALERTS_COUNT,
    data
  };
};

export const getAlertsCount = () => {
  return dispatch => {
    return PatenTrackApi
      .getAlerts('count')
      .then(res => {
        dispatch(setAlertsCount(res.data.count))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setCharts = (option, data) => {
  return {
    type: types.SET_CHARTS,
    option,
    data
  };
};

export const setChartsLoading = (data) => {
  return {
    type: types.SET_CHARTS_LOADING,
    data
  };
};

export const getCharts = (option, flag) => {
  return dispatch => {
    dispatch(setChartsLoading(true));
    return PatenTrackApi
      .getCharts(option)
      .then(res => {
        if (flag) {
          dispatch(setChartsLoading(false));
          dispatch(setCharts(option, res.data[0]))
        }
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setTimeLine = (data) => {
  return {
    type: types.SET_TIME_LINE,
    data
  };
};

export const setTimeLineLoading = (data) => {
  return {
    type: types.SET_TIME_LINE_LOADING,
    data
  };
};

export const getTimeLine = (flag) => {
  return dispatch => {
    dispatch(setTimeLineLoading(true));
    return PatenTrackApi.getTimeLine()
      .then(res => {
        if (flag) {
          dispatch(setTimeLineLoading(false));
          dispatch(setTimeLine(res.data))
        }
      })
      .catch(err => {
        throw err;
      });
  };
};

export const getFilterTimeLine = ( grandParent, label, depth ) => {
  setTimeLineLoading(true);
  return dispatch => {
    dispatch(setTimeLineLoading(true));
    return PatenTrackApi.getFilterTimeLine( grandParent, label, depth )
      .then(res => {
        dispatch(setTimeLineLoading(false));
        dispatch(setTimeLine(res.data))
      })
      .catch(err => {
        throw err;
      });
  };
};

export const setIllustrationUrl = (url) => {
  return {
    type: types.SET_ILLUSTRATION_URL,
    illustrationUrl: url
  };
};

export const setComments = (data) => {
  return {
    type: types.SET_COMMENTS,
    data
  };
};

export const setCommentsLoading = (data) => {
  return {
    type: types.SET_COMMENTS_LOADING,
    data
  };
};

export const getComments = (type, value) => {
  return dispatch => {
    dispatch(setCommentsLoading(true));
    return PatenTrackApi.getComments(type, value)
      .then(res => {
        dispatch(setCommentsLoading(false));
        dispatch(setComments(res.data))
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const commentSaved = (message) => {
  return {
    type: types.SET_COMMENT_SAVED,
    message: message
  };
}

export const updateComment = ( comment, method, type, value ) => {  
  return dispatch => {
  return PatenTrackApi.updateComment(method, comment, type, value)
      .then(res => {
        console.log(res);
        dispatch(commentSaved(res.data));
        dispatch(getComments(type, value));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setAssets = (data) => {
  return {
    type: types.SET_ASSETS,
    data
  };
};

export const setAssetsLoading = (data) => {
  return {
    type: types.SET_ASSETS_LOADING,
    data
  };
};

export const getAssets = (patentNumber) => {
  return dispatch => {
    dispatch(setAssetsLoading(true));
    return PatenTrackApi.getAssetsByPatentNumber(patentNumber)
      .then(res => {
        dispatch(setAssetsLoading(false));
        dispatch(setIllustrationUrl("./d3/index.html"));
        dispatch(setAssets(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const getCollectionIllustration = (rfID) => {
  return dispatch => {
    dispatch(setAssetsLoading(true));
    return PatenTrackApi.getCollectionIllustration(rfID)
      .then(res => {
        dispatch(setAssetsLoading(false));
        dispatch(setIllustrationUrl("./d3/index.html"));
        dispatch(setAssets(res.data));
      })
      .catch(err => {
        throw(err);
      });
    };
};

export const setAssetsOutsource = (data) => {
  return {
    type: types.SET_ASSETS_OUTSOURCE,
    data
  };
};

export const setAssetsOutsourceLoading = (data) => {
  return {
    type: types.SET_ASSETS_OUTSOURCE_LOADING,
    data
  };
};

export const getAssetsOutsource = (patentNumber) => {
  return dispatch => {
    dispatch(setAssetsOutsourceLoading(true));
    return PatenTrackApi.geteAssetsOutsourceByPatentNumber(patentNumber)
      .then(res => {
        dispatch(setAssetsOutsourceLoading(false));
        dispatch(setAssetsOutsource(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setSubCompanies = (data, name) => {
  return {
    type: types.SET_SUB_COMPANIES,
    data,
    name
  };
};

export const getSubCompanies = (name) => {
  return dispatch => {
    return PatenTrackApi.getSubCompanies(name)
      .then(res => {
        dispatch(setSubCompanies(res.data, name));
      })
      .catch(err => {
        throw(err);
      });
  };
}; 

export const deleteSameCompany = (name, parentCompany) => {
  return dispatch => {
    return PatenTrackApi.deleteSameCompany(name, parentCompany)
      .then(res => {
        /*dispatch(getSubCompanies( parentCompany ));*/
        dispatch(getCompanies());
      })
      .catch(err => {
        throw( err );
      });
  };
};

export const setCompanyTreeOpen = (key, value) => {
  return {
    type: types.SET_COMPANY_TREE_OPEN,
    key,
    value
  };
};

export const resetCompanyTree = () => {
  return {
    type: types.RESET_COMPANY_TREE,
  };
};

export const setTreeOpen = (key, value) => {
  return {
    type: types.SET_TREE_OPEN,
    key,
    value
  };
};

export const setCurrentAsset = (data) => {
  return {
    type: types.SET_CURRENT_ASSET,
    data
  };
};


export const setCurrentCollectionID = (data) => {
  return {
    type: types.SET_CURRENT_COLLECTION_ID,
    data
  };
};

export const setSiteLogo = (data) => {
  return {
    type: types.SET_SITE_LOGO,
    data
  };
};

export const getSiteLogo = () => {
  return dispatch => {
    return PatenTrackApi.getSiteLogo()
      .then(res => {
        dispatch(setSiteLogo(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setCurTreeLevel1 = (tabId, data) => {
  return {
    type: types.SET_CUR_TREE_LEVEL1,
    tabId,
    data
  };
};

export const initCurTreeLevel1 = (tabId) => {
  return {
    type: types.SET_CUR_TREE_LEVEL1,
    tabId
  };
};

export const setCurTreeLevel2 = (tabId, data) => {
  return {
    type: types.SET_CUR_TREE_LEVEL2,
    tabId,
    data
  };
};

export const initCurTreeLevel2 = (tabId) => {
  return {
    type: types.SET_CUR_TREE_LEVEL2,
    tabId
  };
};

export const setCurTreeLevel3 = (tabId, data) => {
  return {
    type: types.SET_CUR_TREE_LEVEL3,
    tabId,
    data
  };
};

export const initCurTreeLevel3 = (tabId) => {
  return {
    type: types.SET_CUR_TREE_LEVEL3,
    tabId
  };
};

export const setCurTreeLevel4 = (tabId, data) => {
  return {
    type: types.SET_CUR_TREE_LEVEL4,
    tabId,
    data
  };
};

export const initCurTreeLevel4 = (tabId) => {
  return {
    type: types.SET_CUR_TREE_LEVEL4,
    tabId
  };
};

export const setNestGridTabIndex = (index) => {
  return {
    type: types.SET_NESTGRID_TAB,
    payload: index
  };
};

export const setTimelineTabIndex = (index) => {
  return {
    type: types.SET_TIMELINE_TAB,
    payload: index
  };
};

export const setChartTabIndex = (index) => {
  return {
    type: types.SET_CHART_TAB,
    payload: index
  };
};

export const setFixItTabIndex = (index) => {
  return {
    type: types.SET_FIXIT_TAB,
    payload: index
  };
};

export const setRecordItTabIndex = (index) => {
  return {
    type: types.SET_RECORDIT_TAB,
    payload: index
  };
};

export const setPdfTabIndex = (index) => {
  return {
    type: types.SET_PDF_TAB,
    payload: index
  };
};

export const setSettingTabIndex = (index) => {
  return {
    type: types.SET_SETTING_TAB,
    payload: index
  };
};

