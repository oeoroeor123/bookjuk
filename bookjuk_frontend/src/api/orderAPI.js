/**
 * order 관련 API 호출 모음
 *
 * Developer : 조범희
 */

import { orderApi } from './baseApi';

// 1. 특정주문 상세 조회 (GET)
export const getOrderDetailData = async (orderId) => {
  const response = await orderApi.get(`/detail/${orderId}`);
  return response.data;
};

// 2. userId 기준 주문내역리스트 조회 (GET)
export const getMyOrderData = async ({ userId, page, size, sort }) => {
  const response = await orderApi.get(`/myOrder/${userId}`, {
    params: { page, size, sort }
  });
  return response.data;
};

// 취소사유 카테고리 가져오기
export const getAllCancelDefinitions = async () => {
  const response = await orderApi.get(`/cancelDefinitions`);
  return response.data;
};

// 취소상태 카테고리 가져오기
export const getAllCancelStatus = async () => {
  const response = await orderApi.get(`/CancelStatus`);
  return response.data;
};

/**
 * 4. 주문 취소 요청 보내기 (POST)
 * 프론트엔드에서 CancelReasonDto 리스트 형태의 취소 요청 데이터를 전송합니다.
 * 예: { orderId: 123, userId: 456, cancelDefinitionId: 1 }
 * @param {Array} cancelRequestData - CancelReasonDto 객체들의 배열
 * @returns {Promise} - API 응답 데이터
 */
export const sendCancelRequest = async (cancelRequestData) => {
  const response = await orderApi.post(`/cancel`, cancelRequestData);
  return response.data;
};

// 5. 취소 요청 철회로 변경하기 ()
export const cancelCancelRequest = async (cancelReasonDto) => {
  const response = await orderApi.put(`/modifyCancelReason`, cancelReasonDto);
  return response.data;
};
