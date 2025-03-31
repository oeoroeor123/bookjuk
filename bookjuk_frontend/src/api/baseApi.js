/**
 * API 공통 설정
 *
 * Developer : 김리예
 */

import axios from 'axios';

axios.defaults.withCredentials = true; // withCredentials 전역 설정

const API_HOST = 'http://localhost:8080';
const ADMIN_REQUEST_URL = `${API_HOST}/admin`;
const MAIN_REQUEST_URL = `${API_HOST}/main`;
const USER_REQUEST_URL = `${API_HOST}/user`;
const PRODUCT_REQUEST_URL = `${API_HOST}/product`;
const SECONDHAND_REQUEST_URL = `${API_HOST}/secondhand`;
const CART_REQUEST_URL = `${API_HOST}/cart`;
const DELIADDR_REQUEST_URL = `${API_HOST}/deliAddr`;
const ORDER_REQUEST_URL = `${API_HOST}/order`;
const FAQ_REQUEST_URL = `${API_HOST}/faq`;
const QNA_REQUEST_URL = `${API_HOST}/qna`;
const NOTICE_REQUEST_URL = `${API_HOST}/notice`;
const SEARCH_REQUEST_URL = `${API_HOST}/search`;
const REVIEW_REQUEST_URL = `${API_HOST}/review`;

// jwt token 사용 예정
const token = localStorage.getItem('token');

/**
 * admin 에서 호출되는 base url
 *
 * @param {*} url /admin 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosAdminInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    //api요청 할 때, 토큰인증이 필요한 경우 headers 값도 추가할 수 있다.
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const adminApi = axiosAdminInstance(ADMIN_REQUEST_URL);

/**
 * main 에서 호출되는 base url
 *
 * @param {*} url /main 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosMainInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const mainApi = axiosMainInstance(MAIN_REQUEST_URL);

/**
 * user 에서 호출되는 base url
 *
 * @param {*} url /user 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosUserInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const userApi = axiosUserInstance(USER_REQUEST_URL);

/**
 * product 에서 호출되는 base url
 *
 * @param {*} url /product 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosProductInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const productApi = axiosProductInstance(PRODUCT_REQUEST_URL);

/**
 * secondhand 에서 호출되는 base url
 *
 * @param {*} url /secondhand 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosSecondhandInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const secondhandApi = axiosSecondhandInstance(SECONDHAND_REQUEST_URL);

/**
 * cart 에서 호출되는 base url
 *
 * @param {*} url /cart 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosCartInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const cartApi = axiosCartInstance(CART_REQUEST_URL);

/**
 * deliAddr 에서 호출되는 base url
 *
 * @param {*} url /deliAddr 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosDeliAddrInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const deliAddrApi = axiosDeliAddrInstance(DELIADDR_REQUEST_URL);

// order 에서 호출되는 base url
const axiosOrderInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const orderApi = axiosOrderInstance(ORDER_REQUEST_URL);

/**
 * FAQ 에서 호출되는 base url
 *
 * @param {*} url /faq 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosFaqInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const faqApi = axiosFaqInstance(FAQ_REQUEST_URL);

/**
 * Q&A 에서 호출되는 base url
 *
 * @param {*} url /qna 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosQnaInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const qnaApi = axiosQnaInstance(QNA_REQUEST_URL);

/**
 * notice 에서 호출되는 base url
 *
 * @param {*} url /notice 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosNoticeInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const noticeApi = axiosNoticeInstance(NOTICE_REQUEST_URL);

/**
 * search 에서 호출되는 base url
 *
 * @param {*} url /notice 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosSearchInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const searchApi = axiosSearchInstance(SEARCH_REQUEST_URL);

/**
 * review 에서 호출되는 base url
 *
 * @param {*} url /review 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosReviewInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const reviewApi = axiosReviewInstance(REVIEW_REQUEST_URL);

/**
 * 일반적으로 호출되는 base url : localhost
 *
 * @param {*} url / 뒤에 붙일 url
 * @param {*} params 전송할 데이터
 * @param {*} options
 * @returns
 */
const axiosBaseInstance = (url, params, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    ...options,
  });
  return instance;
};
export const baseApi = axiosBaseInstance(API_HOST);
