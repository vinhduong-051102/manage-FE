import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '@/shared/components/Header';
import Sidebar from '@/shared/components/Sidebar';
import React, { useEffect, useState } from 'react';
import iconMenu from '@/images/iconMenu.svg';
import logo from '@/images/logoLogged.svg';
import avatarDefault from '@/images/avatarDefault.svg';
import {
  COOKIES,
  ADMIN_MENU_COURSE_PERMISSION,
  ADMIN_MENU_DASHBOARD_PERMISSION,
  ADMIN_MENU_STUDENT_PERMISSION,
  PATH_COURSE,
  PATH_DASHBOARD,
  PATH_LOGIN,
  PATH_STUDENT,
  STORAGE,
  STUDENT_MENU_REGISTER_PERMISSION,
  PATH_REGISTER,
  STUDENT_MENU_DASHBOARD_PERMISSION,
  PATH_ACTIVE,
  STUDENT_MENU_ACTIVE_PERMISSION,
} from '@/utils/constants';
import Account from '@/containers/common/Account';
import { useAppDispatch } from '@/hooks';
import {
  getBooleanFromString,
  getMsgClient,
  logOut,
} from '@/shared/commonFunction';
import * as actions from '@/containers/common/App/actions';
import { isEmpty, get } from 'lodash';
import { AvatarHoverLayout } from './styles';
import { UserNameView, FullNameView } from '@/containers/common/Account/style';
import menuDashboard from '@/images/menuDashboard.svg';
import iconStudent from '@/images/icon-role.svg';
import menuPartner from '@/images/menuPartner.svg';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

interface PropsType {
  component: (props: ComponentPropsType) => JSX.Element;
  id?: string;
  showSearch?: boolean;
  placeholderSearch?: string;
  pathSuggestSearch?: string;
  hideFilter?: boolean;
  isSearchSimple?: boolean;
}

export interface ComponentPropsType {
  textSearch: string;
  objectId: number;
  categoryId: number;
  showAdvanceSearch: boolean;
  onCloseAdvanceSearch: () => void;
}

const { Content } = Layout;

