import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';
import { CourseType } from '@/containers/admin/Course';

export interface GetListCourseByTimeType {
  time: number[];
  day: number;
  userId: string | number;
}

export interface EnrollCourseType {
  userId: number;
  listCourseId: number[];
}

export const actionBegin = createAction(constants.ACTION_BEGIN);

export const actionEnd = createAction(constants.ACTION_END);

export const getListCourseByTime = createAction<GetListCourseByTimeType>(
  constants.GET_LIST_COURSE_BY_TIME_ACTION,
);

export const getListCourseByTimeSuccess = createAction<CourseType>(
  constants.GET_LIST_COURSE_BY_TIME_SUCCESS,
);

export const enrollCourse = createAction<EnrollCourseType>(
  constants.ENROLL_COURSE_ACTION,
);
