import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';

export const activeAccount = createAction<{
  id: string;
  password: string;
}>(constants.ACTIVE_ACCOUNT_ACTION);

export const actionBegin = createAction(constants.ACTION_BEGIN);

export const actionEnd = createAction(constants.ACTION_END);

export const activeAccountSuccess = createAction(
  constants.ACTIVE_ACCOUNT_SUCCESS,
);
