package com.bookjuk.review.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.review.dto.ReviewDto;
import com.bookjuk.review.service.IReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Tag(name = "리뷰", description = "리뷰 API")
public class ReviewController {
  
  private final IReviewService reviewService;
  
  /**
   * 리뷰 작성
   */
  @Operation(summary = "리뷰 작성", description = "리뷰 작성")
  @PostMapping(value = "/review/insert", produces = "application/json")
  public ResponseMessage insertReview(
      @RequestBody ReviewDto reviewDto
  ) {

    ReviewDto newReview = reviewService.insertReview(reviewDto);

    return ResponseMessage.builder()
        .status(200)
        .message("리뷰 작성 성공")
        .results(Map.of("review", newReview))
        .build();
  }
  
  /**
   * 리뷰 삭제
   */
  @Operation(summary = "리뷰 삭제", description = "리뷰 삭제")
  @DeleteMapping(value = "/review/delete/{reviewId}", produces = "application/json")
  public ResponseMessage deleteReview(@PathVariable("reviewId") Integer reviewId) {
    reviewService.deleteReview(reviewId);
    return ResponseMessage.builder()
        .status(200)
        .message("리뷰 삭제 성공")
        .build();
  }

}
