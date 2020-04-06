import *as types from './actionTypes';
import PatientTrackApi from '../api/patientTrack';

export const setValidateCounter = (data) => {
  return {
    type: types.SET_VALIDATE_COUNTER,
    data
  };
};

export const getValidateCounter = () => {
  return dispatch => {
    PatientTrackApi
      .getValidateCounter()
      .then(res => {
        dispatch(setValidateCounter(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setOwnerData = (data) => {
  return {
    type: types.SET_OWNER_DATA,
    data
  };
};

export const getOwnerData = () => {
  return dispatch => {
    PatientTrackApi
      .getOwnerData()
      .then(res => {
        console.log('api',res);
        dispatch(setOwnerData(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setSecurData = (data) => {
  return {
    type: types.SET_SECUR_DATA,
    data
  };
};

export const getSecurData = () => {
  return dispatch => {
    PatientTrackApi
      .getSecurData()
      .then(res => {
        dispatch(setSecurData(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setOtherData = (data) => {
  return {
    type: types.SET_OTHER_DATA,
    data
  };
};

export const getOtherData = () => {
  return dispatch => {
    PatientTrackApi
      .getOtherData()
      .then(res => {
        dispatch(setOtherData(res.data));
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
    PatientTrackApi
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
    PatientTrackApi.getCustomerRFIDAssets()
      .then(res => {
        dispatch(setCustomerRFIDAssets(res.data))
      })
      .catch(err => {
        throw(err);
      });
  };
};

export const setFixItemCount = (data) => {
  return {
    type: types.SET_FIX_ITEM_COUNT,
    data
  };
};

export const getFixItemCount = () => {
  return dispatch => {
    PatientTrackApi
      .getFixItemCount()
      .then(res => {
        console.log(res);
        dispatch(setFixItemCount(res.data[0].count_items))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setRecordItemCount = (data) => {
  return {
    type: types.SET_RECORD_ITEM_COUNT,
    data
  }
};

export const getRecordItemCount = () => {
  return dispatch => {
    PatientTrackApi
      .getRecordItemCount()
      .then(res => {
        dispatch(setRecordItemCount(res.data[0].count_items));
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setFixItemList = (data) => {
  return {
    type: types.SET_FIX_ITEM_LIST,
    data
  }
};

export const getFixItemList = () => {
  return dispatch => {
    PatientTrackApi
      .getFixItemList()
      .then(res => {
        dispatch(setFixItemList(res.data));
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setRecordItemList = (data) => {
  return {
    type: types.SET_RECORD_ITEM_LIST,
    data
  }
};

export const getRecordItemList = () => {
  return dispatch => {
    PatientTrackApi
      .getRecordItemList()
      .then(res => {
        dispatch(setRecordItemList(res.data));
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
    PatientTrackApi
      .getMessagesCount()
      .then(res => {
        dispatch(setMessagesCount(res.data.count))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setNotificationsCount = (data) => {
  return {
    type: types.SET_NOTIFICATIONS_COUNT,
    data
  };
};

export const getNotificationsCount = () => {
  return dispatch => {
    PatientTrackApi
      .getNotificationsCount()
      .then(res => {
        dispatch(setNotificationsCount(res.data.count))
      })
      .catch(err => {
        throw(err);
      });
  }
};


export const setChartsTab1 = (data) => {
  return {
    type: types.SET_CHARTS_TAB1,
    data
  };
};

export const getChartsTab1 = () => {
  return dispatch => {
    PatientTrackApi
      .getChartsTab1()
      .then(res => {
        dispatch(setChartsTab1(res.data[0]))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setChartsTab2 = (data) => {
  return {
    type: types.SET_CHARTS_TAB2,
    data
  };
};

export const getChartsTab2 = () => {
  return dispatch => {
    PatientTrackApi
      .getChartsTab2()
      .then(res => {
        dispatch(setChartsTab2(res.data[0]))
      })
      .catch(err => {
        throw(err);
      });
  }
};

export const setChartsTab3 = (data) => {
  return {
    type: types.SET_CHARTS_TAB3,
    data
  };
};

export const getChartsTab3 = () => {
  return dispatch => {
    PatientTrackApi
      .getChartsTab3()
      .then(res => {
        dispatch(setChartsTab3(res.data[0]))
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
    PatientTrackApi.getTimeLine()
      .then(res => {
        dispatch(setTimeLine(res.data))
      })
      .catch(err => {
        throw err;
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
    return PatientTrackApi.getTransactions()
      .then(res => {
        dispatch(setTransactions(res.data));
      })
      .catch(err => {
        throw(err);
      });
  };
};