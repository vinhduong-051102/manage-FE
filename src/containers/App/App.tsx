import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from '@/shared/components/ErrorPage';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectMessageAndStatus } from '@/containers/App/appSlice';
import { useTranslation } from 'react-i18next';
import { resetRedux } from '@/containers/App/actions';
import GlobalStyle from '@/global-styles';
import DashBoard from '@/containers/Dashboard/Loadable';
import Course from '@/containers/Course/Loadable';
import Student from '@/containers/Student/Loadable';
import Login from '@/containers/Login/Loadable';
import LayoutLogged from '@/layout/LayoutLogged';
import {
  COOKIES,
  PATH_COURSE,
  PATH_DASHBOARD,
  PATH_LOGIN,
  PATH_ROOT,
  PATH_STUDENT,
} from '@/utils/constants';
import Cookies from 'js-cookie';

const App = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const messageAndStatus = useAppSelector(selectMessageAndStatus);
  const { message, status } = messageAndStatus;
  const role = Cookies.get(COOKIES.role);
  useEffect(() => {
    if (message !== '') {
      api[status]({
        message: t(`common.${status}`),
        description: message,
        duration: 3,
        placement: 'bottomRight',
      });
      dispatch(resetRedux());
    }
  }, [message, status, t, api, dispatch]);
  return (
    <>
      <Routes>
        {role === 'ADMIN' ? (
          <>
            <Route path={PATH_ROOT} element={<Navigate to={'/dashboard'} />} />
            <Route
              path={PATH_DASHBOARD}
              element={<LayoutLogged component={DashBoard} />}
            />
            <Route
              path={PATH_STUDENT}
              element={
                <LayoutLogged
                  component={Student}
                  showSearch
                  placeholderSearch={t('student.placeholder') as string}
                  pathSuggestSearch={'/student'}
                />
              }
            />
            <Route
              path={PATH_COURSE}
              element={
                <LayoutLogged
                  component={Course}
                  showSearch
                  placeholderSearch={t('course.placeholder') as string}
                  pathSuggestSearch={'/course'}
                />
              }
            />
          </>
        ) : (
          <>
            <Route
              path={PATH_COURSE}
              element={
                <LayoutLogged
                  component={Course}
                  showSearch
                  placeholderSearch={t('course.placeholder') as string}
                  pathSuggestSearch={'/course'}
                />
              }
            />
          </>
        )}

        <Route path={PATH_LOGIN} element={<Login />} />
        <Route path="*" element={<ErrorPage code={404} />} />
      </Routes>
      {contextHolder}
      <GlobalStyle />
    </>
  );
};

export default App;
