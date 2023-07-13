import Notice from '@/shared/components/Notice';
import { logOut } from '@/shared/commonFunction';

export const handleError = (errorBody: any) => {
  const { data } = errorBody;
  const code = errorBody.status;
  switch (code) {
    case 400:
      // Xu ly loi 400
      break;
    case 401:
      // Xu ly loi 401
      break;
    case 404:
      Notice({ msg: data, isSuccess: false });
      break;
    case 403:
      Notice({
        msg: 'Phiên đăng nhập hết hạn, hãy đăng nhập lại',
        isSuccess: false,
      });
      logOut();
      break;
    case 500:
      Notice({ msg: data, isSuccess: false });
      logOut();
      break;
    default:
      // Xu ly khi khong co ma loi
      Notice({ msg: data, isSuccess: false });
      break;
  }
};
