/**
 * admin Product 관련 API 호출 모음
 *
 * Developer : 김성율
 */

import { adminApi } from './baseApi';

// 관리자 - 상품 리스트 조회
export const getProductList = async (parameters) => {
  const response = await adminApi.get(`/products`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 상품 검색
export const getProductSearchList = async (parameters) => {
  const response = await adminApi.get(`/products/search`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 새 상품 등록
export const getProductRegist = async (parameters) => {
  const response = await adminApi.post(`/products/regist`, parameters);
  return response.data;
};

// 관리자 - 상품 상세 조회
export const getProductDetail = async (productId) => {
  const response = await adminApi.get(`/products/detail/${productId}`);
  return response.data;
};

// 관리자 - 상품 수정
export const getProductEdit = async (parameters) => {
  const response = await adminApi.put(`/products/edit`, parameters, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// 관리자 - 상품 삭제
export const getProductDelete = async (productId) => {
  const response = await adminApi.delete(`/products/delete/${productId}`);
  return response.data;
};


// 관리자 - 장르 리스트 조회
export const getGenreList = async () => {
  const response = await adminApi.get(`/products/genre`);
  return response.data;
};

// 관리자 - 작가 리스트 조회
export const getAuthorList = async () => {
  const response = await adminApi.get(`/products/authors`);
  return response.data;
};

// 관리자 - 작가 검색
export const getAuthorSearchList = async (searchAuthor) => { 
  const response = await adminApi.get(`/products/authors/search`, {
    params: searchAuthor,
  });
  return response.data;
};

// 관리자 - 신규 작가 등록
export const getCreateAuthor = async (newAuthor) => {
  const response = await adminApi.post(`/products/authors/new`, newAuthor)
  return response.data;
}

// 관리자 - 출판사 리스트 조회
export const getPublisherList = async () => {
  const response = await adminApi.get(`/products/publishers`);
  return response.data;
};

// 관리자 - 출판사 검색
export const getPublisherSearchList = async (searchPublisher) => { 
  const response = await adminApi.get(`/products/publishers/search`, {
    params: searchPublisher,
  });
  return response.data;
};

// 관리자 - 신규 출판사 등록
export const getCreatePublisher = async (newPublisher) => {
  const response = await adminApi.post(`/products/publishers/new`, newPublisher)
  return response.data;
}
