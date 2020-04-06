import { combineReducers } from 'redux';
import authReducer from './authReducer';
import patientReducer from './patientReducer';

const rootReducer = combineReducers({
  authReducer,
  patientReducer
});

export default rootReducer;