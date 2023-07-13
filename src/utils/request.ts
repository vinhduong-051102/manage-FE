import axios from 'axios';
import { handleError } from '@/utils/handleError';
import { COOKIES } from '@/utils/constants';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: `${
    process.env.NODE_ENV === 'production'
      ? process.env.URL
      : process.env['REACT_APP_BASE_URL']
  }/`,
});

instance.defaults.timeout = 25000;

instance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${Cookies.get(COOKIES.accessToken)}`;
  return req;
});

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.response.status === 405) {
    return response.response;
  }
  throw new Error(response.statusText);
}

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseError = {
      ...error,
      response: {
        ...error.response,
      },
    };

    if (error.response) {
      handleError(error.response);
    }

    return responseError;
  },
);

export async function axiosGet(path: string) {
  return await instance
    .get(path)
    .then(checkStatus)
    .catch((error) => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
}

export async function axiosPost(path: string, body: any) {
  return await instance
    .post(path, body)
    .then(checkStatus)
    .catch((error) => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
}

export async function axiosDelete(path: string) {
  return await instance
    .delete(path)
    .then(checkStatus)
    .catch((error) => {
      throw error;
    });
}

export async function axiosPut(path: any, body: any) {
  return await instance
    .put(path, body)
    .then(checkStatus)
    .catch((error) => {
      if (!JSON.parse(JSON.stringify(error)).response) throw error;
    });
}
