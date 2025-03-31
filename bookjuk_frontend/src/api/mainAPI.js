/**
 * 메인  API 호출 모음
 *
 * Developer : 김리예
 */

import { mainApi } from './baseApi';

// 메인 - 추천 도서 목록 조회
export const getMainRecommendedProductList = async () => {
  const response = await mainApi.get(`/recommended`, {});
  return response.data;
};

// 메인 - 최신 도서 목록 조회
export const getMainNewProductList = async () => {
  const response = await mainApi.get(`/new`, {});
  return response.data;
};

// 메인 - 인기 도서 목록 조회
export const getMainPopularProductList = async () => {
  const response = await mainApi.get(`/popular`, {});
  return response.data;
};