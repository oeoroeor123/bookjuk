package com.bookjuk.admin.controller;

import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bookjuk.admin.dto.AdminInquiryDto;
import com.bookjuk.admin.dto.AdminProductDto;
import com.bookjuk.admin.dto.AdminQnaDto;
import com.bookjuk.admin.dto.AdminSecondhandDto;
import com.bookjuk.admin.service.AdminService;
import com.bookjuk.model.message.ResponseMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "관리자", description = "관리자 메뉴 API")
@RequiredArgsConstructor
@RestController
public class AdminController {

  private final AdminService adminService;

  @Operation(summary = "로그인 로그 조회", description = "로그인한 회원 로그리스트를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/loginlog", produces = "application/json")
  public ResponseMessage getLoginLog(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("로그인 로그 조회 성공")
        .results(
            adminService
                .getLoginLogList(pageable)
        )
        .build();
  }

  @Operation(summary = "로그인 로그 검색", description = "회원 로그인 로그를 검색하는 기능힙니다.")
  @GetMapping(value = "/admin/loginlog/search", produces = "application/json")
  public ResponseMessage getLoginLogSearchList(
      Pageable pageable, @RequestParam(required = false) String search,
      @RequestParam(required = false, defaultValue = "") String keyword,
      @RequestParam(required = false, defaultValue = "1") String page,
      @RequestParam(required = false, defaultValue = "10") String display,
      @RequestParam(required = false, defaultValue = "loginDt,DESC") String sort,
      @RequestParam(required = false) String startDt,
      @RequestParam(required = false) String endDt
  ) {
    return ResponseMessage.builder()
        .status(200)
        .message("로그인 로그 리스트 검색 성공")
        .results(
            adminService.getLoginLogSearchList(
                pageable, search, keyword, page, display, sort.split(",")[1], startDt, endDt
            )
        )
        .build();
  }

  @Operation(summary = "탈퇴 로그 조회", description = "탈퇴한 회원 로그리스트를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/deletelog", produces = "application/json")
  public ResponseMessage getDeleteLog(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("탈퇴 로그 조회 성공")
        .results(
            adminService
                .getDeleteLogList(pageable)
        )
        .build();
  }

  @Operation(summary = "탈퇴 검색", description = "회원 탈퇴 로그를 검색하는 기능힙니다.")
  @GetMapping(value = "/admin/deletelog/search", produces = "application/json")
  public ResponseMessage getDeleteLogSearchList(
      Pageable pageable, @RequestParam(required = false) String search,
      @RequestParam(required = false, defaultValue = "") String keyword,
      @RequestParam(required = false, defaultValue = "1") String page,
      @RequestParam(required = false, defaultValue = "10") String display,
      @RequestParam(required = false, defaultValue = "deleteDt,DESC") String sort,
      @RequestParam(required = false) String startDt,
      @RequestParam(required = false) String endDt

  ) {
    return ResponseMessage.builder()
        .status(200)
        .message("탈퇴 로그 리스트 검색 성공")
        .results(
            adminService.getDeleteLogSearchList(
                pageable, search, keyword, page, display, sort.split(",")[1], startDt, endDt
            )
        )
        .build();
  }

  @Operation(summary = "Q&A 상세 조회", description = "Q&A 문의 상세 내용 + 답변을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/qna/{qnaId}", produces = "application/json")
  public ResponseMessage getQnaDetail(@PathVariable(name = "qnaId") Integer qnaId) {
    return ResponseMessage.builder()
        .status(200)
        .message("Q&A 목록 조회 성공")
        .results(adminService.getByQnaId(qnaId))
        .build();
  }

  @Operation(summary = "Q&A 문의 조회", description = "Q&A 문의 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/qna", produces = "application/json")
  public ResponseMessage getQnaList(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("회원 문의 목록 조회 성공")
        .results(adminService.getQnaList(pageable))
        .build();
  }

  @Operation(summary = "Q&A 답변 등록", description = "Q&A 문의에 답변을 등록하고, 답변 여부를 업데이트하는 기능입니다.")
  @PostMapping(value = "/admin/qna", produces = "application/json")
  public ResponseMessage registQnaReply(@RequestBody AdminQnaDto qnaDto) {
    return ResponseMessage.builder()
        .status(200)
        .message("Q&A 답변 등록 성공")
        .results(Map.of("qna", adminService.registQnaReply(qnaDto)))
        .build();
  }

