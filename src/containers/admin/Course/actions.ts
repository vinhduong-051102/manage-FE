import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';
import {
  DefaultPayloadGetListType,
  DefaultResponseGetListType,
} from '@/utils/constants';
import { PeriodType, WeekdayType } from '@/containers/admin/Course/index';

export interface CreateCourseType {
  weekDay: string;
  periods: string[];
  name: string;
  shortDescription: string;
  detailDescription: string;
  beginDate: number;
  endDate: number;
}

export interface GetListById extends DefaultPayloadGetListType {
  id: number;
}

export interface EditCourseType extends CreateCourseType {
  id: number;
}

export interface EasySearchType extends DefaultPayloadGetListType {
  keySearch: string;
}

export const actionStart = createAction(constants.ACTION_START);

export const actionEnd = createAction(constants.ACTION_END);

export const getListCourse = createAction<DefaultPayloadGetListType>(
  constants.GET_LIST_COURSE_ACTION,
);

export const getListCourseSuccess = createAction<DefaultResponseGetListType>(
  constants.GET_LIST_COURSE_SUCCESS,
);

export const getListWeekday = createAction(constants.GET_LIST_WEEKDAY);

export const getListWeekdaySuccess = createAction<WeekdayType[]>(
  constants.GET_LIST_WEEKDAY_SUCCESS,
);

export const getListPeriod = createAction(constants.GET_LIST_PERIOD);

export const getListPeriodSuccess = createAction<PeriodType[]>(
  constants.GET_LIST_PERIOD_SUCCESS,
);

export const createCourse = createAction<CreateCourseType>(
  constants.CREATE_COURSE_ACTION,
);

export const deleteCourse = createAction<number>(
  constants.DELETE_COURSE_ACTION,
);

export const editCourse = createAction<EditCourseType>(
  constants.EDIT_COURSE_ACTION,
);

export const easySearch = createAction<EasySearchType>(
  constants.EASY_SEARCH_ACTION,
);

export const getListCourseByStudentId = createAction<GetListById>(
  constants.GET_LIST_COURSE_BY_STUDENT_ID,
);

export const getListCourseIsNotContainStudentId = createAction<GetListById>(
  constants.GET_LIST_COURSE_IS_NOT_CONTAIN_STUDENT_ID,
);
