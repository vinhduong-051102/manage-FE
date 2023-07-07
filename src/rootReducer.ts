import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './containers/App/appSlice';
import studentReducer from './containers/Student/studentSlice';

export const rootReducer = combineReducers({
  appReducer,
  studentReducer,
});
