import { takeLatest, put, call, debounce } from 'redux-saga/effects';
import * as constants from './constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as actions from './actions';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/request';
import { AxiosResponse } from 'axios';
import {
  DEFAULT_GET_LIST_PARAMS,
  DefaultPayloadGetListType,
  DefaultResponseGetListType,
} from '@/utils/constants';
import {
  CreateStudentPayload,
  EditStudentPayload,
  GetListStudentEnrollCourseIdType,
  GetLocationResponse,
} from './actions';
import Notice from '@/shared/components/Notice';

function* getListStudent(action: PayloadAction<DefaultPayloadGetListType>) {
  const { payload } = action;
  const path = `/student/all?page=${payload.pageNumber}&size=${payload.pageSize}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse = yield call(axiosGet, path);
    if (res.status === 200) {
      yield put(actions.getListStudentSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* createStudent(action: PayloadAction<CreateStudentPayload>) {
  const path = '/student/new';
  const { payload } = action;
  try {
    const res: AxiosResponse = yield call(axiosPost, path, payload);
    if (res.status === 200 || res.status === 201) {
      yield put(actions.createStudentSuccess());
      yield put(actions.getListStudent(DEFAULT_GET_LIST_PARAMS));
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* editStudent(action: PayloadAction<EditStudentPayload>) {
  const path = '/student/edit';
  const { payload } = action;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse = yield call(axiosPut, path, payload);
    if (res.status === 200) {
      yield put(actions.getListStudent(DEFAULT_GET_LIST_PARAMS));
      yield call(Notice, { msg: res.data, isSuccess: true });
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListProvince() {
  const path = '/location/province';
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<GetLocationResponse[]> = yield call(
      axiosGet,
      path,
    );
    if (res.status === 200) {
      yield put(actions.getListProvinceSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListDistrict(action: PayloadAction<{ code: string }>) {
  const { payload } = action;
  const path = `/location/district?code=${payload.code}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<GetLocationResponse[]> = yield call(
      axiosGet,
      path,
    );
    if (res.status === 200) {
      yield put(actions.getListDistrictSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListWard(action: PayloadAction<{ code: string }>) {
  const { payload } = action;
  const path = `/location/ward?code=${payload.code}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<GetLocationResponse[]> = yield call(
      axiosGet,
      path,
    );
    if (res.status === 200) {
      yield put(actions.getListWardSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* checkEmail(action: PayloadAction<string>) {
  const { payload } = action;
  const path = `/student/checkEmail?email=${payload}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<boolean> = yield call(axiosGet, path);
    if (res.status === 200) {
      yield put(actions.setValidEmail(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* easySearch(
  action: PayloadAction<{
    keySearch: string;
    pageable: DefaultPayloadGetListType;
  }>,
) {
  const { payload } = action;
  const path = `/student?page=${payload.pageable.pageNumber}&size=${payload.pageable.pageSize}&keySearch=${payload.keySearch}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse<DefaultResponseGetListType> = yield call(
      axiosGet,
      path,
    );
    if (res.status === 200) {
      yield put(actions.getListStudentSuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* deleteStudent(action: PayloadAction<number>) {
  const { payload } = action;
  const path = `/student/delete?id=${payload}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse = yield call(axiosDelete, path);
    if (res.status === 200) {
      yield call(Notice, { msg: res.data, isSuccess: true });
      yield put(actions.getListStudent(DEFAULT_GET_LIST_PARAMS));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

function* getListStudentEnrollCourse(
  action: PayloadAction<GetListStudentEnrollCourseIdType>,
) {
  const { payload } = action;
  const path = `/student/list?page=${payload.pageNumber}&size=${payload.pageSize}&courseId=${payload.id}`;
  yield put(actions.actionStart());
  try {
    const res: AxiosResponse = yield call(axiosGet, path);
    if (res.status === 200) {
      yield put(actions.getListStudentSuccess(res.data));
      yield put(actions.actionEnd());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.GET_LIST_STUDENT_ACTION, getListStudent);
  yield takeLatest(constants.CREATE_STUDENT_ACTION, createStudent);
  yield takeLatest(constants.GET_LIST_PROVINCE_ACTION, getListProvince);
  yield takeLatest(constants.GET_LIST_DISTRICT_ACTION, getListDistrict);
  yield takeLatest(constants.GET_LIST_WARD_ACTION, getListWard);
  yield debounce(400, constants.CHECK_EMAIL_ACTION, checkEmail);
  yield debounce(400, constants.EASY_SEARCH_ACTION, easySearch);
  yield takeLatest(constants.DELETE_STUDENT_ACTION, deleteStudent);
  yield takeLatest(constants.EDIT_STUDENT_ACTION, editStudent);
  yield takeLatest(
    constants.GET_LIST_STUDENT_ENROLL_COURSE,
    getListStudentEnrollCourse,
  );
}
