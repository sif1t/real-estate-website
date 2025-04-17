import { combineReducers } from 'redux';
import propertiesReducer from './propertiesReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
  properties: propertiesReducer,
  auth: authReducer,
  ui: uiReducer,
});

export default rootReducer;