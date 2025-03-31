package com.bookjuk.product.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookjuk.admin.domain.AdminInquiry;
import com.bookjuk.admin.dto.AdminInquiryDto;
import com.bookjuk.admin.repository.AdminInquiryRepository;
import com.bookjuk.model.dto.PageDto;
import com.bookjuk.product.domain.ListUser;
import com.bookjuk.product.domain.Product;
import com.bookjuk.product.domain.ProductInq;
import com.bookjuk.product.domain.ProductReview;
import com.bookjuk.product.dto.ProductDto;
import com.bookjuk.product.dto.ProductInqDto;
import com.bookjuk.product.dto.ProductLikeCountDto;
import com.bookjuk.product.dto.ProductReviewDto;
import com.bookjuk.product.repository.ProductInqRepository;
import com.bookjuk.product.repository.ProductLikeListRepository;
import com.bookjuk.product.repository.ProductListRepository;
import com.bookjuk.product.repository.ProductReviewRepository;
import com.bookjuk.product.service.ProductListService;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductListServiceImpl implements ProductListService {

  private final ProductListRepository     productListRepository;
  private final ProductLikeListRepository productLikeListRepository;
  private final ProductInqRepository      productInqRepository;
  private final ProductReviewRepository   productReviewRepository;
  private final AdminInquiryRepository    inquiryRepository;
  private final ModelMapper               modelMapper;
  private PageDto                         pageDto;

  // 신규 상품 리스트 (기간, 장르 필터링)
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findProductList(
      LocalDate startDate, LocalDate endDate, Integer genreId, Pageable pageable
  ) {

    // Pageable 수정 (음수 방지)
    pageable = pageable.withPage(pageable.getPageNumber() - 1);

    // 판매 여부 'y'인 상품만 필터링
    Page<Product> productList =
        productListRepository.findNewProducts(startDate, endDate, genreId, pageable);

    // pageDto null 방지를 위한 초기화
    if (this.pageDto == null) {
      this.pageDto = new PageDto();
    }

    // 페이지 설정
    pageDto.setPaging(
        pageable.getPageNumber() + 1, pageable.getPageSize(), (int) productList.getTotalElements()
    );

    return Map.of(
        // ModelMapper를 사용해 product 엔티티 -> productDto로 변환
        "productList",
        productList.map(product -> modelMapper.map(product, ProductDto.class)).toList(),
        // pageDto를 이용해 페이징 처리
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList(),
        "pageDto", pageDto
    );
  }

  // 상품 상세 + 상품 문의글 + 상품 리뷰글 조회
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findProductById(Integer productId) {

    // 상품 상세 조회
    Product product =
        productListRepository.findById(productId).orElseThrow(IllegalArgumentException::new);
    if (product == null) {
      product = new Product();
    }

    // 모델 매핑 설정
    ModelMapper modelMapper = new ModelMapper();
    ProductDto  productDto  = modelMapper.map(product, ProductDto.class);

    // 상품 문의글 조회
    List<ProductInq> inquiries = productInqRepository.findByProduct_ProductId(productId);
    if (inquiries == null) {
      inquiries = new ArrayList<>();
    }

    List<ProductInqDto> productInqList = inquiries.stream()
        .map(inquiry -> modelMapper.map(inquiry, ProductInqDto.class))
        .collect(Collectors.toList());

    // 상품 리뷰글 조회
    List<ProductReview> reviews = productReviewRepository.findByProductReview_ProductId(productId);

    List<ProductReviewDto> productReviewList = reviews.stream()
        .map(review -> modelMapper.map(review, ProductReviewDto.class))
        .collect(Collectors.toList());

    // map으로 한번에 결과 반환
    Map<String, Object> response = new HashMap<>();
    response.put("product", productDto);
    response.put("inquiries", productInqList);
    response.put("reviews", productReviewList);

    return response;
  }

  // 상품 문의 상세
  @Override
  public Map<String, Object> getByInquiryId(Integer inquiryId) {
    AdminInquiry inquiry =
        inquiryRepository.findById(inquiryId).orElseThrow(IllegalArgumentException::new);
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // STRICT 전략 // id 셋팅이 인됨O
    return Map.of("inquiry", modelMapper.map(inquiry, AdminInquiryDto.class));
  }

  // 인기 상품 리스트
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findPopularProductList(Integer genreId, Pageable pageable) {

    // Pageable 수정 (음수 방지)
    if (pageable.getPageNumber() > 0) {
      pageable = pageable.withPage(pageable.getPageNumber() - 1);
    }

    // System.out.println("*****before findProductLikeListByLikeCountDesc");
    // 판매 여부 'y'인 상품만 필터링
    Page<ProductLikeCountDto> productPopularList =
        productLikeListRepository.findProductLikeListByLikeCountDesc(genreId, pageable);
    // System.out.println("*****after findProductLikeListByLikeCountDesc");

    // pageDto null 방지를 위한 초기화
    if (this.pageDto == null) {
      this.pageDto = new PageDto();
    }

    // 페이징 처리 : 조건에 맞는 전체 갯수 구하기
    this.pageDto.setPaging(
        pageable.getPageNumber() + 1, pageable.getPageSize(),
        (int) productPopularList.getTotalElements()
    );

    return Map.of(
        // productList 가져오기
        "productList",
        productPopularList.getContent().stream()
            .map(product -> modelMapper.map(product, ProductDto.class))
            .collect(Collectors.toList()),
        // pageDto를 이용해 페이징 처리
        "pageList",
        IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed()
            .collect(Collectors.toList()),
        "pageDto", pageDto
    );

  }

  // 상품 문의 작성
  @Override
  public Map<String, Object> createProductInquiry(Integer productId, ProductInqDto productInqDto) {
    Map<String, Object> response = new HashMap<>();

    try {
      // Product 객체 생성
      Product product = Product.builder()
          .productId(productId) // 상품 ID 설정
          .build();

      // ListUser 객체 생성
      ListUser user = ListUser.builder()
          .userId(productInqDto.getUser().getUserId()) // 사용자 ID 설정
          .build();

      // ProductInq 객체 생성
      ProductInq productInq = ProductInq.builder()
          .product(product) // Product 객체 전달
          .user(user) // ListUser 객체 전달
          .inquiryTitle(productInqDto.getInquiryTitle()) // 문의 제목 설정
          .inquiryContent(productInqDto.getInquiryContent()) // 문의 내용 설정
          .inquiryReplyYn('N') // 초기 값 'N' (미답변)
          .build();

      productInqRepository.save(productInq);

      response.put("status", 200);
      response.put("message", "상품 문의글 작성이 완료되었습니다.");
    }
    catch (Exception e) {
      response.put("status", 500);
      response.put("message", "상품 문의글 작성 중 오류가 발생했습니다.");
    }
    return response;
  }

}
