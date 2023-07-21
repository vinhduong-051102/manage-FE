import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './containers/App/appSlice';
import studentReducer from './containers/Student/studentSlice';
import courseReducer from '@/containers/Course/courseSlice';

export const rootReducer = combineReducers({
  appReducer,
  studentReducer,
  courseReducer,
});
