import { createAction } from '@reduxjs/toolkit';
import * as constants from '@/containers/Student/constants';
import {
  DefaultPayloadGetListType,
  DefaultResponseGetListType,
} from '@/utils/constants';

export interface CreateStudentPayload {
  username: string;
  email: string;
  address: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
}

export interface EditStudentPayload {
  id: number;
  name: string;
  address: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  email: string;
}

export interface GetLocationResponse {
  fullName: string;
  code: string;
}

export const resetRedux = createAction(constants.RESET_REDUX_ACTION);

export const getListStudent = createAction<DefaultPayloadGetListType>(
  constants.GET_LIST_STUDENT_ACTION,
);

export const getListStudentSuccess = createAction<DefaultResponseGetListType>(
  constants.GET_LIST_STUDENT_SUCCESS,
);

export const actionEnd = createAction(constants.ACTION_END);

export const actionStart = createAction(constants.ACTION_START);

export const createStudent = createAction<CreateStudentPayload>(
  constants.CREATE_STUDENT_ACTION,
);

export const createStudentSuccess = createAction(
  constants.CREATE_STUDENT_SUCCESS,
);

export const getListProvince = createAction(constants.GET_LIST_PROVINCE_ACTION);

export const getListProvinceSuccess = createAction<GetLocationResponse[]>(
  constants.GET_LIST_PROVINCE_SUCCESS,
);

export const getListDistrict = createAction<{ code: string }>(
  constants.GET_LIST_DISTRICT_ACTION,
);

export const getListDistrictSuccess = createAction<GetLocationResponse[]>(
  constants.GET_LIST_DISTRICT_SUCCESS,
);

export const getListWard = createAction<{ code: string }>(
  constants.GET_LIST_WARD_ACTION,
);

export const getListWardSuccess = createAction<GetLocationResponse[]>(
  constants.GET_LIST_WARD_SUCCESS,
);

export const resetLocation = createAction(constants.RESET_LOCATION);

export const checkEmail = createAction<string>(constants.CHECK_EMAIL_ACTION);

export const setValidEmail = createAction<boolean>(constants.SET_VALID_EMAIL);

export const easySearch = createAction<{
  keySearch: string;
  pageable: DefaultPayloadGetListType;
}>(constants.EASY_SEARCH_ACTION);

export const deleteStudent = createAction<number>(
  constants.DELETE_STUDENT_ACTION,
);

export const editStudent = createAction<EditStudentPayload>(
  constants.EDIT_STUDENT_ACTION,
);
