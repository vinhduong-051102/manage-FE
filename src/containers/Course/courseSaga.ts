import { takeLatest, put, call } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  DefaultPayloadGetListType,
  DefaultResponseGetListType,
} from '@/utils/constants';
import * as constants from './constants';
import * as actions from './actions';
import { AxiosResponse } from 'axios';
import { axiosGet } from '@/utils/request';

function* getListCourse(action: PayloadAction<DefaultPayloadGetListType>) {
  const { pageSize, pageNumber } = action.payload;
  const path = `/course/all?page=${pageNumber}&size=${pageSize}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<DefaultResponseGetListType> = yield call(
      axiosGet,
      path,
    );
    if (res.status === 200) {
      yield put(actions.getListCourseSuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.GET_LIST_COURSE_ACTION, getListCourse);
}
