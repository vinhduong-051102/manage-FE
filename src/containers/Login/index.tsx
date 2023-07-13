import BmosLogin from '@/shared/components/BmosLogin';
import * as constants from './constants';
import Cookies from 'js-cookie';
import { COOKIES } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import Notice from '@/shared/components/Notice';

const Login = () => {
  const navigate = useNavigate();
  return (
    <BmosLogin
      callbackError={(error) => console.log(error)}
      callbackResponse={(response, keepLogin) => {
        Cookies.set(COOKIES.accessToken, response.data[COOKIES.accessToken]);
        Cookies.set(COOKIES.email, response.data[COOKIES.email]);
        Cookies.set(COOKIES.fullName, response.data[COOKIES.fullName]);
        Cookies.set(COOKIES.role, response.data[COOKIES.role]);
        if (keepLogin) {
          Cookies.set(
            COOKIES.refreshToken,
            response.data[COOKIES.refreshToken],
          );
        } else {
          Cookies.set(COOKIES.refreshToken, '');
        }
        navigate('/');
        Notice({ msg: 'Đăng nhập thành công', isSuccess: true });
      }}
      onClickLogin={() => {}}
      url={constants.PATH_LOGIN_API}
    />
  );
};

export default Login;
