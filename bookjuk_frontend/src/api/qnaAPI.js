/**
 * Qna  관련 API 호출 모음
 *
 * Developer : 김민희
 */

import { qnaApi } from './baseApi';

export const getQnAList = async (parameters) => {
  const response = await qnaApi.get(``, {
    params: parameters,
  });
  return response.data;
}

export const getQnaRegist = async (qna) => {
  const response = await qnaApi.post(`/regist`, qna);
  return response.data;
}

export const getQnaDetail = async (id) => {
  const response = await qnaApi.get(`/detail/${id}`);
  return response.data;
}

export const getQnaModify = async (qna) => {
  const response = await qnaApi.put(`/modify`, qna);
  return response.data;
}

export const getQnaDelete = async (id) => {
  const response = await qnaApi.delete(`/delete/${id}`);
  return response.data;
}

export const getQnaReplyDetail = async (id) => {
  const response = await qnaApi.get(`/reply/${id}`);
  return response.data;
}
