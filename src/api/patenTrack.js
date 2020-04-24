import axios from 'axios';
import {base_api_url} from '../config/config';

const getHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-access-token': token
    }
  };  
};

const getMultiFormUrlHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data'
    }
  }; 
};

class PatenTrackApi {

  static getValidateCounter() {
    return axios.get(`${base_api_url}/dashboard/validity_counter`, getHeader());
  }

  static getCustomers(type) {
    return axios.get(`${base_api_url}/customers/${type}`, getHeader());
  }

  static getCustomersNameCollections(name='john') {
    return axios.get(`${base_api_url}/customers/${name}/collections`, getHeader());
  }

  static getCustomerRFIDAssets(rfID = '482080947') {
    return axios.get(`${base_api_url}/customers/${rfID}/assets`, getHeader());
  }

  static getAssetsCount(type='count') {
    return axios.get(`${base_api_url}/assets_info/${type}`, getHeader());
  }

  static getTransactions(type='count') {
    return axios.get(`${base_api_url}/transactions/${type}`, getHeader());
  }

  static getRecordItems(type, option) {
    return axios.get(`${base_api_url}/record_item/${type}/${option}`, getHeader());
  }

  static getLawyers() {
    return axios.get(`${base_api_url}/company_lawyers`, getHeader());
  }

  static getCharts(option) {
    return axios.get(`${base_api_url}/charts/${option}`, getHeader());
  }

  static getTimeLine() {
    return axios.get(`${base_api_url}/timeline`, getHeader());
  }

  static getFilterTimeLine(label, depth) {
    return axios.get(`${base_api_url}/timeline/${label}/${depth}`, getHeader());
  }

  static getMessages(type) {
    return axios.get(`${base_api_url}/messages/${type}`, getHeader());
  }

  static getAlerts(type) {
    return axios.get(`${base_api_url}/alerts/${type}`, getHeader());
  }

  static getComments(type, value) {
    return axios.get(`${base_api_url}/comments/${type}/${value}`, getHeader());
  }

  static getAssetsByPatentNumber(patentNumber) {
    return axios.get(`${base_api_url}/assets/${patentNumber}`, getHeader());
  }

  static geteAssetsOutsourceByPatentNumber(patentNumber) {
    return axios.get(`${base_api_url}/assets/${patentNumber}/outsource`, getHeader());
  }

  static getSiteLogo() {
    return axios.get(`${base_api_url}/site_logo`, getHeader());
  }

  static postRecordItems( data, type ) {
    return axios.post(`${base_api_url}/record_item/${type}`, data, getMultiFormUrlHeader());
  }
}

export default PatenTrackApi;