import BmosLogin from '@/shared/components/BmosLogin';
import * as constants from './constants';
import Cookies from 'js-cookie';
import { COOKIES } from '@/utils/constants';
import Notice from '@/shared/components/Notice';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  return (
    <BmosLogin
      callbackError={(error) => console.log(error)}
      callbackResponse={(response, keepLogin) => {
        Cookies.set(COOKIES.accessToken, response.data[COOKIES.accessToken]);
        Cookies.set(COOKIES.id, response.data[COOKIES.id]);
        Cookies.set(COOKIES.email, response.data[COOKIES.email]);
        Cookies.set(COOKIES.fullName, response.data[COOKIES.fullName]);
        Cookies.set(COOKIES.role, response.data[COOKIES.role]);
        Cookies.set(COOKIES.isActive, response.data[COOKIES.isActive]);
        if (keepLogin) {
          Cookies.set(
            COOKIES.refreshToken,
            response.data[COOKIES.refreshToken],
          );
        } else {
          Cookies.set(COOKIES.refreshToken, '');
        }
        Notice({ msg: t('common.loginSuccessfully'), isSuccess: true });
        window.location.href = '/';
      }}
      onClickLogin={() => {}}
      url={constants.PATH_LOGIN_API}
    />
  );
};

export default Login;
