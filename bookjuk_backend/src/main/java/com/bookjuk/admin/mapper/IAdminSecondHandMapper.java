package com.bookjuk.admin.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.bookjuk.admin.dto.AdminSecondhandDto;

@Mapper
public interface IAdminSecondHandMapper {

  /**
   * 관리자 - 중고 상품 검색 결과
   * 
   * @param  param
   * 
   * @return
   */
  List<AdminSecondhandDto> selectSecondhandSearchList(Map<String, Object> param);

  /**
   * 관리자 - 중고 상품 검색 결과 갯수
   * 
   * @param  param
   * 
   * @return
   */
  int selectSecondhandSearchListCount(Map<String, Object> param);

}
