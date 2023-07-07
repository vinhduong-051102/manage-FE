import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '@/shared/components/Header';
import Sidebar from '@/shared/components/Sidebar';
import React, { useEffect, useState } from 'react';
import iconMenu from '@/images/iconMenu.svg';
import logo from '@/images/logo.svg';
import avatarDefault from '@/images/avatarDefault.svg';
import {
  COOKIES,
  MENU_COURSE_PERMISSION,
  MENU_DASHBOARD_PERMISSION,
  MENU_STUDENT_PERMISSION,
  PATH_COURSE,
  PATH_DASHBOARD,
  PATH_LOGIN,
  PATH_STUDENT,
  STORAGE,
} from '@/utils/constants';
import Account from '@/containers/Account';
import { useAppDispatch } from '@/hooks';
import { getMsgClient, logOut } from '@/shared/commonFunction';
import * as actions from '@/containers/App/actions';
import { isEmpty, get } from 'lodash';
import { AvatarHoverLayout } from './styles';
import { UserNameView, FullNameView } from '@/containers/Account/style';
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
}: PropsType) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = Cookies.get(COOKIES.accessToken);

  const ACCOUNT_INFO: {
    image: string;
    username: string;
    fullName: string;
  } = {
    image: avatarDefault,
    username:
      (Cookies.get(COOKIES.username) && Cookies.get(COOKIES.username)) || '',
    fullName:
      (Cookies.get(COOKIES.fullName) && Cookies.get(COOKIES.fullName)) || '',
  };

  const MENU_DATA = [
    {
      key: MENU_DASHBOARD_PERMISSION,
      path: PATH_DASHBOARD,
      icon: menuDashboard,
      label: t('common.dashBoard'),
    },
    {
      key: MENU_COURSE_PERMISSION,
      path: PATH_COURSE,
      icon: menuPartner,
      label: t('common.course'),
    },
    {
      key: MENU_STUDENT_PERMISSION,
      path: PATH_STUDENT,
      icon: iconStudent,
      label: t('common.student'),
    },
  ];

  const PERMISSION_MENU = [
    MENU_DASHBOARD_PERMISSION,
    MENU_COURSE_PERMISSION,
    MENU_STUDENT_PERMISSION,
  ];

  useEffect(() => {
    if (token) {
      if (!localStorage.getItem(STORAGE.expandMenu)) {
        setMenuExpand(true);
      } else {
        setMenuExpand(localStorage.getItem(STORAGE.expandMenu) === '1');
      }
    }
    setIsShowSearch(showSearch);
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
        {ACCOUNT_INFO.username}
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
  }, [Component]);

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
          isSearchSimple: false,
          value: easyTextSearch,
          onChange: (e) => {
            if (isEmpty(get(e, 'target.value', '').trim())) {
              setEasyTextSearch('');
              setCategoryId(0);
              setObjectId(0);
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
          onClickMenu={(data) => navigate(data.path)}
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
