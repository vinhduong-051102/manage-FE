import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_GET_LIST_PARAMS,
  DefaultPayloadGetListType,
  DefaultResponseGetListType,
} from '@/utils/constants';
import * as constants from './constants';
import * as actions from './actions';
import { AxiosResponse } from 'axios';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/request';
import { PeriodType, WeekdayType } from '@/containers/admin/Course/index';
import {
  CreateCourseType,
  EasySearchType,
  EditCourseType,
  GetListById,
} from './actions';
import Notice from '@/shared/components/Notice';

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

function* getListWeekday() {
  const path = `/weekday/all`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<WeekdayType[]> = yield call(axiosGet, path);
    if (res.status === 200) {
      yield put(actions.getListWeekdaySuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListPeriod() {
  const path = `/period/all`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<PeriodType[]> = yield call(axiosGet, path);
    if (res.status === 200) {
      yield put(actions.getListPeriodSuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* createCourse(action: PayloadAction<CreateCourseType>) {
  const path = `/course/new`;
  yield put(actions.actionStart());
  const { payload } = action;
  try {
    const res: AxiosResponse<string> = yield call(axiosPost, path, payload);
    if (res.status === 200) {
      yield put(actions.getListCourse(DEFAULT_GET_LIST_PARAMS));
      yield call(Notice, { msg: res.data });
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* deleteCourse(action: PayloadAction<number>) {
  const path = `/course/${action.payload}/delete`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<string> = yield call(axiosDelete, path);
    if (res.status === 200) {
      yield put(actions.getListCourse(DEFAULT_GET_LIST_PARAMS));
      yield call(Notice, { msg: res.data });
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* editCourse(action: PayloadAction<EditCourseType>) {
  const path = `/course/edit`;
  yield put(actions.actionStart());
  const { payload } = action;
  try {
    const res: AxiosResponse<string> = yield call(axiosPut, path, payload);
    if (res.status === 200) {
      yield put(actions.getListCourse(DEFAULT_GET_LIST_PARAMS));
      yield call(Notice, { msg: res.data });
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* easySearch(action: PayloadAction<EasySearchType>) {
  const { keySearch, pageNumber, pageSize } = action.payload;
  const path = `/course?keySearch=${keySearch}&page=${pageNumber}&size=${pageSize}`;
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

function* getListCourseIsNotContainStudentId(
  action: PayloadAction<GetListById>,
) {
  const { id, pageSize, pageNumber } = action.payload;
  const path = `/course/except?studentId=${id}&page=${pageNumber}&size=${pageSize}`;
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

function* getListCourseById(action: PayloadAction<GetListById>) {
  const { id, pageSize, pageNumber } = action.payload;
  const path = `/course/contain?studentId=${id}&page=${pageNumber}&size=${pageSize}`;
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
  yield takeLatest(constants.GET_LIST_WEEKDAY, getListWeekday);
  yield takeLatest(constants.GET_LIST_PERIOD, getListPeriod);
  yield takeLatest(constants.CREATE_COURSE_ACTION, createCourse);
  yield takeLatest(constants.DELETE_COURSE_ACTION, deleteCourse);
  yield takeLatest(constants.EDIT_COURSE_ACTION, editCourse);
  yield debounce(400, constants.EASY_SEARCH_ACTION, easySearch);
  yield takeLatest(constants.GET_LIST_COURSE_BY_STUDENT_ID, getListCourseById);
  yield takeLatest(
    constants.GET_LIST_COURSE_IS_NOT_CONTAIN_STUDENT_ID,
    getListCourseIsNotContainStudentId,
  );
}
