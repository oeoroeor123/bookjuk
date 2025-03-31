package com.bookjuk.product.service;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.bookjuk.product.dto.ProductInqDto;

public interface ProductListService {

  /**
   * 상품 목록을 조회하는 메서드
   * 
   * @param  pageable  페이지 정보
   * @param  startDate 조회 시작 날짜
   * @param  endDate   조회 종료 날짜
   * @param  genreId   조회할 장르 ID (null일 경우 모든 장르 조회)
   * 
   * @return           상품 목록과 페이지 정보
   */
  // 신규 상품 리스트 조회
  Map<String, Object> findProductList(
      LocalDate startDate, LocalDate endDate, Integer genreId, Pageable pageable
  );

  // 상품 상세 + 상품 문의글 + 상품 리뷰글 조회
  Map<String, Object> findProductById(Integer productId);

  // 인기 상품 리스트 조회
  Map<String, Object> findPopularProductList(Integer genreId, Pageable pageable);

  // 상품 문의 작성
  Map<String, Object> createProductInquiry(Integer productId, ProductInqDto productInqDto);

  // 상품 문의 상세
  Map<String, Object> getByInquiryId(Integer inquiryId);

}
