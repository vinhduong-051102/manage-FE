import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';
import {
  DefaultPayloadGetListType,
  DefaultResponseGetListType,
} from '@/utils/constants';

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const getListCourse = createAction<DefaultPayloadGetListType>(
  constants.GET_LIST_COURSE_ACTION,
);

export const getListCourseSuccess = createAction<DefaultResponseGetListType>(
  constants.GET_LIST_COURSE_SUCCESS,
);
