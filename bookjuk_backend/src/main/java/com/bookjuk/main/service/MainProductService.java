package com.bookjuk.main.service;

import java.util.List;
import com.bookjuk.main.dto.MainProductDto;

public interface MainProductService {

  /**
   * 추천 도서 count 갯수만큼 조회 (랜덤)
   * 
   * @param  count
   * 
   * @return
   */
  List<MainProductDto> findRecommendedProductList(int count);

  /**
   * 신간 도서 count 갯수만큼 조회
   * 
   * @param  count
   * 
   * @return
   */
  List<MainProductDto> findNewProductList(int count);

  /**
   * 인기 도서 count 갯수만큼 조회 (좋아요순)
   * 
   * @param  count
   * 
   * @return
   */
  List<MainProductDto> findPopularProductList(int count);

}
