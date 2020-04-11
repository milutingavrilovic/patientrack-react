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
    PatenTrackApi
      .getValidateCounter()
      .then(res => {
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

export const getCustomers = (type) => {
  return dispatch => {
    PatenTrackApi
      .getCustomers(type)
      .then(res => {
        dispatch(setCustomers(type, res.data));
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
    PatenTrackApi
      .getAssetsCount()
      .then(res => {
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
    PatenTrackApi
      .getTransactions()
      .then(res => {
        dispatch(setTransactions(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setCustomersNameCollections = (data) => {
  return {
    type: types.SET_CUSTOMERS_NAME_COLLECTIONS,
    data
  }
};

export const getCustomersNameCollections = () => {
  return dispatch => {
    PatenTrackApi
      .getCustomersNameCollections()
      .then(res => {
        dispatch(setCustomersNameCollections(res.data))
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setCustomerRFIDAssets = (data) => {
  return {
    type: types.SET_CUSTOMER_RFID_ASSETS,
    data
  };
};

export const getCustomerRFIDAssets = () => {
  return dispatch => {
    PatenTrackApi.getCustomerRFIDAssets()
      .then(res => {
        dispatch(setCustomerRFIDAssets(res.data))
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
  return dispatch => {
    PatenTrackApi
      .getRecordItems(type, option)
      .then(res => {
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
    PatenTrackApi
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
    PatenTrackApi
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

export const getCharts = (option) => {
  return dispatch => {
    PatenTrackApi
      .getCharts(option)
      .then(res => {
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
  return dispatch => {
    PatenTrackApi.getTimeLine()
      .then(res => {
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
    PatenTrackApi.getComments(type, value)
      .then(res => {
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
    PatenTrackApi.getAssetsByPatentNumber(patentNumber)
      .then(res => {
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
    PatenTrackApi.geteAssetsOutsourceByPatentNumber(patentNumber)
      .then(res => {
        dispatch(setAssetsOutsource(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};
