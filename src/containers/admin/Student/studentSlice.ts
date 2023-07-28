import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { StudentType } from '@/containers/admin/Student/index';
import { DefaultResponseGetListType } from '@/utils/constants';
import { GetLocationResponse } from '@/containers/admin/Student/actions';

interface initialStateType extends DefaultResponseGetListType {
  isLoading: boolean;
  data: StudentType[];
  listProvince: GetLocationResponse[];
  listDistrict: GetLocationResponse[];
  listWard: GetLocationResponse[];
  isValidEmail: boolean;
}

const initialState: initialStateType = {
  isLoading: false,
  data: [],
  pageSize: 0,
  currentPage: 0,
  totalRecord: 0,
  listDistrict: [],
  listProvince: [],
  listWard: [],
  isValidEmail: true,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetRedux: (state) => {
      state.isLoading = false;
      state.data = [];
      state.currentPage = 0;
      state.pageSize = 0;
      state.totalRecord = 0;
      state.listWard = [];
      state.listDistrict = [];
      state.listProvince = [];
      state.isValidEmail = true;
    },
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    getListStudentSuccess: (
      state,
      action: PayloadAction<DefaultResponseGetListType>,
    ) => {
      const { payload } = action;
      state.data = payload.data;
      state.pageSize = payload.pageSize;
      state.isLoading = false;
      state.totalRecord = payload.totalRecord;
      state.currentPage = payload.currentPage;
    },
    createStudent: (state) => {
      state.isLoading = true;
    },
    createStudentSuccess: (state) => {
      state.isLoading = false;
    },
    getListProvinceSuccess: (
      state,
      action: PayloadAction<GetLocationResponse[]>,
    ) => {
      state.listProvince = action.payload;
      state.isLoading = false;
    },
    getListDistrictSuccess: (state, action) => {
      state.listDistrict = action.payload;
      state.isLoading = false;
    },
    getListWardSuccess: (state, action) => {
      state.listWard = action.payload;
      state.isLoading = false;
    },
    resetLocation: (state) => {
      state.listProvince = [];
      state.listDistrict = [];
      state.listWard = [];
    },
    setValidEmail: (state, action) => {
      state.isValidEmail = action.payload;
    },
  },
});

export const selectIsLoading = (state: RootState) =>
  state.studentReducer.isLoading;
export const selectListStudent = (state: RootState) =>
  state.studentReducer.data;
export const selectCurrentPage = (state: RootState) =>
  state.studentReducer.currentPage;
export const selectPageSize = (state: RootState) =>
  state.studentReducer.pageSize;
export const selectTotalRecord = (state: RootState) =>
  state.studentReducer.totalRecord;
export const selectListProvince = (state: RootState) =>
  state.studentReducer.listProvince;
export const selectListWard = (state: RootState) =>
  state.studentReducer.listWard;
export const selectListDistrict = (state: RootState) =>
  state.studentReducer.listDistrict;
export const selectIsValidEmail = (state: RootState) =>
  state.studentReducer.isValidEmail;

export default studentSlice.reducer;
