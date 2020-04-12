import *as types from './actionTypes';
import PatenTrackApi from '../api/patenTrack';

export const setValidateCounter = (data) => {
  return {
    type: types.SET_VALIDATE_COUNTER,
    data
  };
};

export const getValidateCounter = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getValidateCounter()
      .then(res => {
        dispatch(setIsLoading(false));
        dispatch(setValidateCounter(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};


export const setCustomers = (customerType, data) => {
  return {
    type:types.SET_CUSTOMERS,
    customerType,
    data
  };
};

const getNameCollections = async (data, dispatch) => {
  const func = () => {
    for ( let i = 0; i < data.length; i ++ ) {
      for( let j = 0 ; j < data[i].child.length; j ++) {
        dispatch(getCustomersNameCollections(data[i].child[j].name));
      }
    }
  };
  return await func();
};

export const getCustomers = (type) => {
  setIsLoading(true);
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getCustomers(type)
      .then(res => {
        getNameCollections(res.data, dispatch)
          .then(() => {
            dispatch(setCustomers(type, res.data));
            dispatch(setIsLoading(true));
          });
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

export const getAssetsCount = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getAssetsCount()
      .then(res => {
        dispatch(setIsLoading(false));
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

export const getTransactions = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getTransactions()
      .then(res => {
        dispatch(setIsLoading(false));
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

const getRFIDAssets = async (data, dispatch) => {
  const func = () => {
    for(let i = 0 ; i < data.length; i ++) {
      dispatch(getCustomerRFIDAssets(data[i].rf_id));
    }
  };
  return await func();
};


export const getCustomersNameCollections = (name) => {
 return dispatch => {
    PatenTrackApi
      .getCustomersNameCollections(name)
      .then(res => {
        getRFIDAssets(res.data, dispatch)
          .then(() => {
            dispatch(setCustomersNameCollections(name, res.data));
          });
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

export const getCustomerRFIDAssets = (rfID) => {
  return dispatch => {
    PatenTrackApi.getCustomerRFIDAssets(rfID)
      .then(res => {
        dispatch(setCustomerRFIDAssets(rfID, res.data));
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

export const getRecordItems = (type, option) => {
  setIsLoading(true);
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getRecordItems(type, option)
      .then(res => {
        dispatch(setIsLoading(false));
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
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getMessages('count')
      .then(res => {
        dispatch(setIsLoading(false));
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
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getAlerts('count')
      .then(res => {
        dispatch(setIsLoading(false));
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

export const getCharts = (option) => {
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi
      .getCharts(option)
      .then(res => {
        dispatch(setIsLoading(false));
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

export const getTimeLine = () => {
  setIsLoading(true);
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi.getTimeLine()
      .then(res => {
        dispatch(setIsLoading(false));
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

export const getComments = (type, value) => {
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi.getComments(type, value)
      .then(res => {
        dispatch(setIsLoading(false));
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

export const getAssets = (patentNumber) => {
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi.getAssetsByPatentNumber(patentNumber)
      .then(res => {
        dispatch(setIsLoading(false));
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

export const getAssetsOutsource = (patentNumber) => {
  return dispatch => {
    dispatch(setIsLoading(true));
    PatenTrackApi.geteAssetsOutsourceByPatentNumber(patentNumber)
      .then(res => {
        dispatch(setIsLoading(false));
        dispatch(setAssetsOutsource(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setIsLoading = (data) => {
  return {
    type: types.SET_IS_LOADING,
    data
  };
};