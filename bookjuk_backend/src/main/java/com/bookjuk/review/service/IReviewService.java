package com.bookjuk.review.service;

import com.bookjuk.review.dto.ReviewDto;

public interface IReviewService {
  
  // (1) 리뷰 작성
  ReviewDto insertReview(ReviewDto reviewDto);

  // (2) 리뷰 삭제
  void deleteReview(Integer reviewId);

}
