/**
 * 공지사항 관련 API 호출 모음
 *
 * Developer : 김민희
 */

import { noticeApi } from './baseApi';


export const getnoticeList = async (parameters) => {
  const response = await noticeApi.get(``, {
    params: parameters,
  });
  return response.data;
}

export const getNoticeRegist = async (notice) => {
  const response = await noticeApi.post(`/regist`, notice);
  return response.data;
}

export const getNoticeDetail = async (id) => {
  const response = await noticeApi.get(`/detail/${id}`);
  return response.data;
}

export const getNoticeModify = async (notice) => {
  const response = await noticeApi.put(`/modify`, notice);
  return response.data;
}

export const getNoticeDelete = async (id) => {
  const response = await noticeApi.delete(`/delete/${id}`);
  return response.data;
}