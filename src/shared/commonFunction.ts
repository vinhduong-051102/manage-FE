import Cookies from 'js-cookie';
import {
  endOfDay,
  endOfYesterday,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYesterday,
} from 'date-fns';
import {
  COOKIES,
  PATH_LOGIN,
  TIME_ALL,
  TIME_OPTION_FORM_LAST_MONTH,
  TIME_OPTION_FROM_LAST_WEEK,
  TIME_OPTION_FROM_THIS_MONTH,
  TIME_OPTION_FROM_THIS_WEEK,
  TIME_OPTION_TODAY,
} from '@/utils/constants';
import history from '../utils/history';

export function getMsgClient(message: string) {
  if (message)
    return message.indexOf('[!|') !== -1 && message.indexOf('|!]') !== -1
      ? message.split('[!|')[0].trim() + message.split('|!]')[1]
      : message;
  return '';
}

export function gotoUrlPageBlank(url: string) {
  if (!url) return null;
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('target', '_blank');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  return document.body.removeChild(element);
}

export const formatTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

export const formatDateTime = (time: number | string) => {
  const date = new Date(time);
  return `${formatTime(date.getHours())}h${formatTime(
    date.getMinutes(),
  )}' ${formatTime(date.getDate())}/${formatTime(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;
};

export const downloadFromBase64 = (filename: string, base64: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;base64,${base64}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const createNameFileExport = () => {
  // format <YYMMDD>_<HHMMSS>_RandomNumber(6)
  const today = new Date();
  const date = `${today.getFullYear().toString().slice(2, 4)}${
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
  }${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;
  const hour = `${
    today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
  }${
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
  }${today.getSeconds()}`;
  const number = Math.floor(Math.random() * 999999);
  return `${date}_${hour}_${number}`;
};

/* Hàm format thời gian */
export const formatFullDateTime = (time: number | string, type: string) => {
  const valueTime = new Date(time);
  const format = (value: number) => {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  };
  if (type === 'DD/MM/YYYY HH:MM') {
    return `${format(valueTime.getDate())}/${format(
      valueTime.getMonth() + 1,
    )}/${format(valueTime.getFullYear())} ${format(
      valueTime.getHours(),
    )}:${format(valueTime.getMinutes())}`;
  }
  return `${format(valueTime.getDate())}/${format(
    valueTime.getMonth() + 1,
  )}/${format(valueTime.getFullYear())} ${format(
    valueTime.getHours(),
  )}:${format(valueTime.getMinutes())}:${valueTime.getSeconds()}`;
};

/* Hàm đăng xuất */
export const logOut = () => {
  Cookies.remove(COOKIES.accessToken);
  Cookies.remove(COOKIES.refreshToken);
  Cookies.remove(COOKIES.fullName);
  Cookies.remove(COOKIES.email);
  Cookies.remove(COOKIES.role);
  localStorage.clear();
  history.push(PATH_LOGIN);
  window.location.reload();
};

/* Ham lay thoi gian bat dau cua mot ngay */
export const getStartOfDay = (date: number | Date) =>
  new Date(
    +startOfDay(date) - startOfDay(date).getTimezoneOffset(),
  ).toISOString();

/* Ham lay thoi gian ket thuc cua mot ngay */
export const getEndOfDay = (date: number | Date) =>
  new Date(+endOfDay(date) - endOfDay(date).getTimezoneOffset()).toISOString();

/* Ham lay thoi gian bat dau cua ngay hom nay */
export const getStartTimeToday = () =>
  new Date(+startOfToday() - startOfToday().getTimezoneOffset()).toISOString();

/* Ham lay thoi gian bat dau cua ngay hom qua */
export const getStartTimeYesterday = () =>
  new Date(
    +startOfYesterday() - startOfYesterday().getTimezoneOffset(),
  ).toISOString();

/* Ham lay thoi gian ket thuc cua ngay hom qua */
export const getEndTimeYesterday = () =>
  new Date(
    +endOfYesterday() - endOfYesterday().getTimezoneOffset(),
  ).toISOString();

/* Ham lay thoi gian bat dau cua tuan */
export const getStartTimeWeek = (date: number | Date) =>
  new Date(
    +startOfWeek(date, { weekStartsOn: 1 }) -
      startOfWeek(date, { weekStartsOn: 1 }).getTimezoneOffset(),
  ).toISOString();

/* Ham lay thoi gian bat dau cua tuan truoc */
export const getStartTimeLastWeek = (date: number | Date) =>
  new Date(
    +startOfWeek(date, { weekStartsOn: 1 }) -
      7 * 86400000 -
      startOfWeek(date, { weekStartsOn: 1 }).getTimezoneOffset(),
  ).toISOString();

/* Ham lay thoi gian bat dau cua thang */
export const getStartTimeMonth = (date: number | Date) =>
  new Date(
    +startOfMonth(date) - startOfMonth(date).getTimezoneOffset(),
  ).toISOString();

/* Ham lay thoi gian bat dau cua thang truoc */
export const getFirstDayPreviousMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1).toISOString();

/* Ham lay thoi gian hien tai */
export const getTimeNow = () =>
  new Date(Date.now() - new Date().getTimezoneOffset()).toISOString();

/* Ham tao uuid random */
export const createRandomUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

/* Ham lay thoi gian cua time option */
export const getTimeOption = (
  option: '1' | '2' | '3' | '4' | '5' | '6' | '7',
) => {
  const date = new Date();
  switch (option) {
    case TIME_ALL:
      return {
        beginDate: null,
        endDate: null,
      };
    case TIME_OPTION_TODAY:
      return {
        beginDate: getStartTimeToday(),
        endDate: getTimeNow(),
      };
    case TIME_OPTION_FROM_THIS_WEEK:
      return {
        beginDate: getStartTimeWeek(date),
        endDate: getTimeNow(),
      };
    case TIME_OPTION_FROM_LAST_WEEK:
      return {
        beginDate: getStartTimeLastWeek(date),
        endDate: getTimeNow(),
      };
    case TIME_OPTION_FROM_THIS_MONTH:
      return {
        beginDate: getStartTimeMonth(date),
        endDate: getTimeNow(),
      };
    case TIME_OPTION_FORM_LAST_MONTH:
      return {
        beginDate: getFirstDayPreviousMonth(date),
        endDate: getTimeNow(),
      };
    default:
      return {
        beginDate: getStartTimeToday(),
        endDate: getTimeNow(),
      };
  }
};
