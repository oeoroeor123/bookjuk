package com.bookjuk.admin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookjuk.admin.dto.ProductDto;

@Mapper
public interface IProductMapper {
  
  /**
   * 관리자 -  상품 검색 결과
   * 
   * @param  param
   * 
   * @return
   */
  List<ProductDto> selectProductSearchList(Map<String, Object> param);

  /**
   * 관리자 -  상품 검색 결과 갯수
   * 
   * @param  param
   * 
   * @return
   */
  int selectProductSearchListCount(Map<String, Object> param);

}
