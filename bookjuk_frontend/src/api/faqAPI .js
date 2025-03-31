/**
 * FAQ 관련 API 호출 모음
 *
 * Developer : 김민희
 */

import { faqApi } from './baseApi';

export const getFaqList = async (parameters) => {
  const response = await faqApi.get(``, {
    params: parameters,
  });
  return response.data;
}

export const getFaqRegist = async (faq) => {
  const response = await faqApi.post(`/regist`, faq);
  return response.data;
}

export const getFaqDetail = async (id) => {
  const response = await faqApi.get(`/detail/${id}`);
  return response.data;
}

export const getFaqModify = async (faq) => {
  const response = await faqApi.put(`/modify`, faq);
  return response.data;
}

export const getFaqDelete = async (id) => {
  const response = await faqApi.delete(`/delete/${id}`);
  return response.data;
}