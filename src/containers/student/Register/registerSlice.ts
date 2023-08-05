import { createSlice } from '@reduxjs/toolkit';
import { CourseType } from '@/containers/admin/Course';
import { RootState } from '@/store';

interface InitialStateType {
  isLoading: boolean;
  listCourse: CourseType[];
}

const initialState: InitialStateType = {
  isLoading: false,
  listCourse: [],
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    actionBegin: (state) => {
      state.isLoading = true;
    },
    actionEnd: (state) => {
      state.isLoading = false;
    },
    getListCourseByTimeSuccess: (state, action) => {
      state.listCourse = action.payload;
      state.isLoading = false;
    },
  },
});

export const selectIsLoading = (state: RootState) =>
  state.registerReducer.isLoading;

export const selectListCourse = (state: RootState) =>
  state.registerReducer.listCourse;

export default registerSlice.reducer;
