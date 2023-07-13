// export const REGEX_PASSWORD =
//   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9\\._]).{8,20}$/;

export const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*[0-9]).{10,}$/;

export const TEXT_REQUIRE_USER_NAME_PASSWORD =
  'Bạn chưa nhập tên đăng nhập và mật khẩu';

export const TEXT_REQUIRE_USER_NAME = 'Bạn chưa nhập tên đăng nhập';

export const TEXT_REQUIRE_PASSWORD = 'Bạn chưa nhập mật khẩu';

export const TEXT_WRONG_ACCOUNT = 'Bạn nhập sai tên đăng nhập hoặc mật khẩu';

export const LABEL_USER_NAME = 'Tên đăng nhập';

export const LABEL_PASSWORD = 'Mật khẩu';

export const TEXT_KEEP_LOGIN = 'Duy trì đăng nhập';

export const TEXT_FORGET_PASSWORD = 'Quên mật khẩu';

export const TEXT_BTN_LOGIN = 'Đăng nhập';

export const TEXT_BTN_LOG_USB = 'Đăng nhập bằng USB token';

export const PATH_LOGIN_API = '/auth/signin';
