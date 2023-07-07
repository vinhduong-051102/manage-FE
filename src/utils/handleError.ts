import { logOut } from '@/shared/commonFunction';

import { ERROR } from '@/utils/constants';
import Notice from '@/shared/components/Notice';

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
      break;
    default:
      // Xu ly khi khong co ma loi
      console.log(data);
      break;
  }
};
