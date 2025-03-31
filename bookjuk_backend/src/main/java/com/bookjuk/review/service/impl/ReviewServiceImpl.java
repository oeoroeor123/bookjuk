package com.bookjuk.review.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookjuk.cart.repository.CartItemRepository;
import com.bookjuk.cart.repository.CartProductRepository;
import com.bookjuk.cart.repository.CartRepository;
import com.bookjuk.review.domain.Review;
import com.bookjuk.review.dto.ReviewDto;
import com.bookjuk.review.repository.ReviewRepository;
import com.bookjuk.review.service.IReviewService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements IReviewService {
  
  private final ReviewRepository reviewRepository;
  private final ModelMapper modelMapper;
  
//  @Override
//  public ReviewDto insertReview(ReviewDto reviewDto) {
//    Review review = modelMapper.map(reviewDto, Review.class);
//    reviewRepository.save(modelMapper.map(reviewDto, Review.class));
//    return reviewDto;
//  }
  
  @Override
  public ReviewDto insertReview(ReviewDto reviewDto) {
    // 입력받은 DTO를 엔티티로 변환합니다.
    Review review = modelMapper.map(reviewDto, Review.class);
    // 엔티티를 저장하고, 저장된 엔티티(자동 생성된 reviewId 포함)를 받습니다.
    Review savedReview = reviewRepository.save(review);
    // 저장된 엔티티를 DTO로 다시 변환하여 반환합니다.
    return modelMapper.map(savedReview, ReviewDto.class);
  }
  
  @Override
  public void deleteReview(Integer reviewId) {
    reviewRepository.deleteById(reviewId);
  }

}
