/**
 * 관리자 관련 API 호출 모음
 *
 * Developer : 김리예
 */

import { adminApi } from './baseApi';

// 관리자 - 로그인 회원 기록 조회
export const getUserLoginLog = async (parameters) => {
  const response = await adminApi.get(`/loginlog`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 로그인 회원 기록 검색
export const getLoginLogSearchList = async (parameters) => {
  const response = await adminApi.get(`/loginlog/search`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 탈퇴 회원 기록 조회
export const getUserDeleteLog = async (parameters) => {
  const response = await adminApi.get(`/deletelog`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 탈퇴 회원 기록 검색
export const getDeleteLogSearchList = async (parameters) => {
  const response = await adminApi.get(`/deletelog/search`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - Q&A 목록 조회
export const getQnAList = async (parameters) => {
  const response = await adminApi.get(`/qna`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - Q&A 상세 조회
export const getQnADetail = async (qndId, parameters) => {
  const response = await adminApi.get(`/qna/${qndId}`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - Q&A 답변 등록
export const registQnAReply = async (qna, parameters) => {
  const response = await adminApi.post(`/qna`, qna, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 상품 목록 조회 (삭제 예정)
export const getProductSettingList = async (parameters) => {
  const response = await adminApi.get(`/product/setting`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 상품 목록 상세 (삭제 예정)
export const getProductSettingDetail = async (productId, parameters) => {
  const response = await adminApi.get(`/product/setting/${productId}`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 상품 판매 여부 변경
export const getProductSalesChange = async (product, parameters) => {
  const response = await adminApi.put(`/product/${product?.productId}`, product, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 중고 상품 목록 조회
export const getSecondhandList = async (parameters) => {
  const response = await adminApi.get(`/secondhand`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 중고 상품 검색
export const getSecondhandSearchList = async (parameters) => {
  const response = await adminApi.get(`/secondhand/search`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 중고 상품 상세 조회
export const getSecondhandDetail = async (secondhandId, parameters) => {
  const response = await adminApi.get(`/secondhand/${secondhandId}`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 중고 상품 판매 여부 변경
export const getSecondhandSalesChange = async (secondhand, parameters) => {
  const response = await adminApi.put(`/secondhand/${secondhand?.secondhandId}`, secondhand, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 상품문의 목록 조회
export const getInquiryList = async (parameters) => {
  const response = await adminApi.get(`/inquiry`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 상품문의 상세 조회
export const getInquiryDetail = async (inquiryId, parameters) => {
  const response = await adminApi.get(`/inquiry/${inquiryId}`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 상품문의 답변 등록
export const registInquiryReply = async (inquiry, parameters) => {
  const response = await adminApi.post(`/inquiry`, inquiry, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 리뷰 목록 조회
export const getReviewList = async (parameters) => {
  const response = await adminApi.get(`/review`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 리뷰 목록 검색
export const getReviewSearchList = async (parameters) => {
  const response = await adminApi.get(`/review/search`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 리뷰 상세 조회
export const getReviewDetail = async (reviewId, parameters) => {
  const response = await adminApi.get(`/review/${reviewId}`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 주문 목록 검색
export const getOrderList = async (parameters) => {
  const response = await adminApi.get(`/order`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 배송 상태 코드 목록 조회
export const getOrderStatusList = async (parameters) => {
  const response = await adminApi.get(`/order/status`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 주문 상세 조회
export const getOrderDetail = async (orderId, parameters) => {
  const response = await adminApi.get(`/order/${orderId}`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 주문 상세 변경 (결제완료, 배송중, 배송완료)
export const getOrderItemStatusChange = async (order, parameters) => {
  const response = await adminApi.put(`/order/${order?.orderId}`, order, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 취소 요청 승인/거절
export const updateOrderItem = async (payload) => {
  try {
    // 서버의 엔드포인트 URL은 실제 환경에 맞게 조정하세요.
    const response = await adminApi.put("/order/orderItem", payload);
    return response.data;
  } catch (error) {
    console.error("updateOrderItem API 호출 에러: ", error);
    throw error;
  }
};

// 관리자 - 오늘의 주문 건수 조회
export const getTodayOrderCount = async (parameters) => {
  const response = await adminApi.get(`/todayOrder`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 오늘의 리뷰 건수 조회
export const getTodayReviewCount = async (parameters) => {
  const response = await adminApi.get(`/todayReview`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 오늘의 Q&A 등록 건수 조회
export const getTodayQnaCount = async (parameters) => {
  const response = await adminApi.get(`/todayQna`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 미답변 Q&A 건수 조회
export const getNeedReplyQnaCount = async (parameters) => {
  const response = await adminApi.get(`/needReplyQna`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 오늘의 Q&A 등록 건수 조회
export const getTodayInquiryCount = async (parameters) => {
  const response = await adminApi.get(`/todayInquiry`, {
    params: parameters,
  });
  return response.data;
};

// 관리자 - 미답변 Q&A 건수 조회
export const getNeedReplyInquiryCount = async (parameters) => {
  const response = await adminApi.get(`/needReplyInquiry`, {
    params: parameters,
  });
  return response.data;
};
