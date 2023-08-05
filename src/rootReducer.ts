import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './containers/common/App/appSlice';
import studentReducer from './containers/admin/Student/studentSlice';
import courseReducer from '@/containers/admin/Course/courseSlice';
import activeReducer from '@/containers/student/Active/activeSlice';
import registerReducer from '@/containers/student/Register/registerSlice';

export const rootReducer = combineReducers({
  appReducer,
  studentReducer,
  courseReducer,
  activeReducer,
  registerReducer,
});
