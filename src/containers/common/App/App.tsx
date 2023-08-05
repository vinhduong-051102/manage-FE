import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ErrorPage from '@/shared/components/ErrorPage';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectMessageAndStatus } from '@/containers/common/App/appSlice';
import { useTranslation } from 'react-i18next';
import { resetRedux } from '@/containers/common/App/actions';
import GlobalStyle from '@/global-styles';
import * as AdminComponent from '@/containers/admin';
import * as StudentComponent from '@/containers/student';
import Login from '@/containers/common/Login/Loadable';
import LayoutLogged from '@/layout/LayoutLogged';
import {
  COOKIES,
  PATH_COURSE,
  PATH_DASHBOARD,
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_ROOT,
  PATH_STUDENT,
  PATH_ACTIVE,
} from '@/utils/constants';
import Cookies from 'js-cookie';

const App = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const messageAndStatus = useAppSelector(selectMessageAndStatus);
  const { message, status } = messageAndStatus;
  const role = Cookies.get(COOKIES.role);
  const isActive = !(
    Cookies.get(COOKIES.isActive) === 'undefined' ||
    Cookies.get(COOKIES.isActive) === 'false'
  );

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
              element={<LayoutLogged component={AdminComponent.Dashboard} />}
            />
            <Route
              path={PATH_STUDENT}
              element={
                <LayoutLogged
                  component={AdminComponent.Student}
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
                  component={AdminComponent.Course}
                  showSearch
                  placeholderSearch={t('course.placeholder') as string}
                  pathSuggestSearch={'/course'}
                />
              }
            />
          </>
        ) : isActive ? (
          <>
            <Route path={PATH_ROOT} element={<Navigate to={'/dashboard'} />} />
            <Route
              path={PATH_DASHBOARD}
              element={
                <LayoutLogged
                  component={StudentComponent.Dashboard}
                  showSearch={false}
                  hideFilter
                />
              }
            />
            <Route
              path={PATH_REGISTER}
              element={
                <LayoutLogged
                  component={StudentComponent.Register}
                  showSearch={false}
                  hideFilter
                />
              }
            />
          </>
        ) : (
          <>
            <Route path={PATH_ROOT} element={<Navigate to={'/active'} />} />
            <Route
              path={PATH_ACTIVE}
              element={
                <LayoutLogged
                  component={StudentComponent.Active}
                  showSearch={false}
                  hideFilter
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