  @Operation(summary = "상품 문의 조회", description = "상품문의 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/inquiry", produces = "application/json")
  public ResponseMessage getInquiryList(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 문의 목록 조회 성공")
        .results(adminService.getInquiryList(pageable))
        .build();
  }

  @Operation(summary = "상품 문의 상세 조회", description = "상품문의 상세를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/inquiry/{inquiryId}", produces = "application/json")
  public ResponseMessage getInquiry(@PathVariable(name = "inquiryId") Integer inquiryId) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 문의 상세 조회 성공")
        .results(adminService.getByInquiryId(inquiryId))
        .build();
  }

  @Operation(summary = "상품 문의 답변 등록", description = "상품 문의에 답변을 등록하고, 답변 여부를 업데이트하는 기능입니다.")
  @PostMapping(value = "/admin/inquiry", produces = "application/json")
  public ResponseMessage registInquiryReply(@RequestBody AdminInquiryDto inquiryDto) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 문의 답변 등록 성공")
        .results(Map.of("inquiry", adminService.registInquiryReply(inquiryDto)))
        .build();
  }

  @Operation(summary = "상품", description = "상품 목록을 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/product/setting", produces = "application/json")
  public ResponseMessage getProductList(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 리스트 조회 성공")
        .results(adminService.getProductList(pageable))
        .build();
  }

  @Operation(summary = "상품 상세 조회", description = "상품 상세 내용을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/product/setting/{productId}", produces = "application/json")
  public ResponseMessage getProduct(@PathVariable(name = "productId") Integer productId) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 관리 상세 조회 성공")
        .results(Map.of("product", adminService.getByProductId(productId)))
        .build();
  }
  
  @Operation(summary = "상품 판매 여부 변경", description = "상품 판매 여부를 변경하는 기능입니다.")
  @PutMapping(value = "/admin/product/{productId}", produces = "application/json")
  public ResponseMessage modifyProductSalesYn(
      @PathVariable(name = "productId") Integer productId,
      @RequestBody AdminProductDto productDto
  ) {
    productDto.setProductId(productId);
    return ResponseMessage.builder()
        .status(200)
        .message("상품 판매 여부 변경 성공")
        .results(Map.of("product", adminService.modifyByProductId(productDto)))
        .build();
  }

  @Operation(summary = "중고 상품 목록", description = "중고 상품 목록을 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/secondhand", produces = "application/json")
  public ResponseMessage getSecondhandList(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("중고 상품 리스트 조회 성공")
        .results(adminService.getSecondhandList(pageable))
        .build();
  }

  @Operation(summary = "중고 상품 검색", description = "중고 상품 목록을 검색하는 기능힙니다.")
  @GetMapping(value = "/admin/secondhand/search", produces = "application/json")
  public ResponseMessage getSecondhandSearchList(
      Pageable pageable, @RequestParam(required = false) String search,
      @RequestParam(required = false, defaultValue = "") String keyword,
      @RequestParam(required = false, defaultValue = "1") String page,
      @RequestParam(required = false, defaultValue = "10") String display,
      @RequestParam(required = false, defaultValue = "secondhandId,DESC") String sort
  ) {
    return ResponseMessage.builder()
        .status(200)
        .message("중고 상품 리스트 검색 성공")
        .results(
            adminService.getSecondhandSearchList(
                pageable, search, keyword, page, display, sort.split(",")[1]
            )
        )
        .build();
  }

  @Operation(summary = "중고 상품 상세", description = "중고 상품 상세를 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/secondhand/{secondhandId}", produces = "application/json")
  public ResponseMessage getSecondhand(@PathVariable(name = "secondhandId") Integer secondhandId) {
    return ResponseMessage.builder()
        .status(200)
        .message("중고 상품 리스트 조회 성공")
        .results(Map.of("secondhand", adminService.getBySecondhandId(secondhandId)))
        .build();
  }

  @Operation(summary = "중고 상품 판매 여부 변경", description = "중고 상품 판매 여부를 변경하는 기능힙니다.")
  @PutMapping(value = "/admin/secondhand/{secondhandId}", produces = "application/json")
  public ResponseMessage modifySecondhandSalesYn(
      @PathVariable(name = "secondhandId") Integer secondhandId,
      @RequestBody AdminSecondhandDto secondhandDto
  ) {
    secondhandDto.setSecondhandId(secondhandId);
    return ResponseMessage.builder()
        .status(200)
        .message("중고 상품 판매 여부 변경 성공")
        .results(Map.of("secondhand", adminService.modifyBySecondhandId(secondhandDto)))
        .build();
  }

  @Operation(summary = "상품 후기 목록", description = "상품 후기 목록을 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/review", produces = "application/json")
  public ResponseMessage getReviewList(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("리뷰 리스트 조회 성공")
        .results(adminService.getReviewList(pageable))
        .build();
  }

  @Operation(summary = "상품 후기 검색", description = "상품 후기를 검색하는 기능힙니다.")
  @GetMapping(value = "/admin/review/search", produces = "application/json")
  public ResponseMessage getReviewSearchList(
      Pageable pageable, @RequestParam(required = false) String search,
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false, defaultValue = "1") String page,
      @RequestParam(required = false, defaultValue = "10") String display,
      @RequestParam(required = false, defaultValue = "reviewId,DESC") String sort
  ) {
    return ResponseMessage.builder()
        .status(200)
        .message("리뷰 리스트 검색 성공")
        .results(
            adminService.getReviewSearchList(
                pageable, search, keyword, page, display, sort.split(",")[1]
            )
        )
        .build();
  }

  @Operation(summary = "상품 후기 상세", description = "상품 후기 상세를 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/review/{reviewId}", produces = "application/json")
  public ResponseMessage getReviewDetail(@PathVariable(name = "reviewId") Integer reviewId) {
    return ResponseMessage.builder()
        .status(200)
        .message("리뷰 상세 조회 성공")
        .results(Map.of("review", adminService.getReviewDetail(reviewId)))
        .build();
  }

  @Operation(summary = "배송 상태 코드 목록", description = "배송 상태 코드 목록을 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/order/status", produces = "application/json")
  public ResponseMessage getOrderStatusList() {
    return ResponseMessage.builder()
        .status(200)
        .message("배송 상태 코드 리스트 조회 성공")
        .results(adminService.getOrderStatusList())
        .build();
  }

  @Operation(summary = "오늘의 주문 조회", description = "당일 주문건수를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/todayOrder", produces = "application/json")
  public ResponseMessage getTodayOrderCount() {
    return ResponseMessage.builder()
        .status(200)
        .message("오늘의 주문 조회 성공")
        .results(Map.of("todayOrder", adminService.getTodayOrderCount()))
        .build();
  }

  @Operation(summary = "오늘의 리뷰 조회", description = "당일 등록된 리뷰를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/todayReview", produces = "application/json")
  public ResponseMessage getTodayReviewCount() {
    return ResponseMessage.builder()
        .status(200)
        .message("오늘의 리뷰 조회 성공")
        .results(Map.of("todayReview", adminService.getTodayReviewCount()))
        .build();
  }

  @Operation(summary = "오늘의 Q&A 조회", description = "당일 Q&A 등록 건수를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/todayQna", produces = "application/json")
  public ResponseMessage getTodayQnaCount() {
    return ResponseMessage.builder()
        .status(200)
        .message("오늘의 Q&A 조회 성공")
        .results(Map.of("todayQna", adminService.getTodayQnaCount()))
        .build();
  }

  @Operation(summary = "미답변 Q&A 조회", description = "답변이 필요한 Q&A 건수를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/needReplyQna", produces = "application/json")
  public ResponseMessage getNeedReplyQnaCount() {
    return ResponseMessage.builder()
        .status(200)
        .message("오늘의 Q&A 조회 성공")
        .results(Map.of("needReplyQna", adminService.getNeedReplyQna()))
        .build();
  }

  @Operation(summary = "오늘의 문희 조회", description = "당일 문의 등록 건수를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/todayInquiry", produces = "application/json")
  public ResponseMessage getTodayInquiryCount() {
    return ResponseMessage.builder()
        .status(200)
        .message("오늘의 문의 조회 성공")
        .results(Map.of("todayInquiry", adminService.getTodayInquiryCount()))
        .build();
  }

  @Operation(summary = "미답변 문의조회", description = "답변이 필요한 문의 건수를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/needReplyInquiry", produces = "application/json")
  public ResponseMessage getNeedReplyInquiryCount() {
    return ResponseMessage.builder()
        .status(200)
        .message("미답변 문의 조회 성공")
        .results(Map.of("needReplyInquiry", adminService.getNeedReplyInquiry()))
        .build();
  }

}
