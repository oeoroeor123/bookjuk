/**
 * 리뷰 관련 API 호출 모음
 *
 * Developer : 조범희
 */

import { reviewApi } from './baseApi';

export const getReviewInsert  = async (review) => {
  const response = await reviewApi.post(`/insert`, review);
  return response.data;
}

export const getReviewDelete = async (reviewId) => {
  const response = await reviewApi.delete(`/delete/${reviewId}`);
  return response.data;
}



const review = () => {
  return (
    getReviewInsert,
    getReviewDelete
  );
};

export default review;