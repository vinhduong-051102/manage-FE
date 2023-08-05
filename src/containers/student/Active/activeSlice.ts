import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface InitialStateType {
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: InitialStateType = {
  isLoading: false,
  isSuccess: false,
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    activeAccountSuccess: (state) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    actionBegin: (state) => {
      state.isLoading = true;
    },
    actionEnd: (state) => {
      state.isLoading = false;
    },
  },
});

export const selectIsLoading = (state: RootState) =>
  state.activeReducer.isLoading;

export const selectIsSuccess = (state: RootState) =>
  state.activeReducer.isSuccess;

export default activeSlice.reducer;
