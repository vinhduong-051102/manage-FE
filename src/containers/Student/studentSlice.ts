import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

interface initialStateType {
  isLoading: boolean;
}

const initialState: initialStateType = {
  isLoading: false,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetRedux: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectIsLoading = (state: RootState) =>
  state.studentReducer.isLoading;
export default studentSlice.reducer;
