import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { DefaultResponseGetListType } from '@/utils/constants';
import { CourseType } from '@/containers/Course/index';

interface initialStateType extends DefaultResponseGetListType {
  isLoading: boolean;
  data: CourseType[];
  listWeekday: {
    id: number;
    name: string;
    no: number;
  }[];
  listPeriod: {
    id: number;
    period: number;
    beginAt: string;
    endAt: string;
  }[];
}

const initialState: initialStateType = {
  isLoading: false,
  data: [],
  pageSize: 0,
  currentPage: 0,
  totalRecord: 0,
  listWeekday: [],
  listPeriod: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    resetRedux: (state) => {
      state.isLoading = false;
      state.data = [];
      state.currentPage = 0;
      state.pageSize = 0;
      state.totalRecord = 0;
      state.listPeriod = [];
      state.listWeekday = [];
    },
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    getListCourseSuccess: (
      state,
      action: PayloadAction<DefaultResponseGetListType>,
    ) => {
      state.data = action.payload.data;
      state.pageSize = action.payload.pageSize;
      state.currentPage = action.payload.currentPage;
      state.totalRecord = action.payload.totalRecord;
    },
    getListWeekdaySuccess: (state, action) => {
      state.listWeekday = action.payload;
    },
    getListPeriodSuccess: (state, action) => {
      state.listPeriod = action.payload;
    },
  },
});

export const selectIsLoading = (state: RootState) =>
  state.studentReducer.isLoading;

export const selectListCourse = (state: RootState) => state.courseReducer.data;

export const selectCurrentPage = (state: RootState) =>
  state.courseReducer.currentPage;

export const selectPageSize = (state: RootState) =>
  state.courseReducer.pageSize;

export const selectTotalRecord = (state: RootState) =>
  state.courseReducer.totalRecord;

export const selectListWeekday = (state: RootState) =>
  state.courseReducer.listWeekday;

export const selectListPeriod = (state: RootState) =>
  state.courseReducer.listPeriod;

export default courseSlice.reducer;
