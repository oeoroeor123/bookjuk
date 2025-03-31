package com.bookjuk.main.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookjuk.main.domain.MainProduct;
import com.bookjuk.main.dto.MainProductDto;
import com.bookjuk.main.dto.MainProductLikeCountDto;
import com.bookjuk.main.repository.MainLikeRepository;
import com.bookjuk.main.repository.MainProductRepository;
import com.bookjuk.main.service.MainProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class MainProductServiceImpl implements MainProductService {

  private final EntityManager         entityManager;
  private final MainProductRepository productRepository;
  private final MainLikeRepository    likeRepository;
  private final ModelMapper           modelMapper;

  @Override
  public List<MainProductDto> findRecommendedProductList(int count) {

    // productIds를 빈 리스트로 초기화
    List<Integer> productIds = new ArrayList<>();

    // Random 객체 생성
    Random random = new Random();

    // 전체 상품 수 가져오기
    long totalProducts = productRepository.count();

    if (totalProducts < count) {
      // throw new IllegalArgumentException("상품 수가 요청된 개수보다 적습니다.");
      count = (int) totalProducts;
    }

    // 중복을 방지하기 위해 Set 사용
    Set<Integer> uniqueProductIds = new HashSet<>();

    // count만큼 랜덤한 productId 생성
    while (uniqueProductIds.size() < count) {
      int randomProductId = random.nextInt((int) totalProducts) + 1;
      uniqueProductIds.add(randomProductId);
    }

    // Set을 List로 변환
    productIds.addAll(uniqueProductIds);

    // productIds로 상품 조회
    List<MainProduct> productList = findByProductIds(productIds);

    // MainProduct를 MainProductDto로 매핑하여 반환
    return productList.stream()
        .map(product -> modelMapper.map(product, MainProductDto.class))
        .toList();
  }

  @Override
  public List<MainProductDto> findNewProductList(int count) {
    // 전체 상품 수 가져오기
    long totalProducts = productRepository.count();

    if (totalProducts < count) {
      // throw new IllegalArgumentException("상품 수가 요청된 개수보다 적습니다.");
      count = (int) totalProducts;
    }

    // 발매일 순으로 5개 조회
    List<MainProduct> productList =
        productRepository.findBySalesYnOrderByPublicationDateDesc(Limit.of(count), 'Y');

    return productList.stream()
        .map(product -> modelMapper.map(product, MainProductDto.class))
        .toList();
  }

  @Override
  public List<MainProductDto> findPopularProductList(int count) {
    // 전체 상품 수 가져오기
    long totalProducts = productRepository.count();

    if (totalProducts < count) {
      // throw new IllegalArgumentException("상품 수가 요청된 개수보다 적습니다.");
      count = (int) totalProducts;
    }

    // like 많은 순으로 5개 조회 (+ 판매여부 Y)
    List<MainProductLikeCountDto> list =
        likeRepository.findProductLikeCountOrderByLikeCountDesc(count);

    // productId를 추출
    List<Integer> productIds = list.stream()
        .map(MainProductLikeCountDto::getProductId) // ProductLikeCountDto에서 productId를 가져옴
        .collect(Collectors.toList());

    // productIds로 상품 조회
    List<MainProduct> productList = findByProductIds(productIds);

    // productIds 순서대로 정렬ㅣ
    Map<Integer, MainProduct> productMap = productList.stream()
        .collect(Collectors.toMap(MainProduct::getProductId, product -> product));

    List<MainProduct> sortedProductList = productIds.stream()
        .filter(productMap::containsKey) // 존재하는 productId만 필터링
        .map(productMap::get) // productId로 MainProduct 객체 가져오기
        .collect(Collectors.toList());

    // MainProduct를 MainProductDto로 매핑하여 반환
    return sortedProductList.stream()
        .map(product -> modelMapper.map(product, MainProductDto.class))
        .toList();
  }

  /**
   * Native Query IN 절 생성하는 동적 쿼리
   * 
   * @param  productIds IN 에 들어갈 product id 들
   * 
   * @return
   */
  // IN 절에 사용할 동적 쿼리 생성
  public List<MainProduct> findByProductIds(List<Integer> productIds) {
    if (productIds == null || productIds.isEmpty()) {
      return Collections.emptyList();
    }

    StringBuilder query = new StringBuilder("SELECT * FROM tbl_product WHERE product_id IN (");
    for (int i = 0; i < productIds.size(); i++) {
      query.append("?");
      if (i < productIds.size() - 1) {
        query.append(",");
      }
    }
    query.append(") ");
    query.append("AND sales_yn = 'Y'");

    Query nativeQuery = entityManager.createNativeQuery(query.toString(), MainProduct.class);
    for (int i = 0; i < productIds.size(); i++) {
      nativeQuery.setParameter(i + 1, productIds.get(i));
    }

    return nativeQuery.getResultList();
  }

}
