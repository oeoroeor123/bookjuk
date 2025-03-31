/**
 * Product 관련 API 호출 모음
 *
 * Developer : 이수정
 */

import axios from 'axios';
import { productApi, userApi } from './baseApi';

// 상품 상세 페이지
export const getProductDetail = async (productId) => {
  const response = await productApi.get(`/detail/${productId}`);
  // console.log(response.data);
  return response.data;
}

// 상품 좋아요 페이지
export const getProductLike = async() => {
  const response = await userApi.get(`/wish`);
  // console.log(response.data);
  return response.data;
}

// 상품 문의 페이지
export const postProductInquiry = async (inquiryData) => {
  try {
    // 상품 문의글 작성 후 동작할 요청
    const response = await productApi.post(`/api/inquiry/regist/${inquiryData.product.productId}`, inquiryData);

    return response.data;
  } catch (error) {
    console.error("서버 오류", error);
    throw error;
  }
};

//  상품문의 목록 조회
export const getInquiryList = async (parameters) => {
  const response = await productApi.get(`/inquiry`, {
    params: parameters,
  });
  return response.data;
};

//  상품문의 상세 조회
export const getInquiryDetail = async (inquiryId, parameters) => {
  const response = await productApi.get(`/inquiry/${inquiryId}`, {
    params: parameters,
  });
  return response.data;
};