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

const getFormUrlHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }; 
};
var CancelToken = axios.CancelToken;
var cancel;

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

  static getDocuments() {
    return axios.get(`${base_api_url}/documents`, getHeader());
  }

  static getCompanies() {
    return axios.get(`${base_api_url}/companies`, getHeader());
  }

  static deleteCompany( name ) {
    return axios.delete(`${base_api_url}/companies/${name}`, getHeader());
  }

  static getSubCompanies( name ) {
    return axios.get(`${base_api_url}/companies/subcompanies/${name}`, getHeader());
  }

  static deleteSameCompany( name, parentCompanyName ) {
    return axios.delete(`${base_api_url}/companies/subcompanies/${name}/${parentCompanyName}`, getHeader());
  }

  static getUsers() {
    return axios.get(`${base_api_url}/users`, getHeader());
  }

  static getCharts(option) {
    return axios.get(`${base_api_url}/charts/${option}`, getHeader());
  }

  static getTimeLine() {
    return axios.get(`${base_api_url}/timeline`, getHeader());
  }

  static getFilterTimeLine(parent, label, depth) {
    return axios.get(`${base_api_url}/timeline/${parent}/${label}/${depth}`, getHeader());
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

  static getCollectionIllustration(rfID) {
    return axios.get(`${base_api_url}/collections/${rfID}/illustration`, getHeader());
  }

  static geteAssetsOutsourceByPatentNumber(patentNumber) {
    return axios.get(`${base_api_url}/assets/${patentNumber}/outsource`, getHeader());
  }

  static getSiteLogo() {
    return axios.get(`${base_api_url}/site_logo`, getHeader());
  }

  static findRecord(ID) {
    return axios.get(`${base_api_url}/record_item/${ID}`, getHeader());
  }

  static postRecordItems( data, type ) {
    return axios.post(`${base_api_url}/record_item/${type}`, data, getMultiFormUrlHeader());
  }

  static completeRecord( data, type ) {
    return axios.put(`${base_api_url}/record_item/${type}`, data, getMultiFormUrlHeader());
  }

  static updateComment( method, data, type, value ) {
    if(method == "PUT") {
      return axios.put(`${base_api_url}/comments/${type}/${value}`, data, getFormUrlHeader());
    } else {
      return axios.post(`${base_api_url}/comments/${type}/${value}`, data, getFormUrlHeader());
    }    
  }

  static updateUser( user, ID ) {
    return axios.put(`${base_api_url}/users/${ID}`, user, getFormUrlHeader());   
  }

  static addUser( user ) {
    return axios.post(`${base_api_url}/users`, user, getFormUrlHeader());   
  }

  static deleteUser( ID ) {
    return axios.delete(`${base_api_url}/users/${ID}`, getFormUrlHeader());   
  }

  static addLawyer( user ) {
    return axios.post(`${base_api_url}/company_lawyers`, user, getFormUrlHeader());   
  }

  static updateLawyer( user, ID ) {
    return axios.put(`${base_api_url}/company_lawyers/${ID}`, user, getFormUrlHeader());   
  }

  static deleteLawyer( ID ) {
    return axios.delete(`${base_api_url}/company_lawyers/${ID}`, getFormUrlHeader());   
  }

  static addDocument( document ) {
    return axios.post(`${base_api_url}/documents`, document, getMultiFormUrlHeader());   
  }

  static updateDocument( user, ID ) {
    return axios.put(`${base_api_url}/documents/${ID}`, user, getFormUrlHeader());   
  }

  static deleteDocument( ID ) {
    return axios.delete(`${base_api_url}/documents/${ID}`, getFormUrlHeader());   
  }

  static searchCompany( name ) {
    if (cancel != undefined) {
      cancel();
    }
    let header = getHeader();
    header['cancelToken'] = new CancelToken(function executor(c) {
      cancel = c;
    })
    console.log("header", header);
    return axios.get(`${base_api_url}/companies/search/${name}`, header);   
  }

  static cancelRequest () {
    if (cancel != undefined) {
      cancel();
    }
  }

  static addCompany( data) {
    return axios.post(`${base_api_url}/companies`, data, getMultiFormUrlHeader());
  }

  

}

export default PatenTrackApi;