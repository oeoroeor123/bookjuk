package com.bookjuk.admin.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.bookjuk.admin.dto.AdminReviewDto;

@Mapper
public interface IAdminReviewMapper {

  /**
   * 관리자 - 리뷰 검색 결과
   * 
   * @param  param
   * 
   * @return
   */
  List<AdminReviewDto> selectReviewSearchList(Map<String, Object> param);

  /**
   * 관리자 - 리뷰 검색 결과 갯수
   * 
   * @param  param
   * 
   * @return
   */
  int selectReviewSearchListCount(Map<String, Object> param);

}
