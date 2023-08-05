import * as constants from './constants';
import * as actions from './actions';
import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { EnrollCourseType, GetListCourseByTimeType } from './actions';
import { AxiosResponse } from 'axios';
import { axiosPost } from '@/utils/request';
import Notice from '@/shared/components/Notice';

function* getListCourseByTime(action: PayloadAction<GetListCourseByTimeType>) {
  const path = '/course/getListByTime';
  const { time, day, userId } = action.payload;
  yield put(actions.actionBegin());
  try {
    const res: AxiosResponse = yield call(axiosPost, path, {
      time,
      day,
      userId,
    });
    if (res.status === 200) {
      yield put(actions.getListCourseByTimeSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* enrollCourse(action: PayloadAction<EnrollCourseType>) {
  const path = '/student/enroll';
  const { payload } = action;
  yield put(actions.actionBegin());
  try {
    const res: AxiosResponse = yield call(axiosPost, path, payload);
    if (res.status === 200) {
      yield call(Notice, { msg: res.data });
      yield put(actions.actionEnd());
    }
  } catch (error: any) {
    yield put(actions.actionEnd());
    yield call(Notice, { msg: error.data, isSuccess: false });
  }
}

export default function* () {
  yield takeLatest(
    constants.GET_LIST_COURSE_BY_TIME_ACTION,
    getListCourseByTime,
  );
  yield takeLatest(constants.ENROLL_COURSE_ACTION, enrollCourse);
}
