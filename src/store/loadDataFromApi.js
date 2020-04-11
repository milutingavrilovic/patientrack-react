import {
  getAlertsCount, getAssets,
  getAssetsCount, getAssetsOutsource,
  getCharts, getComments,
  getCustomerRFIDAssets,
  getCustomers,
  getCustomersNameCollections,
  getMessagesCount,
  getRecordItems,
  getTimeLine,
  getTransactions,
  getValidateCounter,
} from "../actions/patenTrackActions";
import { getProfile } from "../actions/authActions";

const loadDataFromApi = (dispatch) => {
  dispatch(getProfile());
  dispatch(getValidateCounter());
  dispatch(getCustomers('ownership'));
  dispatch(getCustomers('security'));
  dispatch(getCustomers('other'));

  dispatch(getCustomersNameCollections());
  dispatch(getCustomerRFIDAssets());
  dispatch(getRecordItems(0, 'count'));
  dispatch(getRecordItems(0, 'list'));
  dispatch(getRecordItems(1, 'count'));
  dispatch(getRecordItems(1, 'list'));
  dispatch(getMessagesCount());
  dispatch(getAlertsCount());
  dispatch(getCharts('tab1'));
  dispatch(getCharts('tab2'));
  dispatch(getCharts('tab3'));
  dispatch(getTimeLine());
  dispatch(getTransactions());
  dispatch(getAssetsCount());
  dispatch(getComments('Asset', 7584265));
  dispatch(getAssets(10256979));
  dispatch(getAssetsOutsource(10256979));
};

export default loadDataFromApi;