/**
 * Delivery Address 관련 API 호출 모음
 *
 * Developer : 조범희
 */

import { deliAddrApi } from './baseApi';

// 1. 특정 userId의 배송지 상세 조회 (GET)
export const getDeliAddrData = async (userId) => {
  const response = await deliAddrApi.get(`/user/${userId}`);
  return response.data;
};

// 2. 배송지 추가 (POST)
// 기존에는 userId를 별도로 전달했지만, 백엔드에서는 user 객체 내의 userId로 매핑되므로 payload를 수정합니다.
export const createDeliAddr = async (userId, deliAddrData) => {
  const payload = {
    ...deliAddrData,
    user: { userId }, // user 객체로 userId를 전달
  };
  const response = await deliAddrApi.post(``, payload);
  return response.data;
};

// 3. 배송지 수정 (PUT)
// 수정 시에도 동일하게 user 객체 형태로 payload에 포함시킵니다.
export const modifyDeliAddr = async (addrId, userId, deliAddrData) => {
  const payload = {
    ...deliAddrData,
    user: { userId },
  };
  const response = await deliAddrApi.put(`/${addrId}`, payload);
  return response.data;
};

// 4. 배송지 삭제 (DELETE)
export const deleteDeliAddr = async (addrId) => {
  const response = await deliAddrApi.delete(`/${addrId}`);
  return response.data;
};
