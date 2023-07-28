import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './containers/common/App/appSlice';
import studentReducer from './containers/admin/Student/studentSlice';
import courseReducer from '@/containers/admin/Course/courseSlice';

export const rootReducer = combineReducers({
  appReducer,
  studentReducer,
  courseReducer,
});
