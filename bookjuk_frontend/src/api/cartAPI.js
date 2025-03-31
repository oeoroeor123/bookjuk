/**
 * cart 관련 API 호출 모음
 *
 * Developer : 조범희
 */

import { cartApi } from './baseApi';

// 카트 - user 상세 조회
export const getCartUserDetail = async (userId, parameters) => {
  const response = await cartApi.get(`/user/${userId}`, {
    // params: parameters,
  });
  return response.data;
};

// 카트 - 카트 아이템 삭제
export const deleteCartItem = async (cartItemId) => {
  const response = await cartApi.delete(`/cartItems/${cartItemId}`);
  return response.data;
}

// 카트 - 카트 아이템 수량 변경 (productQuantity와 userId를 함께 전송)
export const modifyCartItem = async (cartItemId, payload) => {
  const response = await cartApi.put(
    `/cartItems/${cartItemId}`,
    payload
  );
  return response.data;
};