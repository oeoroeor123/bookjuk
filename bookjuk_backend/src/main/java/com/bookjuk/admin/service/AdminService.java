package com.bookjuk.admin.service;

import java.util.Map;
import org.springframework.data.domain.Pageable;
import com.bookjuk.admin.dto.AdminInquiryDto;
import com.bookjuk.admin.dto.AdminProductDto;
import com.bookjuk.admin.dto.AdminQnaDto;
import com.bookjuk.admin.dto.AdminReviewDto;
import com.bookjuk.admin.dto.AdminSecondhandDto;
import com.bookjuk.user.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;

/**
 * 관리자 컨트롤러에서 사용하는 API 인터페이스 (리예)
 */
public interface AdminService {

  /**
   * 로그인 로그 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getLoginLogList(Pageable pageable);

  /**
   * 로그인 로그 검색
   * 
   * @param  pageable
   * @param  search
   * @param  keyword
   * @param  page
   * @param  display
   * @param  sort
   * 
   * @return
   */
  Map<String, Object> getLoginLogSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort,
      String startDt, String endDt
  );

  /**
   * 탈퇴 로그 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getDeleteLogList(Pageable pageable);

  /**
   * 탈퇴 로그 검색
   * 
   * @param  pageable
   * @param  search
   * @param  keyword
   * @param  page
   * @param  display
   * @param  sort
   * 
   * @return
   */
  Map<String, Object> getDeleteLogSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort,
      String startDt, String endDt
  );

  /**
   * Q&A 문의 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getQnaList(Pageable pageable);

  /**
   * Q&A 문의 상세 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getByQnaId(Integer qnaId);

  /**
   * Q&A 문의 답변 등록
   * 
   * @param  adminQnaDto
   * 
   * @return
   */
  AdminQnaDto registQnaReply(AdminQnaDto adminQnaDto);

  /**
   * 상품 문의 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getInquiryList(Pageable pageable);

  /**
   * 상품 문의 상세 조회
   * 
   * @param  inquiryId 상품문의 번호
   * 
   * @return
   */
  Map<String, Object> getByInquiryId(Integer inquiryId);

  /**
   * 상품 문의 문의 답변 등록
   * 
   * @param  adminQnaDto
   * 
   * @return
   */
  AdminInquiryDto registInquiryReply(AdminInquiryDto adminInquiryDto);

  /**
   * 상품 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getProductList(Pageable pageable);

  /**
   * 상품 상세 조회
   * 
   * @param  productId 상품 번호
   * 
   * @return
   */
  AdminProductDto getByProductId(Integer productId);

  /**
   * 상품 판매 여부 수정
   * 
   * @param  productDto
   * 
   * @return
   */
  AdminProductDto modifyByProductId(AdminProductDto productDto);

  /**
   * 중고 상품 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getSecondhandList(Pageable pageable);

  /**
   * 중고 상품 검색 조회
   * 
   * @param  pageable
   * @param  value
   * @param  keyword
   * @param  sort
   * @param  display
   * @param  page
   * 
   * @return
   */
  Map<String, Object> getSecondhandSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort
  );

  /**
   * 중고상품 상세 조회
   * 
   * @param  secondhandId
   * 
   * @return
   */
  AdminSecondhandDto getBySecondhandId(Integer secondhandId);

  /**
   * 로그인 로그 입력
   * 
   * @param  request
   * @param  userDto
   * 
   * @return
   */
  void registLoginLog(HttpServletRequest request, UserDto userDto);

  /**
   * 중고상품 수정 (유저가 등록하는 상품이기 때문에 판매여부 정도만 수정중입니다)
   * 
   * @param  secondhandDto
   * 
   * @return
   */
  AdminSecondhandDto modifyBySecondhandId(AdminSecondhandDto secondhandDto);

  /**
   * 상품 리뷰 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getReviewList(Pageable pageable);

  /**
   * 리뷰 조회
   * 
   * @param  pageable
   * @param  search
   * @param  keyword
   * @param  page
   * @param  display
   * @param  sort
   * 
   * @return
   */
  Map<String, Object> getReviewSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort
  );

  /**
   * 리뷰 상세
   * 
   * @param  reviewId
   * 
   * @return
   */
  AdminReviewDto getReviewDetail(Integer reviewId);

  /**
   * 배송 상태 코드 목록 조회
   * 
   * @return
   */
  Map<String, Object> getOrderStatusList();

  /**
   * 당일 주문 건수 조회
   * 
   * @return
   */
  int getTodayOrderCount();

  /**
   * 당일 Q&A 등록 건수 조회
   * 
   * @return
   */
  int getTodayQnaCount();

  /**
   * 미답변 Q&A 건수 조회
   * 
   * @return
   */
  int getNeedReplyQna();

  /**
   * 당일 등록 리뷰 조회
   * 
   * @return
   */
  int getTodayReviewCount();

  /**
   * 당일 문의 등록 건수 조회
   * 
   * @return
   */
  int getTodayInquiryCount();

  /**
   * 미답변 문의 건수 조회
   * 
   * @return
   */
  int getNeedReplyInquiry();

}
