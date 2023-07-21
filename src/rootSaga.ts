import appSaga from '@/containers/App/appSaga';
import studentSaga from '@/containers/Student/studentSaga';
import courseSaga from '@/containers/Course/courseSaga';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([appSaga(), studentSaga(), courseSaga()]);
}
