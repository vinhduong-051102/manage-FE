import { createAction } from '@reduxjs/toolkit';
import * as constants from '@/containers/Student/constants';
import {
  DefaultPayloadGetListType,
  DefaultResponseGetListType,
} from '@/utils/constants';

export const resetRedux = createAction(constants.RESET_REDUX_ACTION);

export const getListStudent = createAction<DefaultPayloadGetListType>(
  constants.GET_LIST_STUDENT_ACTION,
);

export const getListStudentSuccess = createAction<
  (res: DefaultResponseGetListType) => void
>(constants.GET_LIST_STUDENT_SUCCESS);
