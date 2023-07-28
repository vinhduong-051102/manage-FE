import appSaga from '@/containers/common/App/appSaga';
import studentSaga from '@/containers/admin/Student/studentSaga';
import courseSaga from '@/containers/admin/Course/courseSaga';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([appSaga(), studentSaga(), courseSaga()]);
}
