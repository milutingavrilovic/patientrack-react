import axios from 'axios';

const ROOT_URL = '/json';

class PatientTrackApi {

  //actual url: /dashboard/validity_counter
  static getValidateCounter() {
    return axios.get(`${ROOT_URL}/api-1.json`);
  }

  //actual url: /customers/ownership
  static getOwnerData() {
    return axios.get(`${ROOT_URL}/api-2.json`);
  }

  //actual url:  /customers/security
  static getSecurData() {
    return axios.get(`${ROOT_URL}/api-3.json`);
  }

  //actual url: /customers/other
  static getOtherData() {
    return axios.get(`${ROOT_URL}/api-4.json`);
  }

  //actual url: /customers/:name/collections
  static getCustomersNameCollections() {
    return axios.get(`${ROOT_URL}/Customers_Name_Collections.json`);
  }

  //actual url: /customers/:rf_id/assets
  static getCustomerRFIDAssets() {
    return axios.get(`${ROOT_URL}/Customers_RfID_Assets.json`);
  }

  //actual url: /record_item/:type/:option   =>type: ‘0’, option: ‘count’
  static getFixItemCount() {
    return axios.get(`${ROOT_URL}/api-8.json`);
  }

  //actual url: /record_item/:type/:option   =>type: ‘1’, option: ‘count’
  static getRecordItemCount() {
    return axios.get(`${ROOT_URL}/api-9.json`);
  }

  //actual url: /record_item/:type/:option   =>type: ‘0’, option: ‘list’
  static getFixItemList() {
    return axios.get(`${ROOT_URL}/api-10.json`);
  }

  //actual url: /record_item/:type/:option   =>type: ‘1’, option: ‘list’
  static getRecordItemList() {
    return axios.get(`${ROOT_URL}/api-11.json`);
  }

  //actual url: /messages/:type
  static getMessagesCount() {
    return axios.get(`${ROOT_URL}/api-19.json`);
  }

  //actual url: /notifications/:type
  static getNotificationsCount() {
    return axios.get(`${ROOT_URL}/api-20.json`);
  }

  //actual url:  /charts/tab1
  static getChartsTab1() {
    return axios.get(`${ROOT_URL}/api-15.json`);
  }

  //actual url:  /charts/tab1
  static getChartsTab2() {
    return axios.get(`${ROOT_URL}/api-16.json`);
  }

  //actual url:  /charts/tab1
  static getChartsTab3() {
    return axios.get(`${ROOT_URL}/api-17.json`);
  }

  //actual url: /timeline
  static getTimeLine() {
    return axios.get(`${ROOT_URL}/api-5.json`);
  }

  //actual url: /transactions/:type
  static getTransactions() {
    return axios.get(`${ROOT_URL}/api-13.json`);
  }
}

export default PatientTrackApi;