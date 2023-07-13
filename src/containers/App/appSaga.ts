import * as constants from './constants';
import { takeLatest, call } from 'redux-saga/effects';
import { axiosPost } from '@/utils/request';

function* logout(action: any) {
  try {
    const path = '/auth/logout';
    // @ts-ignore
    yield call(axiosPost, path);
    yield call(action.payload);
  } catch (error) {
    console.log(error);
  }
}

export default function* () {
  yield takeLatest(constants.LOGOUT_ACTION, logout);
}
