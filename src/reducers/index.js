import { combineReducers } from 'redux';
import authReducer from './authReducer';
import patenTrackReducer from './patenTrackReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  patenTrack: patenTrackReducer
});

export default rootReducer;