package com.bookjuk.main.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bookjuk.main.service.MainProductService;
import com.bookjuk.model.message.ResponseMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * 메인 페이지에 출력할 신상, 추천, 인기 도서 목록 호출 API 컨트롤러 (리예)
 */
@Tag(name = "메인", description = "메인 도서 목록 API")
@RequiredArgsConstructor
@RestController
public class MainController {

  private final MainProductService productService;

  /** 메인 페이지에서 출력할 상품 갯수 */
  private final int PRODUCT_COUNT = 5;

  @Operation(summary = "추천 도서 목록", description = "랜덤으로 도서 목록 5개를 조회합니다.")
  @GetMapping(value = "/main/recommended", produces = "application/json")
  public ResponseMessage recommendedList() {
    return ResponseMessage.builder()
        .status(200)
        .message("추천 도서 리스트 조회 성공")
        .results(Map.of("productList", productService.findRecommendedProductList(PRODUCT_COUNT)))
        .build();
  }

  @Operation(summary = "신간 도서 목록", description = "발생일순으로 최신 도서 목록 5개를 조회합니다.")
  @GetMapping(value = "/main/new", produces = "application/json")
  public ResponseMessage newList() {
    return ResponseMessage.builder()
        .status(200)
        .message("신상 도서 리스트 조회 성공")
        .results(Map.of("productList", productService.findNewProductList(PRODUCT_COUNT)))
        .build();
  }

  @Operation(summary = "인기 도서 목록", description = "추천순으로 도서 목록 5개를 조회합니다.")
  @GetMapping(value = "/main/popular", produces = "application/json")
  public ResponseMessage popularList() {
    return ResponseMessage.builder()
        .status(200)
        .message("인기 도서 리스트 조회 성공")
        .results(Map.of("productList", productService.findPopularProductList(PRODUCT_COUNT)))
        .build();
  }

}
