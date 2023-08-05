import type { PayloadAction } from '@reduxjs/toolkit';
import * as constants from './constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut } from '@/utils/request';
import * as actions from './actions';
import { AxiosResponse } from 'axios';

function* activeAccount(
  action: PayloadAction<{
    id: string;
    password: string;
  }>,
) {
  const path = '/user/active';
  const { payload } = action;
  yield put(actions.actionBegin());
  try {
    const res: AxiosResponse = yield call(axiosPut, path, {
      id: +payload.id,
      password: payload.password,
    });
    if (res.status === 200) {
      yield put(actions.activeAccountSuccess());
    }
  } catch (error) {
    yield put(actions.actionEnd());
  }
}

export default function* () {
  yield takeLatest(constants.ACTIVE_ACCOUNT_ACTION, activeAccount);
}
