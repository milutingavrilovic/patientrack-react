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

export const getValidateCounter = () => {
  return dispatch => {
    dispatch(setValidateLoading(true));
    return PatenTrackApi
      .getValidateCounter()
      .then(res => {
        dispatch(setValidateLoading(false));
        dispatch(setValidateCounter(res.data));
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

export const getCustomers = (type) => {
  return dispatch => {
    dispatch(setCustomersLoading(true));
    return PatenTrackApi
      .getCustomers(type)
      .then(res => {
        dispatch(setCustomers(type, res.data));
        dispatch(setCustomersLoading(false));
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

export const getAssetsCount = () => {
  return dispatch => {
    dispatch(setAssetCountLoading(true));
    return PatenTrackApi
      .getAssetsCount()
      .then(res => {
        dispatch(setAssetCountLoading(false));
        dispatch(setAssetsCount(res.data));
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

export const getTransactions = () => {
  return dispatch => {
    dispatch(setTransactionsLoading(true));
    return PatenTrackApi
      .getTransactions()
      .then(res => {
        dispatch(setTransactionsLoading(false));
        dispatch(setTransactions(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setCustomersNameCollections = (name, data) => {
  return {
    type: types.SET_CUSTOMERS_NAME_COLLECTIONS,
    name,
    data
  }
};

export const setCustomersNameCollectionsLoading = (data) => {
  return {
    type: types.SET_CUSTOMERS_NAME_COLLECTIONS_LOADING,
    data
  };
};

export const getCustomersNameCollections = (name) => {
 return dispatch => {
    dispatch(setCustomersNameCollectionsLoading(true));
    return PatenTrackApi
      .getCustomersNameCollections(name)
      .then(res => {
        dispatch(setCustomersNameCollections(name, res.data));
        dispatch(setCustomersNameCollectionsLoading(false));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setCustomerRFIDAssets = (rfID, data) => {
  return {
    type: types.SET_CUSTOMER_RFID_ASSETS,
    rfID,
    data
  };
};

export const setCustomersRFIDAssetsLoading = (data) => {
  return {
    type: types.SET_CUSTOMER_RFID_ASSETS_LOADING,
    data
  };
};

export const getCustomerRFIDAssets = (rfID) => {
  return dispatch => {
    dispatch(setCustomersRFIDAssetsLoading(true));
    return PatenTrackApi.getCustomerRFIDAssets(rfID)
      .then(res => {
        dispatch(setCustomerRFIDAssets(rfID, res.data));
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

export const getRecordItems = (type, option) => {
  return dispatch => {
    dispatch(setRecordItemsLoading(true));
    return PatenTrackApi
      .getRecordItems(type, option)
      .then(res => {
        dispatch(setRecordItemsLoading(false));
        dispatch(setRecordItems(type, option, res.data))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const postRecordItems = (type, option) => {
  return dispatch => {
    dispatch(setRecordItemsLoading(true));
    return PatenTrackApi
      .getRecordItems(type, option)
      .then(res => {
        dispatch(setRecordItemsLoading(false));
        dispatch(setRecordItems(type, option, res.data))
      })
      .catch(err => {
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

export const changeWidthAndHeight = (screenHeight, screenWidth) => {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight,
    screenWidth
  };
};

export const initEnvironment = () => {
  return dispatch => {
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

export const getCharts = (option) => {
  return dispatch => {
    dispatch(setChartsLoading(true));
    return PatenTrackApi
      .getCharts(option)
      .then(res => {
        dispatch(setChartsLoading(false));
        dispatch(setCharts(option, res.data[0]))
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

export const getTimeLine = () => {
  return dispatch => {
    dispatch(setTimeLineLoading(true));
    return PatenTrackApi.getTimeLine()
      .then(res => {
        dispatch(setTimeLineLoading(false));
        dispatch(setTimeLine(res.data))
      })
      .catch(err => {
        throw err;
      });
  };
};

export const getFilterTimeLine = ( label, depth ) => {
  setTimeLineLoading(true);
  return dispatch => {
    dispatch(setTimeLineLoading(true));
    return PatenTrackApi.getFilterTimeLine( label, depth )
      .then(res => {
        dispatch(setTimeLineLoading(false));
        dispatch(setTimeLine(res.data))
      })
      .catch(err => {
        throw err;
      });
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
        return err;
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

export const setCurTreeLevel2 = (tabId, data) => {
  return {
    type: types.SET_CUR_TREE_LEVEL2,
    tabId,
    data
  };
};

export const setCurTreeLevel3 = (tabId, data) => {
  return {
    type: types.SET_CUR_TREE_LEVEL3,
    tabId,
    data
  };
};

export const setCurTreeLevel4 = (tabId, data) => {
  return {
    type: types.SET_CUR_TREE_LEVEL4,
    tabId,
    data
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

