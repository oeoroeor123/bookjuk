/**
 * 중고 상품 관련 API 호출 모음
 *
 * Developer : 김민희
 */

import { secondhandApi } from './baseApi';

export const getSecondHandList = async (parameters) => {
  const response = await secondhandApi.get(``, {
    params: parameters,
  });
  return response.data;
}

export const getSecondHandSearchList = async (parameters) => {
  const response = await secondhandApi.get(`/search`, {
    params: parameters,
  });
  return response.data;
}

export const getSecondHandDetail = async (id) => {
  const response = await secondhandApi.get(`/detail/${id}`);
  return response.data;
}

export const getSecondHandRegist = async (secondhandData) => {
  const response = await secondhandApi.post(`/regist`, secondhandData);
  return response.data;
}

export const getSecondHandDelete = async (id) => {
  const response = await secondhandApi.delete(`/delete/${id}`);
  return response.data;
}

export const getSecondHandModify = async (secondhandData) => {
  const response = await secondhandApi.put(`/modify`, secondhandData);
  return response.data;
}

export const getGenreList = async () => {
  const response = await secondhandApi.get(`/genre`);
  return response.data;
}