const LayoutLogged = ({
  component: Component,
  showSearch = false,
  placeholderSearch = '',
  pathSuggestSearch = '',
  hideFilter = false,
  isSearchSimple = true,
}: PropsType) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = Cookies.get(COOKIES.accessToken);

  const ACCOUNT_INFO: {
    image: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean | string;
  } = {
    image: avatarDefault,
    email: (Cookies.get(COOKIES.email) && Cookies.get(COOKIES.email)) || '',
    fullName:
      (Cookies.get(COOKIES.fullName) && Cookies.get(COOKIES.fullName)) || '',
    role: (Cookies.get(COOKIES.role) && Cookies.get(COOKIES.role)) || '',
    isActive: getBooleanFromString(Cookies.get(COOKIES.isActive) as string),
  };

  const MENU_DATA =
    // Menu cho admin
    ACCOUNT_INFO.role === 'ADMIN'
      ? [
          {
            key: ADMIN_MENU_DASHBOARD_PERMISSION,
            path: PATH_DASHBOARD,
            icon: menuDashboard,
            label: t('common.dashBoard'),
          },
          {
            key: ADMIN_MENU_COURSE_PERMISSION,
            path: PATH_COURSE,
            icon: menuPartner,
            label: t('common.course'),
          },
          {
            key: ADMIN_MENU_STUDENT_PERMISSION,
            path: PATH_STUDENT,
            icon: iconStudent,
            label: t('common.student'),
          },
        ]
      : // Menu cho học sinh
      ACCOUNT_INFO.isActive
      ? // Menu khi đã kích hoạt tài khoản
        [
          {
            key: STUDENT_MENU_DASHBOARD_PERMISSION,
            path: PATH_DASHBOARD,
            icon: menuDashboard,
            label: t('common.dashBoard'),
          },
          {
            key: STUDENT_MENU_REGISTER_PERMISSION,
            path: PATH_REGISTER,
            icon: menuPartner,
            label: t('common.registerCourse'),
          },
        ]
      : // Menu khi chưa kích hoạt tài khoản
        [
          {
            key: STUDENT_MENU_ACTIVE_PERMISSION,
            path: PATH_ACTIVE,
            icon: menuDashboard,
            label: t('common.activeAccount'),
          },
        ];

  const PERMISSION_MENU =
    ACCOUNT_INFO.role === 'ADMIN'
      ? [
          ADMIN_MENU_DASHBOARD_PERMISSION,
          ADMIN_MENU_COURSE_PERMISSION,
          ADMIN_MENU_STUDENT_PERMISSION,
        ]
      : ACCOUNT_INFO.isActive
      ? [STUDENT_MENU_REGISTER_PERMISSION, STUDENT_MENU_DASHBOARD_PERMISSION]
      : [STUDENT_MENU_ACTIVE_PERMISSION];

  useEffect(() => {
    if (token) {
      if (!localStorage.getItem(STORAGE.expandMenu)) {
        setMenuExpand(true);
      } else {
        setMenuExpand(localStorage.getItem(STORAGE.expandMenu) === '1');
      }
    }
    setIsShowSearch(showSearch);
  }, [Component, showSearch, token]);

  useEffect(() => {
    setEasyTextSearch('');
    setCategoryId(0);
    setObjectId(0);
  }, [Component]);

  const [menuExpand, setMenuExpand] = useState<boolean>(true);
  const [openPopoverAccount, setOpenPopoverAccount] = useState<boolean>(false);
  const [easyTextSearch, setEasyTextSearch] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [objectId, setObjectId] = useState(0);

  const onClickMenu = () => {
    setMenuExpand(!menuExpand);
    localStorage.setItem(STORAGE.expandMenu, !menuExpand ? '1' : '0');
  };
  const [isShowSearch, setIsShowSearch] = useState(showSearch);

  const onLogout = () => {
    setOpenPopoverAccount(false);
    dispatch(
      actions.logout(() => {
        logOut();
      }),
    );
  };

  const onClosePopover = () => {
    setOpenPopoverAccount(false);
  };

  const contentHoverAvatar = () => (
    <AvatarHoverLayout>
      <UserNameView style={{ marginTop: '0px' }}>
        {ACCOUNT_INFO.email}
      </UserNameView>
      <FullNameView>{ACCOUNT_INFO.fullName}</FullNameView>
    </AvatarHoverLayout>
  );

  const onSelectSearch = (value: string, option: any) => {
    if (option.categoryid !== 0 && option.objectid === 0) {
      setEasyTextSearch(option.text_search);
      setCategoryId(option.categoryid);
      setObjectId(option.categoryid);
    } else {
      setEasyTextSearch(getMsgClient(value || ''));
      setCategoryId(option.categoryid);
      setObjectId(option.objectid);
    }
  };

  useEffect(() => {
    setIsShowSearch(showSearch);
  }, [Component, showSearch]);

  return token ? (
    <Layout style={{ height: '100%' }}>
      <Header
        iconMenu={iconMenu}
        logo={logo}
        userData={ACCOUNT_INFO}
        onClickMenu={onClickMenu}
        onClickLogo={() => navigate('/')}
        content={
          <Account
            accountInfo={ACCOUNT_INFO}
            onClickSignOut={onLogout}
            onClosePopover={onClosePopover}
          />
        }
        searchSimple={{
          isSearchSimple: isSearchSimple,
          value: easyTextSearch,
          onChange: (
            e: Event & {
              target: HTMLInputElement;
            },
          ) => {
            if (isEmpty(get(e, 'target.value', '').trim())) {
              setEasyTextSearch('');
              setCategoryId(0);
              setObjectId(0);
            } else {
              setEasyTextSearch(e.target.value);
            }
          },
        }}
        visible={openPopoverAccount}
        onOpenChange={(visible) => setOpenPopoverAccount(visible)}
        showSearch={isShowSearch}
        placeholderSearch={placeholderSearch}
        pathSuggestSearch={pathSuggestSearch}
        onClickFilterBtn={() => setIsShowSearch(false)}
        contentHoverAvatar={contentHoverAvatar}
        handleSearch={() => alert()}
        hideFilter={hideFilter}
        onSelectSearch={onSelectSearch}
      />
      <Layout style={{ backgroundColor: 'white' }}>
        <Sidebar
          isExpand={menuExpand}
          minWidth="64px"
          maxWidth="270px"
          permissionArray={PERMISSION_MENU}
          dataMenu={MENU_DATA}
          pathname={location.pathname}
          onClickMenu={(data) => {
            navigate(data.path);
          }}
        />
        <Content>
          <Component
            // @ts-ignore
            textSearch={easyTextSearch}
            objectId={objectId}
            categoryId={categoryId}
            showAdvanceSearch={!isShowSearch}
            onCloseAdvanceSearch={() => setIsShowSearch(true)}
          />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to={PATH_LOGIN} />
  );
};

export default LayoutLogged;
